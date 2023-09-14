const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const lunarMonth = day * 29.53059;
const year = day * 365.25;
const month = (year / 12);

/**
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Milliseconds
 * @example
 * ms('1h');
 * ms('1 hr and 30 mins');
 * ms('52w 5h 1d');
 */
export function ms(time) {

    if (typeof time !== 'string') {
        return (typeof time === 'number')
            ? time
            : 0;
    }

    const patt = /(\d*\.?\d+)\s*(y|m(?:[sot])|l|w|d|h|m|s)?/ig;

    let ms = 0;
    let match;

    while ((match = patt.exec(time))) {
        const factor = parseFloat(match[1]);
        const unit = match[2]?.toLowerCase();
        switch (unit) {
            case 'y':
                ms += factor * year;
                break;
            case 'l':
                ms += factor * lunarMonth;
                break;
            case 'ms':
                ms += factor;
                break;
            case 'mo': // fallthrough
            case 'mt':
                ms += factor * month;
                break;
            case 'm':
                ms += factor * minute;
                break;
            case 'w':
                ms += factor * week;
                break;
            case 'd':
                ms += factor * day;
                break;
            case 'h':
                ms += factor * hour;
                break;
            case 's':
                ms += factor * second;
                break;
            default:
                ms += factor;
                break;
        }
    }

    return ms;
}

/**
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Seconds
 */
export function seconds(time) {
    return (ms(time) / 1000) || 0;
}

/**
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Minutes
 */
export function minutes(time) {
    return (seconds(time) / 60) || 0;
}

/**
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Hours
 */
export function hours(time) {
    return (minutes(time) / 60) || 0;
}

/**
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Days
 */
export function days(time) {
    return (hours(time) / 24) || 0;
}

/**
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Weeks
 */
export function weeks(time) {
    return (days(time) / 7) || 0;
}

/**
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Months
 */
export function months(time) {
    return (days(time) / (365.25 / 12)) || 0;
}

/**
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Years
 */
export function years(time) {
    return (months(time) / 12) || 0;
}

ms.now = relativeTimeHandler(ms);
seconds.now = relativeTimeHandler(seconds);
minutes.now = relativeTimeHandler(minutes);
hours.now = relativeTimeHandler(hours);
days.now = relativeTimeHandler(days);
weeks.now = relativeTimeHandler(weeks);
months.now = relativeTimeHandler(months);
years.now = relativeTimeHandler(years);

/**
 * @returns {(
 *    relativeTimeExpression: string,
 *    options?: {now?: () => number},
 * ) => number}
 */
function relativeTimeHandler(fn) {
    return function now(arg, {now=Date.now}={}) {
        const directionPatt = /^\s*([+-])\s*/;
        const m = directionPatt.exec(arg);
        if (! m) {
            throw new TypeError(`Relative time argument requires a '+' or '-' prefix`);
        }
        arg = arg.replace(directionPatt, '');
        return fn((m[1] === '-')
            ? (now() - ms(arg))
            : (now() + ms(arg)));
    };
}
