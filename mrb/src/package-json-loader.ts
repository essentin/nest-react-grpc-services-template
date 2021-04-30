import * as fs from "fs-extra";
import * as path from "path";

export class PackageJsonLoader {

    async loadRepositoryPackageJson() {
       return await fs.readJSON(path.join("package.json"));
    }

    loadPackageJson(pathToFile: string) {

    }

    loadPackageJsonSync(pathToFile: string) {
        
    }
}