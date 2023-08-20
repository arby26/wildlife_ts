/**
 * Executes a callback after a certain amount of milliseconds.
 * @param callback The method to be called after the timeout expired
 * @param timeout The number of milliseconds after which to call the callback
 */
declare function setTimeout(this: void, callback: Function, timeout: number): void;

/**
 * Executes a callback on a interval of a certain amount of milliseconds
 * @param callback The method to be called on an interval of a certain amount of milliseconds
 * @param timeout The number of milliseconds of the interval
 * @return The id of the interval, can be used to cancel the interval later
 */
declare function setTimeout(this: void, callback: Function, timeout: number): number;

/**
 * Cancels a running interval
 * @param id The id of the interval to be canceled
 */
declare function clearTimeout(id: number): void
