"use strict";

/*
 Space
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
    while (match = patt.exec(size)) {
        let factor = parseFloat(match[1]);
        let unit = match[2] && match[2].toLowerCase();
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


/*
 Time
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

    const patt = /(\d*\.?\d+)\s*(y|m(?:[ot])|l|w|d|h|m|s)?/ig;
    let ms = 0;
    let match;
    while (match = patt.exec(time)) {
        let factor = parseFloat(match[1]);
        let unit = match[2] && match[2].toLowerCase();
        switch (unit) {
            case 'y':
                ms += factor * year;
                break;
            case 'l':
                ms += factor * lunarMonth;
                break;
            case 'mo':
            case 'mt':
                ms += factor * month;
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
            case 'm':
                ms += factor * minute;
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


module.exports = {
    bytes: bytes,
    kilobytes: kilobytes,
    megabytes: megabytes,
    gigabytes: gigabytes,
    terabytes: terabytes,

    ms: ms,
    seconds: seconds,
    minutes: minutes,
    hours: hours,
    days: days,
    weeks: weeks,
    months: months,
    years: years,
};
