import { asyncify, type AsyncResultIterator } from 'async';
import type { IMapLimitPromiseAsyncFunction } from '../types';

/**
 * @function asyncMapIteratee
 * @description Replace async wrap iteratee functions with a Node-version-agnostic function
 */
export function asyncMapIteratee<Input, Output>(
    fcn: IMapLimitPromiseAsyncFunction<Input, Output>,
): AsyncResultIterator<Input, Output> {
    return asyncify(
        (item: Input): Promise<Output> =>
            new Promise((resolve, reject) => {
                const response = fcn(item);

                // A: Promise
                if (response instanceof Promise) response.then(resolve).catch(reject);
                // B: Synchronous
                else resolve(response);
            }),
    );
}
