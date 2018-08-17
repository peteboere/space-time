'use strict';

const self = module.exports = {};

/*
 * Space
 */
const kilobyte = 1024;
const megabyte = Math.pow(kilobyte, 2);
const gigabyte = Math.pow(kilobyte, 3);
const terabyte = Math.pow(kilobyte, 4);

function bytes(size) {
    if (typeof size !== 'string') {
        return typeof size === 'number' ? size : 0;
    }

    const patt = /(\d*\.?\d+)\s*(t|g|m|k|b)?/ig;
    let bytes = 0;
    let match;
    while ((match = patt.exec(size))) {
        const factor = parseFloat(match[1]);
        const unit = match[2] && match[2].toLowerCase();
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

function kilobytes(size) {
    return (bytes(size) / kilobyte) || 0;
}
function megabytes(size) {
    return (bytes(size) / megabyte) || 0;
}
function gigabytes(size) {
    return (bytes(size) / gigabyte) || 0;
}
function terabytes(size) {
    return (bytes(size) / terabyte) || 0;
}

Object.assign(self, {
    bytes,
    kilobytes,
    megabytes,
    gigabytes,
    terabytes,
});

/*
 * Time
 */
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const lunarMonth = day * 29.53059;
const year = day * 365.25;
const month = (year / 12);

function ms(time) {
    if (typeof time !== 'string') {
        return typeof time === 'number' ? time : 0;
    }

    const patt = /(\d*\.?\d+)\s*(y|m(?:[sot])|l|w|d|h|m|s)?/ig;
    let ms = 0;
    let match;
    while ((match = patt.exec(time))) {
        const factor = parseFloat(match[1]);
        const unit = match[2] && match[2].toLowerCase();
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

function seconds(time) {
    return (ms(time) / 1000) || 0;
}
function minutes(time) {
    return (seconds(time) / 60) || 0;
}
function hours(time) {
    return (minutes(time) / 60) || 0;
}
function days(time) {
    return (hours(time) / 24) || 0;
}
function weeks(time) {
    return (days(time) / 7) || 0;
}
function months(time) {
    return (days(time) / (365.25 / 12)) || 0;
}
function years(time) {
    return (months(time) / 12) || 0;
}

const timeHandlers = {
    ms,
    seconds,
    minutes,
    hours,
    days,
    weeks,
    months,
    years,
};

for (const fn of Object.values(timeHandlers)) {
    fn.now = (arg, {now=Date.now}={}) => {
        const directionPatt = /^\s*([+-])\s*/;
        const m = directionPatt.exec(arg);
        if (! m) {
            throw new TypeError(`Relative time argument requires a '+' or '-' prefix`);
        }
        arg = arg.replace(directionPatt, '');
        return fn((m[1] === '-') ? (now() - ms(arg)) : (now() + ms(arg)));
    };
}

Object.assign(self, timeHandlers);
