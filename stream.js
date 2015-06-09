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
        return new Stream();
    };
}

Stream.prototype = {
    
};