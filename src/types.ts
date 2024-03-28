/**
 * @interface IMapLimitPromiseAsyncFunction
 * @description map(Limit) callback function
 */
export type IMapLimitPromiseAsyncFunction<Input, Output> = (iteratee: Input) => Promise<Output>;

/**
 * @interface IParallelPromiseAsyncFunction
 * @description parallel(Limit) callback function
 */
export type IParallelPromiseAsyncFunction<Output> = () => Promise<Output>;

/**
 * @interface IParallelPromiseAsyncFunctionDict
 * @description parallel(Limit) callback function dictionary
 */
export type IParallelPromiseAsyncFunctionDict<Output> = Record<
    string,
    IParallelPromiseAsyncFunction<Output>
>;

/**
 * @interface IAsyncMap
 * @description Dictionary of async functions
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IAsyncMap = Record<string, any>;
