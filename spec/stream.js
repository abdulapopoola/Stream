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

  // Add more assertions here
});
