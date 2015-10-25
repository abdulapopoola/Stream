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
*   @returns {boolean} Returns `true` if the stream is empty
*   @example
*
*   s.isEmpty();
*   // => true
**/
function isEmpty(stream) {
    return this.streamFirst == null;
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
*   Filters unwanted elements out of a stream   
*
*   @param {Function} fn - Filter function
*   @returns {Stream} Filtered stream
*   @example
*
*   var evenNumbers = Stream.filter(function(val) {
*       return val % 2 === 0;  
*   });
**/
function filter(fn) {
    if(this.isEmpty()) {
        return this;
    }
    var first = this.head();
    var rest = this.tail();
    if (fn(first)){
        return new Stream(
            first,
            function () { 
                return rest.filter(fn);
            });
    }
    return rest.filter(fn);
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
*   Creates an input stream using a list of arguments
*
*   @static
*   @param {...*} [values] - values to be used in the stream
*   @returns {Stream} A new stream containing the elements
*   @example
*
*   var s = Stream.create(1,2,3,4);
**/
function create( /* arguments */) {
    if(arguments.length === 0) {
        return new Stream(null, null);
    }
    
    var tailArgs = [].slice.call(arguments,1);
    return new Stream(
        arguments[0],
        function () {
            return Stream.create.apply(null, tailArgs);
        }
    );
}

/**
*   Creates an input stream from an array
*
*   @static
*   @param {Array} [values] - array to use in creating the stream
*   @returns {Stream} A new stream containing the array elements
*   @example
*
*   var s = Stream.fromArray([1,2,3,4]);
**/
function fromArray(values) {
    return Stream.create(null, values);
}

/**
*   Walks a stream and applies the input function to the stream. 
*   Stream has to be finite for this to work.
*
*   @param {Function} fn - The function to apply to every element of the stream
*   @example
*
*   s.walk(function(element) {
*        alert(element);
*   });
**/
function walk(fn) {
    var s = this;
    while (!s.isEmpty()){
        fn(s.head());
        s = s.tail();
    }
}

/**
*   Prints out the first n elements of a stream, will stop if stream length is less
*   than n 
*
*   @param {Number} n - Number of elements to print
*   @example
*
*   s.print(5);
**/
function print(n) {
    var streamToPrint = this.pick(n);
    
    streamToPrint.walk(function (element){
        console.log(element);
    });
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
*   @returns {Stream} Returns a stream containing the picked items
*   @example
*
*   integerStream.pick(3);
**/
function pick(n) {
    if (!n || Stream.isEmpty(this)) {
        return new Stream(null, null);
    } 
    
    var that = this;
    return new Stream(
        this.head(),
        function () {
            return that.tail().pick(n - 1);
        }
    );
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

/**
*   Calculates the sum of the elements of a stream
*
*   @returns {Number} The sum of the elements of the stream
*   @example
*
*   stream.sum()
*   // => 31
**/
function sum() {
    return this.reduce(function (previousValue, currentValue){
        return previousValue + currentValue;
    }, 0);
}

/**
*   Check if the stream contains an element. Only defined for a finite stream   
*
*   @param {*} index - The index of the stream element to be picked
*   @returns {Boolean} Returns `true` if the stream contains the element
*   @example
*
*   ones.contains(1)
*   // => true
**/
function contains(element) {
    var s = this;
    while(!Stream.isEmpty(s)) {
        if(s.streamFirst() === element){
            return true;
        }
        s = s.streamRest();
    }
    
    return false;
}

/**
*   Removes the first n elements of a stream.
*
*   @param {Number} n - The number of elements to be removed
*   @returns {Stream} The new stream with elements starting an
*   index n + 1 or an empty stream if n > stream.length
*   @example
*
*   integerStream.remove(3);
*   // => [4,5,6]
**/
function remove(n) {
    var s = this;
    while(n > 0) {
        if (Stream.isEmpty(s)) {
            return new Stream(null, null);
        }
        s = s.streamRest();
    }
    
    return new Stream(
        s.streamFirst(),
        function () {
            return s.streamRest()
        }
    );
}

/**
*   Returns the 'head' - first value - of a stream
*
*   @returns {*} The head of the stream
**/
function head() {
    if(this.isEmpty()){
        fail('Stream is empty!');
    }
    return this.streamFirst;
}


/**
 *  Constructs a stream made up of consecutive numbers in the
 *  range [low high]
 *  
 *  @static
 *  @param {*} [low=0] - The lower limit value of the stream
 *  @param {*} high - The upper limit value of the stream
 *  
 *  returns {Stream} A finite stream with elements in the range [low, high]
 */
function fromInterval(low, high){
    if(!low){
        low = 0;
    }
    if (!high || low === high){
        return new Stream(low, null);
    }
    
    return new Stream(
        low,
        Stream.fromInterval(low + 1, high)
    );
}

/**
 *  Constructs an infinite stream of consecutive numbers starting 
 *  from integer `start`
 *  
 *  @static
 *  @param {Number} [start=0] - The integer to start the stream from
 *  
 *  returns {Stream} A infinite stream with elements starting from `start`
 */
function from(start) {
    if(!start){
        start = 0;
    }
    
    return new Stream(
        start,
        Stream.from(start + 1)
    );
}

/**
 *  Constructs a stream made up of consecutive numbers up to `stop`
 *  
 *  @static
 *  @param {Number} [stop] - The maximum and last value of the stream
 *  
 *  returns {Stream} A finite stream with elements in the range [0, stop]
 */
function upTo(stop){
    return Stream.fromInterval(0, stop);
}

/**
 *  Constructs an array containing the elements of a finite stream
 *  
 *  returns {Array} A array containing the elements of the stream
 */
function toArray(){
    var items = [];
    
    var storer = function (val) {
        items.push(val);
    }
    
    this.walk(storer);
    return items;
}

/**
*   Returns the tail of a stream
*
*   @returns {Stream} The tail of the stream
**/
function tail() {
    if(this.isEmpty()){
        fail('Stream is empty!');
    }
    
    return this.streamRest();
}

/**
 *  Appends a new stream to the end of a current stream
 * 
  *  @param {Stream} [s] - The stream to append to the end of this stream
 */
function append(s) {
    if(this.isEmpty()){
        return s;
    }
    
    var that = this;
    return new Stream(
        this.head(),
        function () {
            return that.tail().append(s); 
        }
    );
}

//Static methods
Stream.map = map;
Stream.Ones = Ones;
Stream.add = add;
Stream.zip = zip;
Stream.create = create;
Stream.fromArray = fromArray;
Stream.fromInterval = fromInterval;
Stream.from = from;
Stream.upTo = upTo;

//Instance methods
Stream.prototype.head = head;
Stream.prototype.tail = tail;
Stream.prototype.isEmpty = isEmpty;
Stream.prototype.append = append;
Stream.prototype.pick = pick;
Stream.prototype.valueAt = valueAt;
Stream.prototype.length = length;
Stream.prototype.reduce = reduce;
Stream.prototype.sum = sum;
Stream.prototype.filter = filter;
Stream.prototype.contains = contains;
Stream.prototype.print = print;
Stream.prototype.remove = remove;
Stream.prototype.toArray = toArray;