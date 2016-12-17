'use strict';

var Stream = require('../src/stream').Stream;

describe('Stream', function () {
    it('exists', function () {
        expect(Stream).toBeDefined();
    });

    it('head throws an exception for empty Streams', function () {
        var stream = new Stream();
        expect(function () {
            stream.head();
        }).toThrowError(Error, 'Stream is empty!');
    });

    it('tail throws an exception for empty Streams', function () {
        var stream = new Stream();
        expect(function () {
            stream.tail();
        }).toThrowError(Error, 'Stream is empty!');
    });

    it('isEmpty returns true for empty Streams', function () {
        var stream = new Stream();
        expect(stream.isEmpty()).toBeTruthy();
    });

    it('isEmpty returns false for non-empty Streams', function () {
        var stream = Stream.create(1, 2, 3);
        expect(stream.isEmpty()).toBe(false);
    });

    it('can create Stream with only one value', function () {
        var stream = new Stream(1);
        expect(stream.head()).toBe(1);
        expect(stream.isEmpty()).toBe(false);
        expect(function () {
            // tail should be empty stream
            stream.tail().head();
        }).toThrowError(Error, 'Stream is empty!');
    });

    it('can create Streams by passing in values', function () {
        var stream = Stream.create(1, 2, 3);

        expect(stream.isEmpty()).toBe(false);
        expect(stream.length()).toBe(3);

        //Verify elements
        expect(stream.head()).toBe(1);
        expect(stream.elementAt(0)).toBe(1);
        expect(stream.elementAt(1)).toBe(2);
        expect(stream.elementAt(2)).toBe(3);
    });

    it('can create Streams from arrays', function () {
        var stream = Stream.fromArray([1, 2, 3]);

        expect(stream.isEmpty()).toBe(false);
        expect(stream.length()).toBe(3);

        //Verify elements
        expect(stream.head()).toBe(1);
        expect(stream.elementAt(0)).toBe(1);
        expect(stream.elementAt(1)).toBe(2);
        expect(stream.elementAt(2)).toBe(3);
    });

    it('can create Streams from an interval', function () {
        var stream = Stream.fromInterval(1, 3);

        expect(stream.isEmpty()).toBe(false);
        expect(stream.length()).toBe(3);

        //Verify elements
        expect(stream.head()).toBe(1);
        expect(stream.elementAt(0)).toBe(1);
        expect(stream.elementAt(1)).toBe(2);
        expect(stream.elementAt(2)).toBe(3);
    });

    it('can create Streams from an open lower limit', function () {
        var stream = Stream.from(1);

        expect(stream.isEmpty()).toBe(false);

        //Verify elements
        expect(stream.head()).toBe(1);
        expect(stream.elementAt(0)).toBe(1);
        expect(stream.elementAt(1)).toBe(2);
        expect(stream.elementAt(2)).toBe(3);
        //Stream is infinite
        expect(stream.elementAt(201)).toBe(202);
    });

    it('can create Streams up to an upper limit', function () {
        var stream = Stream.upTo(100);

        expect(stream.isEmpty()).toBe(false);

        expect(stream.head()).toBe(0);
        // zero-based index
        expect(stream.length()).toBe(101);

        //Verify elements
        expect(stream.elementAt(0)).toBe(0);
        expect(stream.elementAt(1)).toBe(1);
        expect(stream.elementAt(2)).toBe(2);
        expect(stream.elementAt(100)).toBe(100);
    });

    it('can add two Streams', function () {
        var s1 = Stream.fromArray([1, 2, 3, 4]);
        var s2 = Stream.fromArray([5, 6, 7, 8, 9, 10, 11]);
        var sum = Stream.add(s1, s2);
        expect(sum.head()).toBe(6);

        //Verify elements
        expect(sum.elementAt(0)).toBe(6);
        expect(sum.elementAt(1)).toBe(8);
        expect(sum.elementAt(2)).toBe(10);
        expect(sum.elementAt(3)).toBe(12);
        expect(sum.elementAt(4)).toBe(9);
        expect(sum.elementAt(5)).toBe(10);
        expect(sum.elementAt(6)).toBe(11);
    });

    it('can zip many Streams', function () {
        var s1 = Stream.fromArray([1, 3, 5]);
        var s2 = Stream.fromArray([2, 4, 6, 8]);
        var s3 = Stream.fromArray([5, 10, 15, 20, 25]);
        var sum = Stream.zip(s1, s2, s3);
        expect(sum.head()).toEqual([1, 2, 5]);

        //Verify elements
        expect(sum.elementAt(0)).toEqual([1, 2, 5]);
        expect(sum.elementAt(1)).toEqual([3, 4, 10]);
        expect(sum.elementAt(2)).toEqual([5, 6, 15]);
        expect(sum.elementAt(3)).toEqual([8, 20]);
        expect(sum.elementAt(4)).toEqual([25]);
    });

    it('can append a new stream onto an existing stream', function () {
        var s1 = Stream.fromArray([1, 3, 5]);
        var s2 = Stream.fromArray([2, 4, 6]);
        var concatenated = s1.append(s2);
        expect(concatenated.length()).toBe(6);
        expect(concatenated.toArray()).toEqual([1, 3, 5, 2, 4, 6]);
    });

    it('can pick a new stream from an existing stream', function () {
        var s1 = Stream.fromArray([1, 3, 5, 7, 9, 11]);
        var s2 = s1.pick(3);
        expect(s2.length()).toBe(3);
        expect(s2.toArray()).toEqual([1, 3, 5]);
    });

    it('can find the length of a stream', function () {
        var s1 = Stream.fromArray([1, 3, 5]);
        var sum = s1.length();
        expect(sum).toBe(3);
    });

    it('can reduce a stream with no initial values', function () {
        var s1 = Stream.fromArray([1, 3, 5]);
        var sum = s1.reduce(function (a, b) {
            return a + b;
        });
        expect(sum).toBe(9);

        var product = s1.reduce(function (a, b) {
            return a * b;
        });
        expect(product).toBe(15);
    });

    it('can reduce a stream with initial values', function () {
        var s1 = Stream.fromArray([1, 3, 5]);
        var sum = s1.reduce(function (a, b) {
            return a + b;
        }, 10);
        expect(sum).toBe(19);

        var product = s1.reduce(function (a, b) {
            return a * b;
        }, 2);
        expect(product).toBe(30);
    });

    it('can sum up a stream', function () {
        var s1 = Stream.fromArray([1, 3, 5]);
        var sum = s1.sum();
        expect(sum).toBe(9);
    });

    it('can map over elements of a stream', function () {
        var s1 = Stream.fromArray([1, 3, 5]);
        var triples = s1.map(function (element) {
            return element * 3;
        });
        expect(triples.toArray()).toEqual([3, 9, 15]);
    });

    it('can filter streams', function () {
        var s1 = Stream.fromArray([1, 2, 3, 4, 5]);
        var evenNumbers = s1.filter(function (element) {
            return element % 2 === 0;
        });
        expect(evenNumbers.toArray()).toEqual([2, 4]);
    });

    it('can test for membership of a stream', function () {
        var s1 = Stream.fromArray([1, 2, 3, 4, 5]);
        expect(s1.contains(2)).toBe(true);
        expect(s1.contains(-2)).toBe(false);
    });

    it('can remove elements from a stream', function () {
        var s1 = Stream.fromArray([1, 2, 3, 4, 5]);
        s1 = s1.remove(2);
        expect(s1.length()).toBe(3);
        expect(s1.toArray()).toEqual([3, 4, 5]);
    });

    it('can convert a finite stream to an array', function () {
        var s1 = Stream.fromArray([1, 3, 5]);
        var doubled = s1.map(function (element) {
            return 2 * element;
        });
        expect(doubled.toArray()).toEqual([2, 6, 10]);
    });

    it('Ones return an infinite number of Ones', function () {
        var s1 = Stream.Ones();

        var first5Elements = s1.pick(5);
        expect(first5Elements.toArray()).toEqual([1, 1, 1, 1, 1]);

        expect(s1.elementAt(1000)).toBe(1);
    });

    it('NaturalNumbers returns the infinite stream of Natural Numbers', function () {
        var s1 = Stream.NaturalNumbers();

        var first5Elements = s1.pick(5);
        expect(first5Elements.toArray()).toEqual([1, 2, 3, 4, 5]);
    });
});
