export type ITokenGeneratorFactory = (...args: any[]) => TokenGenerator;

export interface TokenGenerator {
    generate();
}