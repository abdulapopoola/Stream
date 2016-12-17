/* global Stream, describe, it, expect */

describe('Stream()', function () {
  'use strict';

  it('exists', function () {
    expect(Stream).to.be.a('function');
  });

  it('head throws an exception for empty Streams', function () {
    var stream = new Stream();
    expect(stream.head).to.throw('Stream is empty!');
    expect(stream.tail).to.throw('Stream is empty!');
  });
  
  it('tail throws an exception for empty Streams', function () {
    var stream = new Stream();
    expect(stream.tail).to.throw('Stream is empty!');
  });
  
  it('isEmpty returns true for empty Streams', function () {
    var stream = new Stream();
    expect(stream.isEmpty()).to.equal(true);
  });
  
  it('isEmpty returns false for non-empty Streams', function () {
    var stream = Stream.create(1,2,3);
    expect(stream.isEmpty()).to.equal(false);
  });

  it('can create Stream with only one value', function () {
    var stream = new Stream(1);
    expect(stream.head()).to.equal(1);
    expect(stream.tail).to.throw('Stream is empty!');
    expect(stream.isEmpty()).to.equal(false);
  });
  
  it('can create Streams by passing in values', function () {
    var stream = Stream.create(1,2,3);
    
    expect(stream.isEmpty()).to.equal(false);    
    expect(stream.length()).to.equal(3);
    
    //Verify elements
    expect(stream.head()).to.equal(1);
    expect(stream.elementAt(0)).to.equal(1);
    expect(stream.elementAt(1)).to.equal(2);
    expect(stream.elementAt(2)).to.equal(3);
  });
  
  it('can create Streams from arrays', function () {
    var stream = Stream.fromArray([1,2,3]);
    
    expect(stream.isEmpty()).to.equal(false);    
    expect(stream.length()).to.equal(3);
    
    //Verify elements
    expect(stream.head()).to.equal(1);
    expect(stream.elementAt(0)).to.equal(1);
    expect(stream.elementAt(1)).to.equal(2);
    expect(stream.elementAt(2)).to.equal(3);
  });
  
  it('can create Streams from an interval', function () {
    var stream = Stream.fromInterval(1,3);
    
    expect(stream.isEmpty()).to.equal(false);    
    expect(stream.length()).to.equal(3);
    
    //Verify elements
    expect(stream.head()).to.equal(1);
    expect(stream.elementAt(0)).to.equal(1);
    expect(stream.elementAt(1)).to.equal(2);
    expect(stream.elementAt(2)).to.equal(3);
  });
  
  it('can create Streams from an open lower limit', function () {
    var stream = Stream.from(1);
    
    expect(stream.isEmpty()).to.equal(false);
    
    //Verify elements
    expect(stream.head()).to.equal(1);
    expect(stream.elementAt(0)).to.equal(1);
    expect(stream.elementAt(1)).to.equal(2);
    expect(stream.elementAt(2)).to.equal(3);
    //Stream is infinite
    expect(stream.elementAt(201)).to.equal(202);
  });  
  
  it('can create Streams up to an upper limit', function () {
    var stream = Stream.upTo(100);
    
    expect(stream.isEmpty()).to.equal(false);
    
    expect(stream.head()).to.equal(0);   
    expect(stream.length()).to.equal(101); //zero-based index 
    
    //Verify elements
    expect(stream.elementAt(0)).to.equal(0);
    expect(stream.elementAt(1)).to.equal(1);
    expect(stream.elementAt(2)).to.equal(2);
    expect(stream.elementAt(100)).to.equal(100);
  });

  it('can add two Streams', function () {
    var s1 = Stream.fromArray([1,2,3,4]);
    var s2 = Stream.fromArray([5,6,7,8,9,10,11]);
    var sum = Stream.add(s1, s2);
    expect(sum.head()).to.equal(6);
    
    //Verify elements
    expect(sum.elementAt(0)).to.equal(6);
    expect(sum.elementAt(1)).to.equal(8);
    expect(sum.elementAt(2)).to.equal(10);
    expect(sum.elementAt(3)).to.equal(12);
    expect(sum.elementAt(4)).to.equal(9);
    expect(sum.elementAt(5)).to.equal(10);    
    expect(sum.elementAt(6)).to.equal(11);                
  });

  it('can zip many Streams', function () {
    var s1 = Stream.fromArray([1,3,5]);
    var s2 = Stream.fromArray([2,4,6,8]);
    var s3 = Stream.fromArray([5,10,15,20,25]);
    var sum = Stream.zip(s1, s2, s3);
    expect(sum.head()).to.deep.equal([1,2,5]);
    
    //Verify elements
    expect(sum.elementAt(0)).deep.equal([1,2,5]);
    expect(sum.elementAt(1)).to.deep.equal([3,4,10]);
    expect(sum.elementAt(2)).to.deep.equal([5,6,15]);
    expect(sum.elementAt(3)).to.deep.equal([8,20]);
    expect(sum.elementAt(4)).to.deep.equal([25]);
  });

  it('can append a new stream onto an existing stream', function () {
    var s1 = Stream.fromArray([1,3,5]);
    var s2 = Stream.fromArray([2,4,6]);
    var concatenated = s1.append(s2);
    expect(concatenated.length()).to.equal(6);
    expect(concatenated.toArray()).to.deep.equal([1,3,5,2,4,6]);
  });

  it('can pick a new stream from an existing stream', function () {
    var s1 = Stream.fromArray([1,3,5,7,9,11]);
    var s2 = s1.pick(3);
    expect(s2.length()).to.equal(3);
    expect(s2.toArray()).to.deep.equal([1,3,5]);
  });

  it('can find the length of a stream', function () {
    var s1 = Stream.fromArray([1,3,5]);
    var sum = s1.length();
    expect(sum).to.equal(3);
  });

  it('can reduce a stream with no initial values', function () {
    var s1 = Stream.fromArray([1,3,5]);
    var sum = s1.reduce(function (a, b) {
      return a + b;
    });
    expect(sum).to.equal(9);
    
    var product = s1.reduce(function (a, b) {
      return a * b;
    });
    expect(product).to.equal(15);
  });
  
  it('can reduce a stream with initial values', function () {
    var s1 = Stream.fromArray([1,3,5]);
    var sum = s1.reduce(function (a, b) {
      return a + b;
    }, 10);
    expect(sum).to.equal(19);
    
    var product = s1.reduce(function (a, b) {
      return a * b;
    }, 2);
    expect(product).to.equal(30);
  });

  it('can sum up a stream', function () {
    var s1 = Stream.fromArray([1,3,5]);
    var sum = s1.sum();
    expect(sum).to.equal(9);
  }); 

  it('can map over elements of a stream', function () {
    var s1 = Stream.fromArray([1,3,5]);
    var triples = s1.map(function (element) {
      return element * 3;
    });
    expect(triples.toArray()).to.deep.equal([3,9,15]);
  }); 

  it('can filter streams', function () {
    var s1 = Stream.fromArray([1,2,3,4,5]);
    var evenNumbers = s1.filter(function (element) {
      return element % 2 === 0;
    });
    expect(evenNumbers.toArray()).to.deep.equal([2,4]);
  }); 

  it('can test for membership of a stream', function () {
    var s1 = Stream.fromArray([1,2,3,4,5]);
    expect(s1.contains(2)).to.equal(true);
    expect(s1.contains(-2)).to.equal(false);
  }); 

  it('can remove elements from a stream', function () {
    var s1 = Stream.fromArray([1,2,3,4,5]);
    s1 = s1.remove(2);
    expect(s1.length()).to.equal(3);
    expect(s1.toArray()).to.deep.equal([3,4,5]);
  }); 
  
  it('can convert a finite stream to an array', function () {
    var s1 = Stream.fromArray([1,3,5]);
    var doubled = s1.map(function (element){
      return 2 * element;
    });
    expect(doubled.toArray()).to.deep.equal([2,6,10]);
  });   
  
  it('Ones return an infinite number of Ones', function () {
    var s1 = Stream.Ones();
    
    var first5Elements = s1.pick(5);
    expect(first5Elements.toArray()).to.deep.equal([1,1,1,1,1]);
    
    expect(s1.elementAt(1000)).to.equal(1);
  });   
  
  it('NaturalNumbers returns the infinite stream of Natural Numbers', function () {
    var s1 = Stream.NaturalNumbers();
    
    var first5Elements = s1.pick(5);
    expect(first5Elements.toArray()).to.deep.equal([1,2,3,4,5]);
  });  
});
