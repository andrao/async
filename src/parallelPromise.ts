import { parallel, type AsyncFunction, type Dictionary } from 'async';
import type {
    IAsyncMap,
    IParallelPromiseAsyncFunction,
    IParallelPromiseAsyncFunctionDict,
} from './types';
import { asyncBasicIteratee } from './util/asyncBasicIteratee';

/**
 * @function parallelPromise
 * @description Promise-wrapped async.parallelPromise
 */
export function parallelPromise<M extends IAsyncMap>(cbs: {
    [name in keyof M]: IParallelPromiseAsyncFunction<M[name]>;
}): Promise<M>;
export function parallelPromise<Output>(
    cbs: IParallelPromiseAsyncFunctionDict<Output>,
): Promise<Dictionary<Output>>;
export function parallelPromise<Output>(
    cbs: Array<IParallelPromiseAsyncFunction<Output>>,
): Promise<Array<Output>>;
export function parallelPromise<Output>(
    cbs: IParallelPromiseAsyncFunctionDict<Output> | Array<IParallelPromiseAsyncFunction<Output>>,
): Promise<Dictionary<Output> | Array<Output>> {
    return new Promise((resolve, reject) => {
        //  A: Input array
        if (Array.isArray(cbs)) {
            const iteratees = cbs.map(cb => asyncBasicIteratee(cb));

            parallel(iteratees, (err, results) => {
                if (err) reject(err);
                else resolve(results as Array<Output>);
            });
        }

        //  B: Input record
        else {
            const iteratees = Object.entries(cbs).reduce<Dictionary<AsyncFunction<Output>>>(
                (acc, [key, cb]) => ({
                    ...acc,
                    [key]: asyncBasicIteratee(cb),
                }),
                {},
            );

            parallel(iteratees, (err, results) => {
                if (err) reject(err);
                else resolve(results as Dictionary<Output>);
            });
        }
    });
}
