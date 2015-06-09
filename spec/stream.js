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

  it('does something else', function () {
    expect(true).to.equal(false);
  });

  // Add more assertions here
});
