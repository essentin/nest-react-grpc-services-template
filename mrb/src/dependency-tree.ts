import * as fs from "fs-extra";
import * as path from "path";
import * as glob from "glob";


const Graph = require("graph-data-structure");

export class DependencyTree {
    getDepdendenciesOfPackageTypes(foldersToSearchIn: string[]) {
        let packageFolders: string[] = [];
        let dependencyGraph = Graph();
        let cliTree = cli.tree();
    
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
          cliTree.insert(packageJson["name"]);
          cliTree.insert(packageJson["name"]);
        });
    
        packageDeps.forEach((element) => {
          packageDeps.forEach((x) => {
            if (x.name === element.name) {
              return;
            }
            if (x.dependencies.includes(element.name)) {
              dependencyGraph.addEdge(element.name, x.name);
              cliTree.search(x.name)?.insert(element.name);
            }
          });
        });
    
        return { dependencyGraph, cliTree, packagePaths };
      }
}