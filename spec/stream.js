/* global stream, describe, it, expect, should */

describe('Stream()', function () {
  'use strict';

  it('exists', function () {
    expect(Stream).to.be.a('function');
  });

  it('can create Stream with no arguments', function () {
    var stream = new Stream();
    expect(stream.streamFirst).to.equal(undefined);
    expect(stream.streamRest).to.be.a('function');
  });

  it('can create Stream with only one value', function () {
    var stream = new Stream(1);
    expect(stream.streamFirst).to.equal(1);
    expect(stream.streamRest).to.be.a('function');
    expect(Stream.isEmpty(stream)).to.equal(false);
  });

  it('can pick the first n items of a Stream', function () {
    var stream = Stream.Ones();
    expect(stream.streamFirst).to.equal(1);
    expect(stream.streamRest).to.be.a('function');
    expect(stream.pick(4)).to.deep.equal([1,1,1,1]);
  });
  
  it('can add two Streams', function () {
    var s1 = Stream.Ones();
    var s2 = Stream.Ones();
    var sum = Stream.add(s1, s2);
    expect(sum.streamFirst).to.equal(2);
    expect(sum.streamRest).to.be.a('function');
    expect(sum.valueAt(4)).to.equal(2);
  });
});
