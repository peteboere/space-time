import {describe, it} from 'node:test';
import {strict as assert} from 'node:assert';
import {ms, seconds, minutes, hours, days, weeks, months, years} from '../index.js';

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
        assert.equal(ms(''), expected);
        assert.equal(ms(null), expected);
        assert.equal(ms(undefined), expected);
        assert.equal(ms('0'), expected);
        assert.equal(ms(0), expected);

        expected = 1;
        assert.equal(ms('1'), expected);
        assert.equal(ms(1), expected);

        expected = second;
        assert.equal(ms('1s'), expected);
        assert.equal(ms('1S'), expected);
        assert.equal(ms('1sec'), expected);
        assert.equal(ms('1 sec'), expected);
        assert.equal(ms('1 second'), expected);
        assert.equal(ms('1.0s'), expected);

        expected = second * .5;
        assert.equal(ms('.5s'), expected);
        assert.equal(ms('0.5 sec'), expected);
        expected = second * 1.5;
        assert.equal(ms('1.5s'), expected);

        expected = minute;
        assert.equal(ms('1m'), expected);
        assert.equal(ms('1minute'), expected);
        assert.equal(ms('1 Min'), expected);
        expected = minute * .5;
        assert.equal(ms('0.5 minutes'), expected);
        expected = minute * 1.5;
        assert.equal(ms('1.5 minutes'), expected);

        expected = hour * 1;
        assert.equal(ms('1 hour'), expected);
        expected = hour * .5;
        assert.equal(ms('.5hrs'), expected);
        expected = hour * 10;
        assert.equal(ms('10h'), expected);

        expected = day * 1;
        assert.equal(ms('1D'), expected);
        assert.equal(ms('1 day'), expected);
        expected = day * 1.5;
        assert.equal(ms('1.5 days'), expected);

        expected = month * 1;
        assert.equal(ms('1 month'), expected);
        assert.equal(ms('1 mth'), expected);
        expected = month * 1.5;
        assert.equal(ms('1.5 months'), expected);

        expected = lunarMonth * 1;
        assert.equal(ms('1 lunar month'), expected);
        assert.equal(ms('1lm'), expected);
        expected = lunarMonth * 1.5;
        assert.equal(ms('1.5 lunar mths'), expected);

        expected = year * 1;
        assert.equal(ms('1 year'), expected);
        assert.equal(ms('1yr'), expected);
        assert.equal(ms('1Y'), expected);
        expected = year * 1.5;
        assert.equal(ms('1.5 years'), expected);
        assert.equal(ms('1.5y'), expected);
        assert.equal(ms('1.5 yrs'), expected);
    });

    it('ms() should take combinations of times', function () {

        let expected;

        expected = minute + (3 * second);
        assert.equal(ms('1 minute and 3 seconds'), expected);
        assert.equal(ms('1m 3s'), expected);
        assert.equal(ms('1min 3seconds'), expected);

        expected = (40 * day) + (5 * hour) + (20 * minute) + (50 * second);
        assert.equal(ms('40 days, 5 hours, 20 minutes and 50 seconds to be exact'), expected);
        assert.equal(ms('40d 5h 20m 50s'), expected);
    });

    it('seconds() should work in the same way, but return seconds', function () {

        let expected;

        expected = 60;
        assert.equal(seconds('1m'), expected);

        expected = 63;
        assert.equal(seconds('1 minute and 3 seconds'), expected);
        assert.equal(seconds('1m 3s'), expected);
        assert.equal(seconds('1min 3seconds'), expected);
    });

    it('minutes() should work in the same way, but return minutes', function () {
        let expected;

        expected = 0;
        assert.equal(minutes('0'), expected);
        assert.equal(minutes(undefined), expected);

        expected = 1;
        assert.equal(minutes('1m'), expected);

        expected = 1.5;
        assert.equal(minutes('1 minute and 30 seconds'), expected);
        assert.equal(minutes('1m 30s'), expected);
        assert.equal(minutes('1min 30seconds'), expected);
    });

    it('hours() should work in the same way, but return hours', function () {

        let expected;

        expected = 0;
        assert.equal(hours('0'), expected);
        assert.equal(hours(undefined), expected);

        expected = 1;
        assert.equal(hours('59 minutes and 60 seconds'), expected);

        expected = 1.5;
        assert.equal(hours('1 min, 59 minutes and 29 minutes and 60 seconds'), expected);
        assert.equal(hours('1h 30m'), expected);
        assert.equal(hours('1.5h'), expected);
    });

    it('days() should work in the same way, but return days', function () {

        let expected;

        expected = 0;
        assert.equal(days('0'), expected);
        assert.equal(days(undefined), expected);

        expected = 1;
        assert.equal(days('1 day'), expected);
        expected = 29.53059;
        assert.equal(days('1 lunar month'), expected);
    });

    it('weeks() should work in the same way, but return weeks', function () {

        let expected;

        expected = 0;
        assert.equal(weeks('0'), expected);
        assert.equal(weeks(undefined), expected);

        expected = 1;
        assert.equal(weeks('7d'), expected);
        expected = 52;
        assert.equal(Math.round(weeks('1 year')), expected);
    });

    it('months() should work in the same way, but return months', function () {

        let expected;

        expected = 0;
        assert.equal(months('0'), expected);
        assert.equal(months(undefined), expected);

        expected = 1;
        assert.equal(months('1 month'), expected);
        expected = 6;
        assert.equal(months('.5y'), expected);
    });

    it('years() should work in the same way, but return years', function () {

        let expected;

        expected = 0;
        assert.equal(years('0'), expected);
        assert.equal(years(undefined), expected);

        expected = .5;
        assert.equal(years('6 months'), expected);
        expected = 1;
        assert.equal(years('365.25 days'), expected);
        assert.equal(years('12mths'), expected);
        assert.equal(years('1 month and 11 months'), expected);
    });

    it('*.now() functions should create relative values', function () {

        const now = Date.now();

        assert.throws(() => ms.now('1m'), {
            name: 'TypeError',
            message: /requires a '\+' or '-' prefix/,
        });
        assert(ms.now('+1m') > now);
        assert(ms.now(' + 1m') > now);
        assert(ms.now('-1m') < now);
        assert(ms.now(' - 1m') < now);

        const fixedNow = Date.now();
        const options = {now: () => fixedNow};
        assert.equal(ms.now('+0s', options), fixedNow);
        assert.equal(ms.now('+2ms', options), fixedNow + 2);

        ['2d', '10s', 500, '1 day', '5 mins'].forEach(time => {
            [ms, seconds, minutes, hours, days, weeks, months, years].forEach(fn => {
                assert.equal(fn.now(`+${time}`, options), fn(fixedNow + ms(time)));
                assert.equal(fn.now(`-${time}`, options), fn(fixedNow - ms(time)));
            });
        });
    });
});
