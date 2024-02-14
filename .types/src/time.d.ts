/**
 * Convert time expression to milliseconds.
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Milliseconds
 * @example
 * ms('1h');
 * ms('1 hr and 30 mins');
 * ms('52w 5h 1d');
 */
export function ms(time: string | number): number;
export namespace ms {
    function now(relativeTimeExpression: string, options?: {
        now?: () => number;
    }): number;
}
/**
 * Convert time expression to seconds.
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Seconds
 */
export function seconds(time: string | number): number;
export namespace seconds {
    export function now_1(relativeTimeExpression: string, options?: {
        now?: () => number;
    }): number;
    export { now_1 as now };
}
/**
 * Convert time expression to minutes.
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Minutes
 */
export function minutes(time: string | number): number;
export namespace minutes {
    export function now_2(relativeTimeExpression: string, options?: {
        now?: () => number;
    }): number;
    export { now_2 as now };
}
/**
 * Convert time expression to hours.
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Hours
 */
export function hours(time: string | number): number;
export namespace hours {
    export function now_3(relativeTimeExpression: string, options?: {
        now?: () => number;
    }): number;
    export { now_3 as now };
}
/**
 * Convert time expression to days.
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Days
 */
export function days(time: string | number): number;
export namespace days {
    export function now_4(relativeTimeExpression: string, options?: {
        now?: () => number;
    }): number;
    export { now_4 as now };
}
/**
 * Convert time expression to weeks.
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Weeks
 */
export function weeks(time: string | number): number;
export namespace weeks {
    export function now_5(relativeTimeExpression: string, options?: {
        now?: () => number;
    }): number;
    export { now_5 as now };
}
/**
 * Convert time expression to months.
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Months
 */
export function months(time: string | number): number;
export namespace months {
    export function now_6(relativeTimeExpression: string, options?: {
        now?: () => number;
    }): number;
    export { now_6 as now };
}
/**
 * Convert time expression to years.
 * @param {string | number} time - Time expression or milliseconds
 * @returns {number} Years
 */
export function years(time: string | number): number;
export namespace years {
    export function now_7(relativeTimeExpression: string, options?: {
        now?: () => number;
    }): number;
    export { now_7 as now };
}
