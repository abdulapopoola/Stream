# Stream-js

[![Build Status](https://travis-ci.org/abdulapopoola/Stream.svg?branch=master)](https://travis-ci.org/abdulapopoola/Stream) [![Dependencies](https://david-dm.org/abdulapopoola/Stream.svg)](https://david-dm.org/abdulapopoola/Stream.svg) [![devDependency Status](https://david-dm.org/abdulapopoola/Stream/dev-status.svg)](https://david-dm.org/abdulapopoola/Stream#info=devDependencies) 
========================

What do you think of the following code snippet?

```js
NaturalNumbers()
  .filter(function (n) { return n % 2 === 0; }) //even numbers filter
  .pick(100)
  .sum();
```
Beautifully succinct right?

# Getting started

Stream-js is a very small (**4.1kb minified**) library that brings the power of streams to your programming. It enables you to write code as shown above.

Get the [latest release](https://github.com/abdulapopoola/Stream/releases) from GitHub, via NPM or bower.

**NPM**
```bash
npm install stream-js
```
**Bower**
```bash
bower install stream-js
```

# Creating Streams

Streams can be created using the constructor function or using the helper methods: from and fromArray.

```js
var streamOf2 = new Stream(1, function () {
    return new Stream(2, null);
});

var stream = Stream.create(1,2,3);
 
var streamFromArray = Stream.fromArray([1,2,3]);
```

Streams can be finite or infinite. Infinite streams can be used to model infinite series in mathematical domains like Natural numbers etc.
# Finite Streams

```js
var s = Stream.create(1,2,3);
```

# Infinite Streams

```js
function NaturalNumbers() {
    return new Stream(
        1,
        function () {
            return Stream.add(
                Stream.NaturalNumbers(),
                Stream.Ones());
        });
}
```

# Using Streams 

```js
var evenNaturals = NaturalNumbers().filter(function(val) {
    return val % 2 === 0;
});
```

```js
var sum = Stream.create(1,2,3).reduce(function(a, b) {
    return a + b;
});
```

# [Documentation](https://github.com/abdulapopoola/Stream/blob/master/api/documentation.md)

The stream-js API is available [here](https://github.com/abdulapopoola/Stream/blob/master/api/documentation.md)

# Contributing

Got ideas to improve stream-js? Or found a bug? Please file a new [issue] (https://github.com/abdulapopoola/Stream/issues/new). 

Tweet feedback and suggestions to me directly @[abdulapopoola](https://twitter.com/abdulapopoola).

# Copyright and license

Created and copyright (c) 2015 by AbdulFattah Popoola.

Stream-js is licensed under the [MIT license](https://github.com/abdulapopoola/Stream/blob/master/LICENSE).

