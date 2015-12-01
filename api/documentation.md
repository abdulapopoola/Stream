<a name="Stream"></a>
## Stream
**Kind**: global class  

* [Stream](#Stream)
  * [new Stream(first, restGenerator)](#new_Stream_new)
  * _instance_
    * [.head()](#Stream+head) ⇒ <code>\*</code>
    * [.tail()](#Stream+tail) ⇒ <code>[Stream](#Stream)</code>
    * [.isEmpty()](#Stream+isEmpty) ⇒ <code>boolean</code>
    * [.hasEmptyTail()](#Stream+hasEmptyTail) ⇒ <code>boolean</code>
    * [.append(s)](#Stream+append) ⇒ <code>[Stream](#Stream)</code>
    * [.pick(n)](#Stream+pick) ⇒ <code>[Stream](#Stream)</code>
    * [.elementAt(index)](#Stream+elementAt) ⇒ <code>\*</code>
    * [.length()](#Stream+length) ⇒ <code>Number</code>
    * [.reduce(fn, initialValue)](#Stream+reduce) ⇒ <code>\*</code>
    * [.sum()](#Stream+sum) ⇒ <code>Number</code>
    * [.map(stream, fn)](#Stream+map) ⇒ <code>[Stream](#Stream)</code>
    * [.filter(fn)](#Stream+filter) ⇒ <code>[Stream](#Stream)</code>
    * [.contains(element)](#Stream+contains) ⇒ <code>Boolean</code>
    * [.walk(fn)](#Stream+walk)
    * [.print(n)](#Stream+print)
    * [.remove(n)](#Stream+remove) ⇒ <code>[Stream](#Stream)</code>
    * [.toArray()](#Stream+toArray) ⇒ <code>Array</code>
  * _static_
    * [.add(s1, s2)](#Stream.add) ⇒ <code>[Stream](#Stream)</code>
    * [.zip([...streams])](#Stream.zip) ⇒ <code>[Stream](#Stream)</code>
    * [.create([...values])](#Stream.create) ⇒ <code>[Stream](#Stream)</code>
    * [.fromArray(values)](#Stream.fromArray) ⇒ <code>[Stream](#Stream)</code>
    * [.fromInterval(low, high)](#Stream.fromInterval)
    * [.from(start)](#Stream.from)
    * [.upTo(stop)](#Stream.upTo)
    * [.Ones()](#Stream.Ones) ⇒ <code>[Stream](#Stream)</code>
    * [.NaturalNumbers()](#Stream.NaturalNumbers) ⇒ <code>[Stream](#Stream)</code>

<a name="new_Stream_new"></a>
### new Stream(first, restGenerator)
Creates the Stream object

**Returns**: <code>[Stream](#Stream)</code> - Returns the new Stream object instance  

| Param | Type | Description |
| --- | --- | --- |
| first | <code>\*</code> | First element of the stream |
| restGenerator | <code>function</code> | function to generate remaining parts of the stream |

<a name="Stream+head"></a>
### stream.head() ⇒ <code>\*</code>
Returns the head of a Stream

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>\*</code> - The head of the stream  
<a name="Stream+tail"></a>
### stream.tail() ⇒ <code>[Stream](#Stream)</code>
Returns the tail of a Stream

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>[Stream](#Stream)</code> - The tail of the stream  
<a name="Stream+isEmpty"></a>
### stream.isEmpty() ⇒ <code>boolean</code>
Checks if a Stream is empty

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>boolean</code> - Returns `true` if the stream is empty  
**Example**  
```js
s.isEmpty();
  // => true
```
<a name="Stream+hasEmptyTail"></a>
### stream.hasEmptyTail() ⇒ <code>boolean</code>
Checks if the tail of a Stream is empty

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>boolean</code> - Returns `true` if the tail is empty  
**Example**  
```js
s.hasEmptyTail();
  // => true
```
<a name="Stream+append"></a>
### stream.append(s) ⇒ <code>[Stream](#Stream)</code>
Appends a new stream to the end of this stream

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>[Stream](#Stream)</code> - A new stream with s appended to the current stream  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>[Stream](#Stream)</code> | The stream to append to the end of this stream |

<a name="Stream+pick"></a>
### stream.pick(n) ⇒ <code>[Stream](#Stream)</code>
Picks the first n elements out of a stream, terminates when it gets to the
  nth item or reaches the end of the stream

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>[Stream](#Stream)</code> - Returns a stream containing the picked items  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | The number of elements to be picked |

**Example**  
```js
integerStream.pick(3);
```
<a name="Stream+elementAt"></a>
### stream.elementAt(index) ⇒ <code>\*</code>
Returns the element at the nth index in a stream. Returns `undefined`
  if stream size is less than the index. Indexing is zero-based.

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>\*</code> - Value at nth index in stream  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> | The zero-based index of the stream element to be picked |

**Example**  
```js
integerStream.valueAt(3);
  // => 3
```
<a name="Stream+length"></a>
### stream.length() ⇒ <code>Number</code>
Gets the length of a stream - only defined for finite streams

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>Number</code> - length - The length of the stream  
**Example**  
```js
stream.length()
  // => 31
```
<a name="Stream+reduce"></a>
### stream.reduce(fn, initialValue) ⇒ <code>\*</code>
Reduces the stream to an accumulated value obtained over
  each stream element. Only valid for finite streams.

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>\*</code> - The accumulated output  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function to execute on each argument,   taking the accumlatedValue so far and the current stream value |
| initialValue | <code>\*</code> | The initialValue to seed the accumulator with |

**Example**  
```js
var sum = stream.reduce(function (sum, n) {
      return sum + n;
  });
```
<a name="Stream+sum"></a>
### stream.sum() ⇒ <code>Number</code>
Calculates the sum of the elements of a stream.

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>Number</code> - The sum of the elements of the stream  
**Example**  
```js
stream.sum()
  // => 31
```
<a name="Stream+map"></a>
### stream.map(stream, fn) ⇒ <code>[Stream](#Stream)</code>
Maps a function over all the elements of a stream.

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>[Stream](#Stream)</code> - Returns a new Stream with the input function applied to entries  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>[Stream](#Stream)</code> | Stream to map function to |
| fn | <code>function</code> | Function to apply to stream elements |

**Example**  
```js
Stream.map(integerStream, function (n) { return n*2; });
```
<a name="Stream+filter"></a>
### stream.filter(fn) ⇒ <code>[Stream](#Stream)</code>
Filters a stream.

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>[Stream](#Stream)</code> - Filtered stream  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Filter function |

**Example**  
```js
var evenNumbers = Stream.filter(function(val) {
      return val % 2 === 0;
  });
```
<a name="Stream+contains"></a>
### stream.contains(element) ⇒ <code>Boolean</code>
Check if the stream contains `element`. Only defined for a finite stream

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>Boolean</code> - Returns `true` if the stream contains the element  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>\*</code> | The element to be searched for |

**Example**  
```js
ones.contains(1)
  // => true
```
<a name="Stream+walk"></a>
### stream.walk(fn)
Walks a stream and applies the input function to the stream.
  Stream has to be finite for this to work.

**Kind**: instance method of <code>[Stream](#Stream)</code>  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to apply to every element of the stream |

**Example**  
```js
s.walk(function(element) {
       alert(element);
  });
```
<a name="Stream+print"></a>
### stream.print(n)
Prints out the first `n` elements of a stream, will stop if stream length is less
  than `n`

**Kind**: instance method of <code>[Stream](#Stream)</code>  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | Number of elements to print |

**Example**  
```js
s.print(5);
```
<a name="Stream+remove"></a>
### stream.remove(n) ⇒ <code>[Stream](#Stream)</code>
Removes the first `n` elements of a stream. Returns an empty stream
  if `n` is greater than the stream's length.

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>[Stream](#Stream)</code> - The new stream with elements starting an
  index n + 1 or an empty stream if n > stream.length  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | The number of elements to be removed |

**Example**  
```js
integerStream.remove(3);
  // => [4,5,6]
```
<a name="Stream+toArray"></a>
### stream.toArray() ⇒ <code>Array</code>
Constructs an array containing the elements of a finite stream

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Returns**: <code>Array</code> - A array containing the elements of the stream  
<a name="Stream.add"></a>
### Stream.add(s1, s2) ⇒ <code>[Stream](#Stream)</code>
Adds two streams

**Kind**: static method of <code>[Stream](#Stream)</code>  
**Returns**: <code>[Stream](#Stream)</code> - Returns a new Stream that is the sum of the Augend and Addend streams  

| Param | Type | Description |
| --- | --- | --- |
| s1 | <code>[Stream](#Stream)</code> | Augend stream |
| s2 | <code>[Stream](#Stream)</code> | Addend stream |

**Example**  
```js
Stream.add(s1 s2);
```
<a name="Stream.zip"></a>
### Stream.zip([...streams]) ⇒ <code>[Stream](#Stream)</code>
Zips all elements of the input streams together. Works like Python's
  zip but returns arrays of arrays instead of a list of tuples
  The nth entry of a zipped stream is an an array consisting of
  all the nth elements of its constituent streams.

**Kind**: static method of <code>[Stream](#Stream)</code>  
**Returns**: <code>[Stream](#Stream)</code> - A new stream containing the zipped elements  

| Param | Type | Description |
| --- | --- | --- |
| [...streams] | <code>[Stream](#Stream)</code> | streams to be zipped (picked off arguments object) |

**Example**  
```js
var zipped = Stream.zip(s1, s2, s3);
```
<a name="Stream.create"></a>
### Stream.create([...values]) ⇒ <code>[Stream](#Stream)</code>
Creates an input stream using a list of arguments

**Kind**: static method of <code>[Stream](#Stream)</code>  
**Returns**: <code>[Stream](#Stream)</code> - A new stream containing the elements  

| Param | Type | Description |
| --- | --- | --- |
| [...values] | <code>\*</code> | values to be used in the stream |

**Example**  
```js
var s = Stream.create(1,2,3,4);
```
<a name="Stream.fromArray"></a>
### Stream.fromArray(values) ⇒ <code>[Stream](#Stream)</code>
Creates an input stream from an array

**Kind**: static method of <code>[Stream](#Stream)</code>  
**Returns**: <code>[Stream](#Stream)</code> - A new stream containing the array elements  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | array to use in creating the stream |

**Example**  
```js
var s = Stream.fromArray([1,2,3,4]);
```
<a name="Stream.fromInterval"></a>
### Stream.fromInterval(low, high)
Constructs a stream made up of consecutive numbers in the
 range [low high]

**Kind**: static method of <code>[Stream](#Stream)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| low | <code>\*</code> | <code>0</code> | The lower limit value of the stream |
| high | <code>\*</code> |  | The upper limit value of the stream  returns {Stream} A finite stream with elements in the range [low, high] |

<a name="Stream.from"></a>
### Stream.from(start)
Constructs an infinite stream of consecutive numbers starting
 from integer `start`

**Kind**: static method of <code>[Stream](#Stream)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| start | <code>Number</code> | <code>0</code> | The integer to start the stream from  returns {Stream} A infinite stream with elements starting from `start` |

<a name="Stream.upTo"></a>
### Stream.upTo(stop)
Constructs a stream made up of consecutive numbers up to `stop`

**Kind**: static method of <code>[Stream](#Stream)</code>  

| Param | Type | Description |
| --- | --- | --- |
| stop | <code>Number</code> | The maximum and last value of the stream  returns {Stream} A finite stream with elements in the range [0, stop] |

<a name="Stream.Ones"></a>
### Stream.Ones() ⇒ <code>[Stream](#Stream)</code>
Returns an infinite stream of ones

**Kind**: static method of <code>[Stream](#Stream)</code>  
**Returns**: <code>[Stream](#Stream)</code> - An infinite stream of Ones  
**Example**  
```js
var ones = Stream.Ones();
```
<a name="Stream.NaturalNumbers"></a>
### Stream.NaturalNumbers() ⇒ <code>[Stream](#Stream)</code>
Returns the stream of Natural numbers

**Kind**: static method of <code>[Stream](#Stream)</code>  
**Returns**: <code>[Stream](#Stream)</code> - The infinite stream of natural numbers  
**Example**  
```js
var naturals = Stream.NaturalNumbers();
```
