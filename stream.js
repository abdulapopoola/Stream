function fail(errMessage) {
    throw new Error(errMessage);
}

/* Add documentation */
function Stream (first, restGenerator) {
    this.streamFirst = first;
    this.streamRest = restGenerator || function () {
        return new Stream();
    };
}

Stream.prototype = {
    
};