function fail(errMessage) {
    throw new Error(errMessage);
}

/**
*   Creates the Stream object
*   @constructor
*   @name Stream
*   @param {*} first - First element of the stream
*   @param {Function} restGenerator - function to generate remaining parts of the stream
*   @returns {Stream} Returns the new Stream object instance
**/
function Stream (first, restGenerator) {
    this.streamFirst = first;
    this.streamRest = restGenerator || function () {
        return new Stream(null, null);
    };
}

/**
*   Checks if a stream is empty   
*
*   @static
*   @param {Stream} stream - stream to check for emptiness
*   @returns {boolean} Returns `true` if the stream is empty
*   @example
*
*   Stream.isEmpty(emptyStream);
*   // => true
**/
function isEmpty(stream) {
    return stream.streamFirst == null;
}

/**
*   Maps a function to all the elements of a stream   
*
*   @static
*   @param {Stream} stream - Stream to map function to
*   @param {Function} fn - Function to apply to stream elements
*   @returns {Stream} Returns a new Stream with the input function applied to entries
*   @example
*
*   Stream.map(integerStream, function (n) { return n*2; });
*   // => true
**/
function map(stream, fn) {
    if(Stream.isEmpty(stream) || fn == null)
        fail('Cannot map over empty stream or falsy function');
        
    return new Stream(
        fn(stream.streamFirst), 
        Stream.map(stream.streamRest, fn)
    );
}

/**
*   Adds two streams   
*
*   @static
*   @param {Stream} s1 - Augend stream
*   @param {Stream} s2 - Addend stream
*   @returns {Stream} Returns a new Stream that is the sum of the Augend and Addend streams
*   @example
*
*   Stream.add(s1 s2);
**/
function add(s1, s2) {
    if(Stream.isEmpty(s1) || Stream.isEmpty(s2))
        fail('Cannot add empty streams');
        
    var generator = function () {
        return s1.streamRest() + s2.streamRest();    
    };
    
    return new Stream(
        s1.streamFirst + s2.streamFirst,
        generator
    );
}

/**
*   Returns an infinite stream of ones   
*
*   @static
*   @returns {Stream} Value at nth index in stream
*   @example
*
*   var ones = Stream.Ones();
**/
function Ones() {
    return new Stream(1, Ones);
};

/**
*   Picks the first n elements out of a stream, terminates when it gets to the nth item or reaches the end of the stream
*
*   @param {Number} n - The number of elements to be picked
*   @returns {Array} Returns array of all successfully picked items
*   @example
*
*   integerStream.pick(3);
*   // => [1,2,3]
**/
function pick(n) {
    if(!n || Stream.isEmpty(this))
        return [];
        
    var items = [];
    var count = 0;
    var s = this;
    
    while(count < n && !Stream.isEmpty(s)) {
        count++;
        items.push(s.streamFirst);
        s = s.streamRest(); 
    }
    
    return items;
}

/**
*   Picks the element at the nth index in a stream. Returns undefined 
*   if stream size is less than the index
*
*   @param {Number} index - The index of the stream element to be picked
*   @returns {*} Value at nth index in stream
*   @example
*
*   integerStream.valueAt(3);
*   // => 3
**/
function valueAt(index) {
    var items = this.pick(index);
    
    return items[items.length - 1];
}

//Static methods
Stream.isEmpty = isEmpty;
Stream.map = map;
Stream.Ones = Ones;
Stream.add = add;

//Instance methods
Stream.prototype.pick = pick;
Stream.prototype.valueAt = valueAt;