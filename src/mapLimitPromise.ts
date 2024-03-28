import { mapLimit } from 'async';
import type { IMapLimitPromiseAsyncFunction } from './types';
import { asyncMapIteratee } from './util/asyncMapIteratee';

/**
 * @function mapLimitPromise
 * @description Promise-wrapped async.mapLimit
 */
export function mapLimitPromise<Input, Output>(
    items: Array<Input>,
    limit: number,
    cb: IMapLimitPromiseAsyncFunction<Input, Output>,
): Promise<Array<Output>> {
    return new Promise((resolve, reject) =>
        mapLimit(items, limit, asyncMapIteratee(cb), (err, results) =>
            err ? reject(err) : resolve(results as Array<Output>),
        ),
    );
}
