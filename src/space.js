const kilobyte = 1024;
const megabyte = Math.pow(kilobyte, 2);
const gigabyte = Math.pow(kilobyte, 3);
const terabyte = Math.pow(kilobyte, 4);

/**
 * Convert size expression to bytes.
 * @param {string | number} size - Size expression or bytes integer
 * @returns {number} Size in bytes
 * @example
 * bytes('1mb');
 * bytes('12.5Mb');
 * bytes('1 gigabyte + 12MB');
 */
export function bytes(size) {

    if (typeof size !== 'string') {
        return (typeof size === 'number')
            ? size
            : 0;
    }

    const patt = /(\d*\.?\d+)\s*(t|g|m|k|b)?/ig;

    let bytes = 0;
    let match;

    while ((match = patt.exec(size))) {
        const factor = parseFloat(match[1]);
        const unit = match[2]?.toLowerCase();
        switch (unit) {
            case 't':
                bytes += factor * terabyte;
                break;
            case 'g':
                bytes += factor * gigabyte;
                break;
            case 'm':
                bytes += factor * megabyte;
                break;
            case 'k':
                bytes += factor * kilobyte;
                break;
            default:
                bytes += factor;
                break;
        }
    }

    return bytes;
}

/**
 * Convert size expression to kilobytes.
 * @param {string | number} size - Size expression or bytes integer
 * @returns {number} Size in kilobytes
 */
export function kilobytes(size) {
    return (bytes(size) / kilobyte) || 0;
}

/**
 * Convert size expression to megabytes.
 * @param {string | number} size - Size expression or bytes integer
 * @returns {number} Size in megabytes
 */
export function megabytes(size) {
    return (bytes(size) / megabyte) || 0;
}

/**
 * Convert size expression to gigabytes.
 * @param {string | number} size - Size expression or bytes integer
 * @returns {number} Size in gigabytes
 */
export function gigabytes(size) {
    return (bytes(size) / gigabyte) || 0;
}

/**
 * Convert size expression to terabytes.
 * @param {string | number} size - Size expression or bytes integer
 * @returns {number} Size in terabytes
 */
export function terabytes(size) {
    return (bytes(size) / terabyte) || 0;
}
