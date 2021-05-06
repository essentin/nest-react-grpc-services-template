"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyTree = void 0;
const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");
const Graph = require("graph-data-structure");
class DependencyTree {
    getDepdendenciesOfPackageTypes(foldersToSearchIn) {
        let packageFolders = [];
        let dependencyGraph = Graph();
        let cliTree = cli.tree();
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
            cliTree.insert(packageJson["name"]);
            cliTree.insert(packageJson["name"]);
        });
        packageDeps.forEach((element) => {
            packageDeps.forEach((x) => {
                var _a;
                if (x.name === element.name) {
                    return;
                }
                if (x.dependencies.includes(element.name)) {
                    dependencyGraph.addEdge(element.name, x.name);
                    (_a = cliTree.search(x.name)) === null || _a === void 0 ? void 0 : _a.insert(element.name);
                }
            });
        });
        return { dependencyGraph, cliTree, packagePaths };
    }
}
exports.DependencyTree = DependencyTree;
//# sourceMappingURL=dependency-tree.js.map