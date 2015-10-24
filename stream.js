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
function Stream(first, restGenerator) {
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
    if (Stream.isEmpty(stream) || fn == null)
        fail('Cannot map over empty stream or falsy function');

    return new Stream(
        fn(stream.streamFirst),
        function () {
            return Stream.map(stream.streamRest(), fn);
        }
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
    if (Stream.isEmpty(s1) || Stream.isEmpty(s2))
        fail('Cannot add empty streams');

    return new Stream(
        s1.streamFirst + s2.streamFirst,
        function () {
            return s1.streamRest() + s2.streamRest();
        }
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
*   Zips all input streams together. Works like Python's
*   zip but returns arrays of arrays instead of a list of tuples
*   The nth entry of a zipped stream is an an array consisting of
*   all the nth elements of its constituent streams.
*
*   @static
*   @param {...Stream} [streams] - streams to be zipped (picked off arguments object)
*   @returns {Stream} A new stream containing the zipped elements
*   @example
*
*   var zipped = Stream.Zip(s1, s2, s3);
**/
function zip() {
    var args = [].slice(arguments);
    
    var zippedFirsts = [];
    for(var i=0, len = args.length; i < len; i++){
        var s = args[i];
        zippedFirsts.push(s.streamFirst());
        s = s.streamRest(); //overwrite the stream so it stores only its rest
        //check for mutation bugs.
    }

    return new Stream(
        zippedFirsts,
        function () {
            return Stream.zip(args);
        }
    );
}

/**
*   Reduces the stream to a value which is the accumulated output obtained over
*   each stream element. Only valid for finite streams
*
*   @param {Function} fn - Function to execute on each argument, 
*   taking the accumlatedValue so far and the current stream value
*   @param {*} initialValue - The initialValue to seed the accumulator with
*   @returns {*} The accumulated output
*   @example
*
*   var sum = stream.reduce(function (sum, n) {
*       return sum + n;
*   });
**/
function reduce(fn, initialValue) {
    var s = this;
    if(Stream.isEmpty(s)) {
        return initialValue;
    }
    
    if(initialValue == null){
        initialValue = s.streamFirst();
        s = s.streamRest();
    }

    return this.streamRest().reduce(fn, fn(initialValue, s.streamFirst()));
}

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
    if (!n || Stream.isEmpty(this))
        return [];

    var items = [];
    var count = 0;
    var s = this;

    while (count < n && !Stream.isEmpty(s)) {
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

/**
*   Gets the length of a stream - only defined for finite streams
*
*   @returns {Number} length - The length of the stream
*   @example
*
*   stream.length()
*   // => 31
**/
function length() {
    var len = 0;
    var s = this;
    
    while(!Stream.isEmpty(s)) {
        len++;
        s = s.streamRest();        
    }
    
    return len;
}

//Static methods
Stream.isEmpty = isEmpty;
Stream.map = map;
Stream.Ones = Ones;
Stream.add = add;
Stream.zip = zip;

//Instance methods
Stream.prototype.pick = pick;
Stream.prototype.valueAt = valueAt;
Stream.prototype.length = length;
Stream.prototype.reduce = reduce;