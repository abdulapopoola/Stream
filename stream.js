function fail(errMessage) {
    throw new Error(errMessage);
}

/**
*   Creates the Stream object
*   @constructor
*   @name Stream
*   @param {*} first - First element of the stream
*   @param {Function} restGenerator - function to generate remaining parts of the stream
*   @returns {Object} Returns the new Stream object instance
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
*   @returns {boolean} Returns `true` if the stream is empty
*   @example
*
*   emptyStream.isEmpty();
*   // => true
**/
function isEmpty(stream) {
    return stream.streamFirst == null;
}

/**
*   Picks the first n elements out of a stream, terminates when it gets to the nth item or reaches the end of the stream
*
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

function ones() {
    return new Stream(1, ones);
};

function ones() {
    return new Stream(1, ones);
};

Stream.isEmpty = isEmpty;
Stream.prototype.pick = pick;

// Examples
Stream.ones = ones;
// ones = Stream.ones()
// ones.pick(3) -> [1,1,1]