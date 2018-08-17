'use strict';

const {expect} = require('chai');
const spaceTime = require('../index');
const {ms, seconds, minutes, hours, days, weeks, months, years} = spaceTime;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const lunarMonth = day * 29.53059;
const year = day * 365.25;
const month = (year / 12);

describe('Time', function () {
    it('ms() should take a variety of time descriptions', function () {
        let expected;

        expected = 0;
        expect(ms('')).to.equal(expected);
        expect(ms(null)).to.equal(expected);
        expect(ms(undefined)).to.equal(expected);
        expect(ms('0')).to.equal(expected);
        expect(ms(0)).to.equal(expected);

        expected = 1;
        expect(ms('1')).to.equal(expected);
        expect(ms(1)).to.equal(expected);

        expected = second;
        expect(ms('1s')).to.equal(expected);
        expect(ms('1S')).to.equal(expected);
        expect(ms('1sec')).to.equal(expected);
        expect(ms('1 sec')).to.equal(expected);
        expect(ms('1 second')).to.equal(expected);
        expect(ms('1.0s')).to.equal(expected);

        expected = second * .5;
        expect(ms('.5s')).to.equal(expected);
        expect(ms('0.5 sec')).to.equal(expected);
        expected = second * 1.5;
        expect(ms('1.5s')).to.equal(expected);

        expected = minute;
        expect(ms('1m')).to.equal(expected);
        expect(ms('1minute')).to.equal(expected);
        expect(ms('1 Min')).to.equal(expected);
        expected = minute * .5;
        expect(ms('0.5 minutes')).to.equal(expected);
        expected = minute * 1.5;
        expect(ms('1.5 minutes')).to.equal(expected);

        expected = hour * 1;
        expect(ms('1 hour')).to.equal(expected);
        expected = hour * .5;
        expect(ms('.5hrs')).to.equal(expected);
        expected = hour * 10;
        expect(ms('10h')).to.equal(expected);

        expected = day * 1;
        expect(ms('1D')).to.equal(expected);
        expect(ms('1 day')).to.equal(expected);
        expected = day * 1.5;
        expect(ms('1.5 days')).to.equal(expected);

        expected = month * 1;
        expect(ms('1 month')).to.equal(expected);
        expect(ms('1 mth')).to.equal(expected);
        expected = month * 1.5;
        expect(ms('1.5 months')).to.equal(expected);

        expected = lunarMonth * 1;
        expect(ms('1 lunar month')).to.equal(expected);
        expect(ms('1lm')).to.equal(expected);
        expected = lunarMonth * 1.5;
        expect(ms('1.5 lunar mths')).to.equal(expected);

        expected = year * 1;
        expect(ms('1 year')).to.equal(expected);
        expect(ms('1yr')).to.equal(expected);
        expect(ms('1Y')).to.equal(expected);
        expected = year * 1.5;
        expect(ms('1.5 years')).to.equal(expected);
        expect(ms('1.5y')).to.equal(expected);
        expect(ms('1.5 yrs')).to.equal(expected);
    });

    it('ms() should take combinations of times', function () {
        let expected;

        expected = minute + (3 * second);
        expect(ms('1 minute and 3 seconds')).to.equal(expected);
        expect(ms('1m 3s')).to.equal(expected);
        expect(ms('1min 3seconds')).to.equal(expected);

        expected = (40 * day) + (5 * hour) + (20 * minute) + (50 * second);
        expect(ms('40 days, 5 hours, 20 minutes and 50 seconds to be exact')).to.equal(expected);
        expect(ms('40d 5h 20m 50s')).to.equal(expected);
    });

    it('seconds() should work in the same way, but return seconds', function () {
        let expected;

        expected = 60;
        expect(seconds('1m')).to.equal(expected);

        expected = 63;
        expect(seconds('1 minute and 3 seconds')).to.equal(expected);
        expect(seconds('1m 3s')).to.equal(expected);
        expect(seconds('1min 3seconds')).to.equal(expected);
    });

    it('minutes() should work in the same way, but return minutes', function () {
        let expected;

        expected = 0;
        expect(minutes('0')).to.equal(expected);
        expect(minutes(undefined)).to.equal(expected);

        expected = 1;
        expect(minutes('1m')).to.equal(expected);

        expected = 1.5;
        expect(minutes('1 minute and 30 seconds')).to.equal(expected);
        expect(minutes('1m 30s')).to.equal(expected);
        expect(minutes('1min 30seconds')).to.equal(expected);
    });

    it('hours() should work in the same way, but return hours', function () {
        let expected;

        expected = 0;
        expect(hours('0')).to.equal(expected);
        expect(hours(undefined)).to.equal(expected);

        expected = 1;
        expect(hours('59 minutes and 60 seconds')).to.equal(expected);

        expected = 1.5;
        expect(hours('1 min, 59 minutes and 29 minutes and 60 seconds')).to.equal(expected);
        expect(hours('1h 30m')).to.equal(expected);
        expect(hours('1.5h')).to.equal(expected);
    });

    it('days() should work in the same way, but return days', function () {
        let expected;

        expected = 0;
        expect(days('0')).to.equal(expected);
        expect(days(undefined)).to.equal(expected);

        expected = 1;
        expect(days('1 day')).to.equal(expected);
        expected = 29.53059;
        expect(days('1 lunar month')).to.equal(expected);
    });

    it('weeks() should work in the same way, but return weeks', function () {
        let expected;

        expected = 0;
        expect(weeks('0')).to.equal(expected);
        expect(weeks(undefined)).to.equal(expected);

        expected = 1;
        expect(weeks('7d')).to.equal(expected);
        expected = 52;
        expect(Math.round(weeks('1 year'))).to.equal(expected);
    });

    it('months() should work in the same way, but return months', function () {
        let expected;

        expected = 0;
        expect(months('0')).to.equal(expected);
        expect(months(undefined)).to.equal(expected);

        expected = 1;
        expect(months('1 month')).to.equal(expected);
        expected = 6;
        expect(months('.5y')).to.equal(expected);
    });

    it('years() should work in the same way, but return years', function () {
        let expected;

        expected = 0;
        expect(years('0')).to.equal(expected);
        expect(years(undefined)).to.equal(expected);

        expected = .5;
        expect(years('6 months')).to.equal(expected);
        expected = 1;
        expect(years('365.25 days')).to.equal(expected);
        expect(years('12mths')).to.equal(expected);
        expect(years('1 month and 11 months')).to.equal(expected);
    });

    it('*.now() functions should create relative values', function () {
        const now = Date.now();
        expect(() => ms.now('1m')).to.throw(TypeError, /requires a '\+' or '-' prefix/);
        expect(ms.now('+1m')).to.be.above(now);
        expect(ms.now(' + 1m')).to.be.above(now);
        expect(ms.now('-1m')).to.be.below(now);
        expect(ms.now(' - 1m')).to.be.below(now);

        const fixedNow = Date.now();
        const options = {now: () => fixedNow};
        expect(ms.now('+0s', options)).to.equal(fixedNow);
        expect(ms.now('+2ms', options)).to.equal(fixedNow + 2);

        ['2d', '10s', 500, '1 day', '5 mins'].forEach(time => {
            [ms, seconds, minutes, hours, days, weeks, months, years].forEach(fn => {
                expect(fn.now(`+${time}`, options)).to.equal(fn(fixedNow + ms(time)));
                expect(fn.now(`-${time}`, options)).to.equal(fn(fixedNow - ms(time)));
            });
        });
    });
});
