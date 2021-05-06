"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageJsonLoader = void 0;
const fs = require("fs-extra");
const path = require("path");
class PackageJsonLoader {
    async loadRepositoryPackageJson() {
        return await fs.readJSON(path.join("package.json"));
    }
    loadPackageJson(pathToFile) {
    }
    loadPackageJsonSync(pathToFile) {
    }
}
exports.PackageJsonLoader = PackageJsonLoader;
//# sourceMappingURL=package-json-loader.js.map