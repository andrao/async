import { parallelLimit, type AsyncFunction, type Dictionary } from 'async';
import type {
    IAsyncMap,
    IParallelPromiseAsyncFunction,
    IParallelPromiseAsyncFunctionDict,
} from './types';
import { asyncBasicIteratee } from './util/asyncBasicIteratee';

/**
 * @function parallelLimitPromise
 * @description Promise-wrapped async.parallelLimit
 */
export function parallelLimitPromise<M extends IAsyncMap>(
    cbs: {
        [name in keyof M]: IParallelPromiseAsyncFunction<M[name]>;
    },
    limit: number,
): Promise<M>;
export function parallelLimitPromise<Output>(
    cbs: IParallelPromiseAsyncFunctionDict<Output>,
    limit: number,
): Promise<Dictionary<Output>>;
export function parallelLimitPromise<Output>(
    cbs: Array<IParallelPromiseAsyncFunction<Output>>,
    limit: number,
): Promise<Array<Output>>;
export function parallelLimitPromise<Output>(
    cbs: IParallelPromiseAsyncFunctionDict<Output> | Array<IParallelPromiseAsyncFunction<Output>>,
    limit: number,
): Promise<Dictionary<Output> | Array<Output>> {
    return new Promise((resolve, reject) => {
        //  A: Input array
        if (Array.isArray(cbs)) {
            const iteratees = cbs.map(fcn => asyncBasicIteratee(fcn));

            parallelLimit(iteratees, limit, (err, results) => {
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

            parallelLimit(iteratees, limit, (err, results) => {
                if (err) reject(err);
                else resolve(results as Dictionary<Output>);
            });
        }
    });
}
