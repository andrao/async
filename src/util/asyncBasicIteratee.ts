import { asyncify, type AsyncFunction } from 'async';
import type { IParallelPromiseAsyncFunction } from '../types';

/**
 * @function asyncBasicIteratee
 * @description Replace async wrap iteratee functions with a Node-version-agnostic function
 */
export function asyncBasicIteratee<Output>(
    fcn: IParallelPromiseAsyncFunction<Output>,
): AsyncFunction<Output> {
    return asyncify(
        (): Promise<Output> =>
            new Promise((resolve, reject) => {
                const response = fcn();

                // A: Promise
                if (response instanceof Promise) response.then(resolve).catch(reject);
                // B: Synchronous
                else resolve(response);
            }),
    );
}
