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
*   Returns the head of a Stream
*
*   @returns {*} The head of the stream
**/
function head() {
    if (this.isEmpty()) {
        fail('Stream is empty!');
    }

    return this.streamFirst;
}

/**
*   Returns the tail of a Stream
*
*   @returns {Stream} The tail of the stream
**/
function tail() {
    if (this.isEmpty()) {
        fail('Stream is empty!');
    }

    return this.streamRest();
}

/**
*   Checks if a Stream is empty   
*
*   @returns {boolean} Returns `true` if the stream is empty
*   @example
*
*   s.isEmpty();
*   // => true
**/
function isEmpty() {
    return this.streamFirst == null;
}

/**
*   Checks if the tail of a Stream is empty   
*
*   @returns {boolean} Returns `true` if the tail is empty
*   @example
*
*   s.hasEmptyTail();
*   // => true
**/
function hasEmptyTail() {
    if (this.streamRest == null) {
        return true;
    }
    
    //Slower, invoke tail function and see if it throws an Error
    try {
        this.tail();
    } catch (e) {
        return true;
    }

    return false;
}

/**
 *  Appends a new stream to the end of this stream
 * 
 *  @param {Stream} s - The stream to append to the end of this stream
 *  @returns {Stream} A new stream with s appended to the current stream
 */
function append(s) {
    if (this.isEmpty()) {
        return s;
    }

    var that = this;
    return new Stream(
        this.head(),
        function () {
            return that.tail().append(s);
        });
}

/**
*   Picks the first n elements out of a stream, terminates when it gets to the
*   nth item or reaches the end of the stream
*
*   @param {Number} n - The number of elements to be picked
*   @returns {Stream} Returns a stream containing the picked items
*   @example
*
*   integerStream.pick(3);
**/
function pick(n) {
    if (!n || this.isEmpty()) {
        return new Stream(null, null);
    }

    var that = this;
    return new Stream(
        this.head(),
        function () {
            return that.tail().pick(n - 1);
        });
}

/**
*   Returns the element at the nth index in a stream. Returns `undefined` 
*   if stream size is less than the index. Indexing is zero-based.
*
*   @param {Number} index - The zero-based index of the stream element to be picked
*   @returns {*} Value at nth index in stream
*   @example
*
*   integerStream.valueAt(3);
*   // => 3
**/
function elementAt(index) {
    if (index == null) {
        return;
    }

    var s = this;
    while (index > 0) {
        if (s.isEmpty() || s.hasEmptyTail()) {
            return;
        }
        s = s.tail();
        index--;
    }

    return s.head();
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

    while (!s.isEmpty()) {
        len++;
        s = s.tail();
    }

    return len;
}

/**
*   Reduces the stream to an accumulated value obtained over
*   each stream element. Only valid for finite streams.
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
    if (s.isEmpty()) {
        return initialValue;
    }

    if (initialValue == null) {
        initialValue = s.head();
        s = s.tail();
    }

    return s.tail().reduce(fn, fn(initialValue, s.head()));
}

/**
*   Calculates the sum of the elements of a stream.
*
*   @returns {Number} The sum of the elements of the stream
*   @example
*
*   stream.sum()
*   // => 31
**/
function sum() {
    return this.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    }, 0);
}

/**
*   Maps a function over all the elements of a stream.   
*
*   @static
*   @param {Stream} stream - Stream to map function to
*   @param {Function} fn - Function to apply to stream elements
*   @returns {Stream} Returns a new Stream with the input function applied to entries
*   @example
*
*   Stream.map(integerStream, function (n) { return n*2; });
**/
function map(fn) {
    if (fn == null) {
        fail('Mapping function has to be defined');
    }

    var that = this;
    return new Stream(
        fn(this.head()),
        function () {
            return that.tail().map(fn);
        });
}

/**
*   Filters a stream. 
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
    if (this.isEmpty()) {
        return this;
    }
    var first = this.head();
    var rest = this.tail();
    if (fn(first)) {
        return new Stream(
            first,
            function () {
                return rest.filter(fn);
            });
    }
    return rest.filter(fn);
}

/**
*   Check if the stream contains `element`. Only defined for a finite stream   
*
*   @param {*} element - The element to be searched for
*   @returns {Boolean} Returns `true` if the stream contains the element
*   @example
*
*   ones.contains(1)
*   // => true
**/
function contains(element) {
    var s = this;
    while (!s.isEmpty()) {
        if (s.head() === element) {
            return true;
        }
        s = s.tail();
    }

    return false;
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
    while (!s.isEmpty()) {
        fn(s.head());
        if (s.hasEmptyTail()) {
            //all done, head processed and nothing left
            return;
        }
        s = s.tail();
    }
}

/**
*   Prints out the first `n` elements of a stream, will stop if stream length is less
*   than `n` 
*
*   @param {Number} n - Number of elements to print
*   @example
*
*   s.print(5);
**/
function print(n) {
    var streamToPrint = this.pick(n);

    streamToPrint.walk(function (element) {
        console.log(element);
    });
}

/**
*   Removes the first `n` elements of a stream. Returns an empty stream
*   if `n` is greater than the stream's length.
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
    while (n > 0) {
        if (s.isEmpty()) {
            return new Stream(null, null);
        }
        s = s.tail();
        n--;
    }

    return new Stream(
        s.head(),
        function () {
            return s.tail();
        });
}

/**
 *  Constructs an array containing the elements of a finite stream
 *  
 *  @returns {Array} A array containing the elements of the stream
 */
function toArray() {
    var items = [];

    var storer = function (val) {
        items.push(val);
    };

    this.walk(storer);
    return items;
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
	if(s1.isEmpty()) {
		return s2;	
	}

	if(s2.isEmpty()) {
		return s1;	
	}

    return new Stream(
 		s1.head() + s2.head(),
		function () {
			return Stream.add(s1.tail(), s2.tail());
		});
}

/**
*   Zips all elements of the input streams together. Works like Python's
*   zip but returns arrays of arrays instead of a list of tuples
*   The nth entry of a zipped stream is an an array consisting of
*   all the nth elements of its constituent streams.
*
*   @static
*   @param {...Stream} [streams] - streams to be zipped (picked off arguments object)
*   @returns {Stream} A new stream containing the zipped elements
*   @example
*
*   var zipped = Stream.zip(s1, s2, s3);
**/
function zip(/* arguments */) {
    var args = [].slice.call(arguments);

    var zippedFirsts = [];
    for (var i = 0, len = args.length; i < len; i++) {
        var s = args[i];
        if (s.isEmpty()) {
            continue;
        }
        zippedFirsts.push(s.head());
    }

    return new Stream(
        zippedFirsts,
        function () {
            var tails = [];
            for (var i = 0, len = args.length; i < len; i++) {
                var tmp = args[i];
                if (!tmp.hasEmptyTail()) {
                    tails.push(tmp.tail());
                }
            }

            return Stream.zip.apply(null, tails);
        });
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
    if (arguments.length === 0) {
        return new Stream(null, null);
    }

    var tailArgs = [].slice.call(arguments, 1);
    return new Stream(
        arguments[0],
        function () {
            return Stream.create.apply(null, tailArgs);
        });
}

/**
*   Creates an input stream from an array
*
*   @static
*   @param {Array} values - array to use in creating the stream
*   @returns {Stream} A new stream containing the array elements
*   @example
*
*   var s = Stream.fromArray([1,2,3,4]);
**/
function fromArray(values) {
    return Stream.create.apply(null, values);
}

/**
 *  Constructs a stream made up of consecutive numbers in the
 *  range [low high]
 *  
 *  @static
 *  @param {*} low=0 - The lower limit value of the stream
 *  @param {*} high - The upper limit value of the stream
 *  
 *  returns {Stream} A finite stream with elements in the range [low, high]
 */
function fromInterval(low, high) {
    if (!low) {
        low = 0;
    }
    if (!high || low === high) {
        return new Stream(low, null);
    }

    return new Stream(
        low,
        function () {
            return Stream.fromInterval(low + 1, high);
        });
}

/**
 *  Constructs an infinite stream of consecutive numbers starting 
 *  from integer `start`
 *  
 *  @static
 *  @param {Number} start=0 - The integer to start the stream from
 *  
 *  returns {Stream} A infinite stream with elements starting from `start`
 */
function from(start) {
    if (!start) {
        start = 0;
    }

    return new Stream(
        start,
        function () {
            return Stream.from(start + 1);
        });
}

/**
 *  Constructs a stream made up of consecutive numbers up to `stop`
 *  
 *  @static
 *  @param {Number} stop - The maximum and last value of the stream
 *  
 *  returns {Stream} A finite stream with elements in the range [0, stop]
 */
function upTo(stop) {
    return Stream.fromInterval(0, stop);
}

/**
*   Returns an infinite stream of ones   
*
*   @static
*   @returns {Stream} An infinite stream of Ones
*   @example
*
*   var ones = Stream.Ones();
**/
function Ones() {
    return new Stream(1, Ones);
}

/**
*   Returns the stream of Natural numbers  
*
*   @static
*   @returns {Stream} The infinite stream of natural numbers
*   @example
*
*   var naturals = Stream.NaturalNumbers();
**/
function NaturalNumbers() {
    return new Stream(
        1,
        function () {
            return Stream.add(
                Stream.NaturalNumbers(),
                Stream.Ones());
        });
}

//Instance methods
Stream.prototype.head = head;
Stream.prototype.tail = tail;
Stream.prototype.isEmpty = isEmpty;
Stream.prototype.hasEmptyTail = hasEmptyTail;
Stream.prototype.append = append;
Stream.prototype.pick = pick;
Stream.prototype.elementAt = elementAt;
Stream.prototype.length = length;
Stream.prototype.reduce = reduce;
Stream.prototype.sum = sum;
Stream.prototype.map = map;
Stream.prototype.filter = filter;
Stream.prototype.contains = contains;
Stream.prototype.walk = walk;
Stream.prototype.print = print;
Stream.prototype.remove = remove;
Stream.prototype.toArray = toArray;

//Static methods
Stream.create = create;
Stream.add = add;
Stream.zip = zip;
Stream.fromArray = fromArray;
Stream.fromInterval = fromInterval;
Stream.from = from;
Stream.upTo = upTo;
Stream.Ones = Ones;
Stream.NaturalNumbers = NaturalNumbers;
