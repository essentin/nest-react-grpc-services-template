import { Command, flags } from "@oclif/command";
import TreeModelTypes = require("tree-model/types");
declare class Mrb extends Command {
    static description: string;
    static strict: boolean;
    static flags: {
        version: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        parallel: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        packagesOnly: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        libsOnly: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        npmRun: flags.IOptionFlag<string>;
        nr: flags.IOptionFlag<string>;
        treeOrder: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    getDepdendenciesOfPackageTypes(foldersToSearchIn: string[]): {
        dependencyGraph: any;
        tree: import("cli-ux/lib/styled/tree").Tree;
        packagePaths: any;
    };
    analyzeDependencies(): Promise<{
        allResults: {
            dependencyGraph: any;
            tree: import("cli-ux/lib/styled/tree").Tree;
            packagePaths: any;
        };
        roots: TreeModelTypes.Node<{
            name: string;
            children: any;
        }>[];
    }>;
    private findNode;
    run(): Promise<void>;
}
export = Mrb;
