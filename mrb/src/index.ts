import { Command, flags } from "@oclif/command";
import * as fs from "fs-extra";
import * as path from "path";
import * as glob from "glob";
import cli from "cli-ux";
import { resolve } from "dns";
import TreeModelTypes = require("tree-model/types");
const { exec, spawn } = require("child_process");
const Listr = require("listr");

const Graph = require("graph-data-structure");
const TreeModel = require("tree-model");

class Mrb extends Command {
  static description = "describe the command here";
  static strict = false;
  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    parallel: flags.boolean({ char: "p", default: true }),
    packagesOnly: flags.boolean({  default: false }),
    libsOnly: flags.boolean({ default: false }),
    npmRun: flags.string({ required: false }),
    nr: flags.string({ required: false }),
    treeOrder: flags.boolean({ char: "t", default: true }),
  };

  static args = [{ name: "command", required: true,  description: 'Command to execute in subpackages', }];

  getDepdendenciesOfPackageTypes(foldersToSearchIn: string[]) {
    let packageFolders: string[] = [];
    let dependencyGraph = Graph();
    let tree = cli.tree();

    foldersToSearchIn.forEach((libPath: string) => {
      const folder = path.join(libPath, "/package.json");

      packageFolders = packageFolders.concat(
        glob.sync(folder, { ignore: ["**/node_modules/**"] })
      );
    });

    const packageDeps: { name: string; dependencies: string[] }[] = [];
    const packagePaths: any = {};
    packageFolders.forEach((folder) => {
      const packageJson = fs.readJsonSync(path.join(folder));

      let dependencies: string[] = [];
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
        if (x.name === element.name) {
          return;
        }
        if (x.dependencies.includes(element.name)) {
          dependencyGraph.addEdge(element.name, x.name);
          tree.search(x.name)?.insert(element.name);
        }
      });
    });

    return { dependencyGraph, tree, packagePaths };
  }

  async analyzeDependencies() {
    const repoPackageJson = await fs.readJSON(path.join("package.json"));

    const libResult = this.getDepdendenciesOfPackageTypes(
      repoPackageJson.mrb["libs"]
    );

    let packageResult = this.getDepdendenciesOfPackageTypes(
      repoPackageJson.mrb["packages"]
    );

    if (packageResult.dependencyGraph.serialize().links.length > 0) {
      this.warn(
        "There are dependencies between your packages. Consider moving common functionality to a library"
      );
      // TODO show the link;
    }

    cli.log("\r\n Repository dependency tree:");
    const bla = repoPackageJson.mrb["libs"].concat(
      repoPackageJson.mrb["packages"]
    );

    const allResults = this.getDepdendenciesOfPackageTypes(bla);

    const invocationOrder: any[] = [];

    const sorted = allResults.dependencyGraph
      .topologicalSort()
      .sort((nodeIdA: string, nodeIdB: string) => {
        return (
          allResults.dependencyGraph.adjacent(nodeIdB).length -
          allResults.dependencyGraph.adjacent(nodeIdA).length
        );
      });

    const roots: TreeModelTypes.Node<{ name: string; children: any }>[] = [];
    const tree = new TreeModel();
    sorted.forEach((element: string) => {
      let foundNode = this.findNode(roots, element);

      if (foundNode) {
        const children = allResults.dependencyGraph
            .adjacent(element)
            .map((x: string) => {
              return { name: x };
            }),
          child = tree.parse({ name: element, children });
        const parent = foundNode.parent;

        //remove duplicates of children
        children.forEach((adjacent: any) => {
          const duplicateChildNode = this.findNode(roots, adjacent.name);
          if (duplicateChildNode) {
            duplicateChildNode.drop();
          }
        });

        //remove original
        foundNode.drop();
        parent.addChild(child);
        return;
      }
      const children = allResults.dependencyGraph
          .adjacent(element)
          .map((x: string) => {
            return { name: x };
          }),
        root = tree.parse({ name: element, children });
      roots.push(root);
    });

    return { allResults, roots };
  }

  private findNode(
    roots: TreeModelTypes.Node<{ name: string; children: any }>[],
    rootName: string
  ) {
    let foundNode:
      | TreeModelTypes.Node<{ name: string; children: any }>
      | undefined;
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
    if(parsedCmd.replace(/\s/g, '').length === 0) {
      throw Error("No command was provided")
    }

    if(parsedCmd.includes("npm install") || parsedCmd.includes("yarn") || parsedCmd.includes("npm i")) {
      cli.warn(`You should use yarn on the root directory with workspaces enabled. 
         If you install with npm or yarn locally you will download every dependency per package.`)
     // cli.warn(`current command ${parsedCmd}`)
      cli.url("Yarn workspaced documentation", "https://classic.yarnpkg.com/en/docs/workspaces/");
      const result = await cli.confirm('Are you sure you wanna execute this command? (Y/n)')
      if(!result) {
        return;
      }
    }



    const { allResults, roots } = await this.analyzeDependencies();
    cli.action.stop();
    allResults.tree.display();

    // console.log("roots", roots);
    const invocationList: any = {};
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

    const tasks: any[] = [];
    for (let index = 1; index < invocationLevels + 1; index++) {
      const packageList = invocationList[index];
      const subTasks: any[] = [];
      packageList.forEach((packageName: string) => {
        subTasks.push({
          title: `Running ${parsedCmd}in ${packageName}...`,
          task: (ctx: any, task: any) =>
            new Promise((resolve, reject) => {
              exec(
                `cd ${path.join(
                  __dirname,
                  "../../",
                  allResults.packagePaths[packageName]
                )} && ${parsedCmd}`,
                { cwd: "" },
                (error: any, stdout: any, stderr: any) => {
                  if (error) {
                    console.error(`exec error: ${error}`);
                    //task.skip(`exec error: ${stderr}`);
                    return reject({message: error});
                  }
                  // console.log(`stdout: ${stdout}`);
                  // console.error(`stderr: ${stderr}`);
                  task.title = `Finished ${parsedCmd}in ${packageName}`
                  resolve("Done");
                }
              );
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
        cli.action.stop();
      })
      .catch((err: any) => {
        this.error(new Error('uh oh!'))
      });
  }
}

export = Mrb;
