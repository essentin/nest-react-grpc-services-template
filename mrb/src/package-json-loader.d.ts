export declare class PackageJsonLoader {
    loadRepositoryPackageJson(): Promise<any>;
    loadPackageJson(pathToFile: string): void;
    loadPackageJsonSync(pathToFile: string): void;
}
