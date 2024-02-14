/**
 * Convert size expression to bytes.
 * @param {string | number} size - Size expression or bytes integer
 * @returns {number} Size in bytes
 * @example
 * bytes('1mb');
 * bytes('12.5Mb');
 * bytes('1 gigabyte + 12MB');
 */
export function bytes(size: string | number): number;
/**
 * Convert size expression to kilobytes.
 * @param {string | number} size - Size expression or bytes integer
 * @returns {number} Size in kilobytes
 */
export function kilobytes(size: string | number): number;
/**
 * Convert size expression to megabytes.
 * @param {string | number} size - Size expression or bytes integer
 * @returns {number} Size in megabytes
 */
export function megabytes(size: string | number): number;
/**
 * Convert size expression to gigabytes.
 * @param {string | number} size - Size expression or bytes integer
 * @returns {number} Size in gigabytes
 */
export function gigabytes(size: string | number): number;
/**
 * Convert size expression to terabytes.
 * @param {string | number} size - Size expression or bytes integer
 * @returns {number} Size in terabytes
 */
export function terabytes(size: string | number): number;
