'use strict';

const {expect} = require('chai');
const spaceTime = require('../index');
const {bytes, kilobytes, megabytes, gigabytes, terabytes} = spaceTime;

const kilobyte = 1024;
const megabyte = Math.pow(kilobyte, 2);
const gigabyte = Math.pow(kilobyte, 3);
const terabyte = Math.pow(kilobyte, 4);

describe('Space', function () {
    it('bytes() should take a variety of size descriptions', function () {
        let expected;

        expected = 0;
        expect(bytes('')).to.equal(expected);
        expect(bytes(null)).to.equal(expected);
        expect(bytes(undefined)).to.equal(expected);
        expect(bytes('0')).to.equal(expected);
        expect(bytes(0)).to.equal(expected);

        expected = 1;
        expect(bytes('1')).to.equal(expected);
        expect(bytes(1)).to.equal(expected);

        expected = kilobyte;
        expect(bytes('1k')).to.equal(expected);
        expect(bytes('1K')).to.equal(expected);
        expect(bytes('1kb')).to.equal(expected);
        expect(bytes('1 kilobyte')).to.equal(expected);
        expect(bytes('1.0kb')).to.equal(expected);

        expected = kilobyte + (kilobyte / 2);
        expect(bytes('1.5kb')).to.equal(expected);
        expect(bytes('.5kb and 1kb')).to.equal(expected);
        expect(bytes('1.5 kilobytes')).to.equal(expected);

        expected = megabyte;
        expect(bytes('1m')).to.equal(expected);
        expect(bytes('1MB')).to.equal(expected);
        expect(bytes('1 megabyte')).to.equal(expected);

        expected = gigabyte;
        expect(bytes('1g')).to.equal(expected);
        expect(bytes('1GB')).to.equal(expected);
        expect(bytes('1 gig')).to.equal(expected);
        expect(bytes('1 gigabyte')).to.equal(expected);

        expected = terabyte;
        expect(bytes('1t')).to.equal(expected);
        expect(bytes('1T')).to.equal(expected);
        expect(bytes('1 tb')).to.equal(expected);
        expect(bytes('1 terabyte')).to.equal(expected);
    });

    it('bytes() should take combinations of times', function () {
        let expected;

        expected = megabyte + (3 * kilobyte);
        expect(bytes('1M 3KB')).to.equal(expected);
        expect(bytes('1mb 3kb')).to.equal(expected);
        expect(bytes('1 megabyte and 3 kilobytes')).to.equal(expected);

        expected = (2 * terabyte) + (10 * gigabyte) + (5 * megabyte) + (20 * kilobyte);
        expect(bytes('2 terabytes, 10 gigabytes, 5 megabytes and 20 kilobytes to be exact')).to.equal(expected);
        expect(bytes('2tb + 10gb + 5mb + 20kb')).to.equal(expected);
    });

    it('kilobytes() should work in the same way, but return kilobytes', function () {
        let expected;

        expected = 0;
        expect(kilobytes('0')).to.equal(expected);
        expect(kilobytes(undefined)).to.equal(expected);

        expected = 1;
        expect(kilobytes('1024')).to.equal(expected);
        expect(kilobytes(1024)).to.equal(expected);
        expect(parseFloat(kilobytes('.00098mb').toFixed(2))).to.equal(expected);
    });

    it('megabytes() should work in the same way, but return megabytes', function () {
        let expected;

        expected = 0;
        expect(megabytes('0')).to.equal(expected);
        expect(megabytes(undefined)).to.equal(expected);

        expected = 1;
        expect(megabytes('1024kb')).to.equal(expected);
        expect(parseFloat(megabytes('.00098gb').toFixed(2))).to.equal(expected);
    });

    it('gigabytes() should work in the same way, but return gigabytes', function () {
        let expected;

        expected = 0;
        expect(gigabytes('0')).to.equal(expected);
        expect(gigabytes(undefined)).to.equal(expected);

        expected = 1;
        expect(gigabytes('1024 megabytes')).to.equal(expected);
        expect(parseFloat(gigabytes('.00098tb').toFixed(2))).to.equal(expected);
    });

    it('terabytes() should work in the same way, but return terabytes', function () {
        let expected;

        expected = 0;
        expect(terabytes('0')).to.equal(expected);
        expect(terabytes(undefined)).to.equal(expected);

        expected = 1;
        expect(terabytes('1024 gigabytes')).to.equal(expected);
        expect(terabytes('1023Gb plus 1024Mb')).to.equal(expected);
    });
});
