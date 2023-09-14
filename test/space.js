import {describe, it} from 'node:test';
import {strict as assert} from 'node:assert';
import {bytes, kilobytes, megabytes, gigabytes, terabytes} from '../index.js';

const kilobyte = 1024;
const megabyte = Math.pow(kilobyte, 2);
const gigabyte = Math.pow(kilobyte, 3);
const terabyte = Math.pow(kilobyte, 4);

describe('Space', function () {

    it('bytes() should take a variety of size descriptions', function () {
        let expected;

        expected = 0;
        assert.equal(bytes(''), expected);
        assert.equal(bytes(null), expected);
        assert.equal(bytes(undefined), expected);
        assert.equal(bytes('0'), expected);
        assert.equal(bytes(0), expected);

        expected = 1;
        assert.equal(bytes('1'), expected);
        assert.equal(bytes(1), expected);

        expected = kilobyte;
        assert.equal(bytes('1k'), expected);
        assert.equal(bytes('1K'), expected);
        assert.equal(bytes('1kb'), expected);
        assert.equal(bytes('1 kilobyte'), expected);
        assert.equal(bytes('1.0kb'), expected);

        expected = kilobyte + (kilobyte / 2);
        assert.equal(bytes('1.5kb'), expected);
        assert.equal(bytes('.5kb and 1kb'), expected);
        assert.equal(bytes('1.5 kilobytes'), expected);

        expected = megabyte;
        assert.equal(bytes('1m'), expected);
        assert.equal(bytes('1MB'), expected);
        assert.equal(bytes('1 megabyte'), expected);

        expected = gigabyte;
        assert.equal(bytes('1g'), expected);
        assert.equal(bytes('1GB'), expected);
        assert.equal(bytes('1 gig'), expected);
        assert.equal(bytes('1 gigabyte'), expected);

        expected = terabyte;
        assert.equal(bytes('1t'), expected);
        assert.equal(bytes('1T'), expected);
        assert.equal(bytes('1 tb'), expected);
        assert.equal(bytes('1 terabyte'), expected);
    });

    it('bytes() should take combinations of times', function () {
        let expected;

        expected = megabyte + (3 * kilobyte);
        assert.equal(bytes('1M 3KB'), expected);
        assert.equal(bytes('1mb 3kb'), expected);
        assert.equal(bytes('1 megabyte and 3 kilobytes'), expected);

        expected = (2 * terabyte) + (10 * gigabyte) + (5 * megabyte) + (20 * kilobyte);
        assert.equal(bytes('2 terabytes, 10 gigabytes, 5 megabytes and 20 kilobytes to be exact'), expected);
        assert.equal(bytes('2tb + 10gb + 5mb + 20kb'), expected);
    });

    it('kilobytes() should work in the same way, but return kilobytes', function () {
        let expected;

        expected = 0;
        assert.equal(kilobytes('0'), expected);
        assert.equal(kilobytes(undefined), expected);

        expected = 1;
        assert.equal(kilobytes('1024'), expected);
        assert.equal(kilobytes(1024), expected);
        assert.equal(parseFloat(kilobytes('.00098mb').toFixed(2)), expected);
    });

    it('megabytes() should work in the same way, but return megabytes', function () {
        let expected;

        expected = 0;
        assert.equal(megabytes('0'), expected);
        assert.equal(megabytes(undefined), expected);

        expected = 1;
        assert.equal(megabytes('1024kb'), expected);
        assert.equal(parseFloat(megabytes('.00098gb').toFixed(2)), expected);
    });

    it('gigabytes() should work in the same way, but return gigabytes', function () {
        let expected;

        expected = 0;
        assert.equal(gigabytes('0'), expected);
        assert.equal(gigabytes(undefined), expected);

        expected = 1;
        assert.equal(gigabytes('1024 megabytes'), expected);
        assert.equal(parseFloat(gigabytes('.00098tb').toFixed(2)), expected);
    });

    it('terabytes() should work in the same way, but return terabytes', function () {
        let expected;

        expected = 0;
        assert.equal(terabytes('0'), expected);
        assert.equal(terabytes(undefined), expected);

        expected = 1;
        assert.equal(terabytes('1024 gigabytes'), expected);
        assert.equal(terabytes('1023Gb plus 1024Mb'), expected);
    });
});
