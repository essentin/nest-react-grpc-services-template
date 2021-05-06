"use strict";
const command_1 = require("@oclif/command");
const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");
const cli_ux_1 = require("cli-ux");
const { exec, spawn } = require("child_process");
const Listr = require("listr");
const Graph = require("graph-data-structure");
const TreeModel = require("tree-model");
class Mrb extends command_1.Command {
    getDepdendenciesOfPackageTypes(foldersToSearchIn) {
        let packageFolders = [];
        let dependencyGraph = Graph();
        let tree = cli_ux_1.default.tree();
        foldersToSearchIn.forEach((libPath) => {
            const folder = path.join(libPath, "/package.json");
            packageFolders = packageFolders.concat(glob.sync(folder, { ignore: ["**/node_modules/**"] }));
        });
        const packageDeps = [];
        const packagePaths = {};
        packageFolders.forEach((folder) => {
            const packageJson = fs.readJsonSync(path.join(folder));
            let dependencies = [];
            if (packageJson.dependencies) {
                dependencies.push(...Object.keys(packageJson.dependencies));
            }
            if (packageJson.devDependencies) {
                dependencies.push(...Object.keys(packageJson.devDependencies));
            }
            if (packageJson.peerDependencies) {
                dependencies.push(...Object.keys(packageJson.peerDependencies));
            }
            packageDeps.push({ name: packageJson["name"], dependencies });
            packagePaths[packageJson["name"]] = path.dirname(folder);
            dependencyGraph.addNode(packageJson["name"]);
            tree.insert(packageJson["name"]);
            tree.insert(packageJson["name"]);
        });
        packageDeps.forEach((element) => {
            packageDeps.forEach((x) => {
                var _a;
                if (x.name === element.name) {
                    return;
                }
                if (x.dependencies.includes(element.name)) {
                    dependencyGraph.addEdge(element.name, x.name);
                    (_a = tree.search(x.name)) === null || _a === void 0 ? void 0 : _a.insert(element.name);
                }
            });
        });
        return { dependencyGraph, tree, packagePaths };
    }
    async analyzeDependencies() {
        const repoPackageJson = await fs.readJSON(path.join("package.json"));
        const libResult = this.getDepdendenciesOfPackageTypes(repoPackageJson.mrb["libs"]);
        let packageResult = this.getDepdendenciesOfPackageTypes(repoPackageJson.mrb["packages"]);
        if (packageResult.dependencyGraph.serialize().links.length > 0) {
            this.warn("There are dependencies between your packages. Consider moving common functionality to a library");
        }
        cli_ux_1.default.log("\r\n Repository dependency tree:");
        const bla = repoPackageJson.mrb["libs"].concat(repoPackageJson.mrb["packages"]);
        const allResults = this.getDepdendenciesOfPackageTypes(bla);
        const invocationOrder = [];
        const sorted = allResults.dependencyGraph
            .topologicalSort()
            .sort((nodeIdA, nodeIdB) => {
            return (allResults.dependencyGraph.adjacent(nodeIdB).length -
                allResults.dependencyGraph.adjacent(nodeIdA).length);
        });
        const roots = [];
        const tree = new TreeModel();
        sorted.forEach((element) => {
            let foundNode = this.findNode(roots, element);
            if (foundNode) {
                const children = allResults.dependencyGraph
                    .adjacent(element)
                    .map((x) => {
                    return { name: x };
                }), child = tree.parse({ name: element, children });
                const parent = foundNode.parent;
                children.forEach((adjacent) => {
                    const duplicateChildNode = this.findNode(roots, adjacent.name);
                    if (duplicateChildNode) {
                        duplicateChildNode.drop();
                    }
                });
                foundNode.drop();
                parent.addChild(child);
                return;
            }
            const children = allResults.dependencyGraph
                .adjacent(element)
                .map((x) => {
                return { name: x };
            }), root = tree.parse({ name: element, children });
            roots.push(root);
        });
        return { allResults, roots };
    }
    findNode(roots, rootName) {
        let foundNode;
        roots.forEach((root) => {
            if (foundNode) {
                return;
            }
            foundNode = root.first((node) => {
                return node.model.name === rootName;
            });
        });
        return foundNode;
    }
    async run() {
        const { args, flags, argv } = this.parse(Mrb);
        const parsedCmd = argv.reduce((acc, curr) => acc += curr += " ", "");
        console.log(args.command);
        if (parsedCmd.replace(/\s/g, '').length === 0) {
            throw Error("No command was provided");
        }
        if (parsedCmd.includes("npm install") || parsedCmd.includes("yarn") || parsedCmd.includes("npm i")) {
            cli_ux_1.default.warn(`You should use yarn on the root directory with workspaces enabled. 
         If you install with npm or yarn locally you will download every dependency per package.`);
            cli_ux_1.default.url("Yarn workspaced documentation", "https://classic.yarnpkg.com/en/docs/workspaces/");
            const result = await cli_ux_1.default.confirm('Are you sure you wanna execute this command? (Y/n)');
            if (!result) {
                return;
            }
        }
        const { allResults, roots } = await this.analyzeDependencies();
        cli_ux_1.default.action.stop();
        allResults.tree.display();
        const invocationList = {};
        roots.forEach((node) => {
            node.walk((childNode) => {
                const depthIndex = childNode.getPath().length;
                if (!invocationList[depthIndex]) {
                    invocationList[depthIndex] = [];
                }
                invocationList[depthIndex].push(childNode.model.name);
                return true;
            });
        });
        const invocationLevels = Object.keys(invocationList).length;
        const tasks = [];
        for (let index = 1; index < invocationLevels + 1; index++) {
            const packageList = invocationList[index];
            const subTasks = [];
            packageList.forEach((packageName) => {
                subTasks.push({
                    title: `Running ${parsedCmd}in ${packageName}...`,
                    task: (ctx, task) => new Promise((resolve, reject) => {
                        exec(`cd ${path.join(__dirname, "../../", allResults.packagePaths[packageName])} && ${parsedCmd}`, { cwd: "" }, (error, stdout, stderr) => {
                            if (error) {
                                console.error(`exec error: ${error}`);
                                return reject({ message: error });
                            }
                            task.title = `Finished ${parsedCmd}in ${packageName}`;
                            resolve("Done");
                        });
                    }),
                });
            });
            tasks.push({
                title: `Executing level ${index}`,
                task: () => {
                    return new Listr(subTasks, { concurrent: true });
                },
            });
        }
        const tasksToRun = new Listr(tasks);
        tasksToRun
            .run()
            .then(() => {
            cli_ux_1.default.action.stop();
        })
            .catch((err) => {
            this.error(new Error('uh oh!'));
        });
    }
}
Mrb.description = "describe the command here";
Mrb.strict = false;
Mrb.flags = {
    version: command_1.flags.version({ char: "v" }),
    help: command_1.flags.help({ char: "h" }),
    parallel: command_1.flags.boolean({ char: "p", default: true }),
    packagesOnly: command_1.flags.boolean({ default: false }),
    libsOnly: command_1.flags.boolean({ default: false }),
    npmRun: command_1.flags.string({ required: false }),
    nr: command_1.flags.string({ required: false }),
    treeOrder: command_1.flags.boolean({ char: "t", default: true }),
};
Mrb.args = [{ name: "command", required: true, description: 'Command to execute in subpackages', }];
module.exports = Mrb;
//# sourceMappingURL=index.js.map