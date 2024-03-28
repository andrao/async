import { map } from 'async';
import type { IMapLimitPromiseAsyncFunction } from './types';
import { asyncMapIteratee } from './util/asyncMapIteratee';

/**
 * @function mapPromise
 * @description Promise-wrapped async.map
 */
export function mapPromise<Input, Output>(
    items: Array<Input>,
    cb: IMapLimitPromiseAsyncFunction<Input, Output>,
): Promise<Array<Output>> {
    return new Promise((resolve, reject) =>
        map(items, asyncMapIteratee(cb), (err, results) =>
            err ? reject(err) : resolve(results as Array<Output>),
        ),
    );
}
