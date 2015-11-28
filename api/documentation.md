## Classes
<dl>
<dt><a href="#Stream">Stream</a></dt>
<dd></dd>
</dl>
## Functions
<dl>
<dt><a href="#head">head()</a> ⇒ <code>*</code></dt>
<dd><p>Returns the head of a Stream</p>
</dd>
<dt><a href="#tail">tail()</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Returns the tail of a Stream</p>
</dd>
<dt><a href="#isEmpty">isEmpty()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a Stream is empty</p>
</dd>
<dt><a href="#hasEmptyTail">hasEmptyTail()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the tail of a Stream is empty</p>
</dd>
<dt><a href="#append">append(s)</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Appends a new stream to the end of this stream</p>
</dd>
<dt><a href="#pick">pick(n)</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Picks the first n elements out of a stream, terminates when it gets to the
  nth item or reaches the end of the stream</p>
</dd>
<dt><a href="#elementAt">elementAt(index)</a> ⇒ <code>*</code></dt>
<dd><p>Returns the element at the nth index in a stream. Returns <code>undefined</code> 
  if stream size is less than the index. Indexing is zero-based.</p>
</dd>
<dt><a href="#length">length()</a> ⇒ <code>Number</code></dt>
<dd><p>Gets the length of a stream - only defined for finite streams</p>
</dd>
<dt><a href="#reduce">reduce(fn, initialValue)</a> ⇒ <code>*</code></dt>
<dd><p>Reduces the stream to an accumulated value obtained over
  each stream element. Only valid for finite streams.</p>
</dd>
<dt><a href="#sum">sum()</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the sum of the elements of a stream.</p>
</dd>
<dt><a href="#map">map(stream, fn)</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Maps a function over all the elements of a stream.</p>
</dd>
<dt><a href="#filter">filter(fn)</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Filters a stream.</p>
</dd>
<dt><a href="#contains">contains(element)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if the stream contains <code>element</code>. Only defined for a finite stream</p>
</dd>
<dt><a href="#walk">walk(fn)</a></dt>
<dd><p>Walks a stream and applies the input function to the stream. 
  Stream has to be finite for this to work.</p>
</dd>
<dt><a href="#print">print(n)</a></dt>
<dd><p>Prints out the first <code>n</code> elements of a stream, will stop if stream length is less
  than <code>n</code></p>
</dd>
<dt><a href="#remove">remove(n)</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Removes the first <code>n</code> elements of a stream. Returns an empty stream
  if <code>n</code> is greater than the stream&#39;s length.</p>
</dd>
<dt><a href="#toArray">toArray()</a> ⇒ <code>Array</code></dt>
<dd><p>Constructs an array containing the elements of a finite stream</p>
</dd>
<dt><a href="#add">add(s1, s2)</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Adds two streams</p>
</dd>
<dt><a href="#zip">zip([...streams])</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Zips all elements of the input streams together. Works like Python&#39;s
  zip but returns arrays of arrays instead of a list of tuples
  The nth entry of a zipped stream is an an array consisting of
  all the nth elements of its constituent streams.</p>
</dd>
<dt><a href="#create">create([...values])</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Creates an input stream using a list of arguments</p>
</dd>
<dt><a href="#fromArray">fromArray(values)</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Creates an input stream from an array</p>
</dd>
<dt><a href="#fromInterval">fromInterval(low, high)</a></dt>
<dd><p>Constructs a stream made up of consecutive numbers in the
 range [low high]</p>
</dd>
<dt><a href="#from">from(start)</a></dt>
<dd><p>Constructs an infinite stream of consecutive numbers starting 
 from integer <code>start</code></p>
</dd>
<dt><a href="#upTo">upTo(stop)</a></dt>
<dd><p>Constructs a stream made up of consecutive numbers up to <code>stop</code></p>
</dd>
<dt><a href="#Ones">Ones()</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Returns an infinite stream of ones</p>
</dd>
<dt><a href="#NaturalNumbers">NaturalNumbers()</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Returns the stream of Natural numbers</p>
</dd>
</dl>
<a name="Stream"></a>
## Stream
**Kind**: global class  
<a name="new_Stream_new"></a>
### new Stream(first, restGenerator)
Creates the Stream object

**Returns**: <code>[Stream](#Stream)</code> - Returns the new Stream object instance  

| Param | Type | Description |
| --- | --- | --- |
| first | <code>\*</code> | First element of the stream |
| restGenerator | <code>function</code> | function to generate remaining parts of the stream |

<a name="head"></a>
## head() ⇒ <code>\*</code>
Returns the head of a Stream

**Kind**: global function  
**Returns**: <code>\*</code> - The head of the stream  
<a name="tail"></a>
## tail() ⇒ <code>[Stream](#Stream)</code>
Returns the tail of a Stream

**Kind**: global function  
**Returns**: <code>[Stream](#Stream)</code> - The tail of the stream  
<a name="isEmpty"></a>
## isEmpty() ⇒ <code>boolean</code>
Checks if a Stream is empty

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns `true` if the stream is empty  
**Example**  
```js
s.isEmpty();
  // => true
```
<a name="hasEmptyTail"></a>
## hasEmptyTail() ⇒ <code>boolean</code>
Checks if the tail of a Stream is empty

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns `true` if the tail is empty  
**Example**  
```js
s.hasEmptyTail();
  // => true
```
<a name="append"></a>
## append(s) ⇒ <code>[Stream](#Stream)</code>
Appends a new stream to the end of this stream

**Kind**: global function  
**Returns**: <code>[Stream](#Stream)</code> - A new stream with s appended to the current stream  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>[Stream](#Stream)</code> | The stream to append to the end of this stream |

<a name="pick"></a>
## pick(n) ⇒ <code>[Stream](#Stream)</code>
Picks the first n elements out of a stream, terminates when it gets to the
  nth item or reaches the end of the stream

**Kind**: global function  
**Returns**: <code>[Stream](#Stream)</code> - Returns a stream containing the picked items  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | The number of elements to be picked |

**Example**  
```js
integerStream.pick(3);
```
<a name="elementAt"></a>
## elementAt(index) ⇒ <code>\*</code>
Returns the element at the nth index in a stream. Returns `undefined` 
  if stream size is less than the index. Indexing is zero-based.

**Kind**: global function  
**Returns**: <code>\*</code> - Value at nth index in stream  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> | The zero-based index of the stream element to be picked |

**Example**  
```js
integerStream.valueAt(3);
  // => 3
```
<a name="length"></a>
## length() ⇒ <code>Number</code>
Gets the length of a stream - only defined for finite streams

**Kind**: global function  
**Returns**: <code>Number</code> - length - The length of the stream  
**Example**  
```js
stream.length()
  // => 31
```
<a name="reduce"></a>
## reduce(fn, initialValue) ⇒ <code>\*</code>
Reduces the stream to an accumulated value obtained over
  each stream element. Only valid for finite streams.

**Kind**: global function  
**Returns**: <code>\*</code> - The accumulated output  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function to execute on each argument,    taking the accumlatedValue so far and the current stream value |
| initialValue | <code>\*</code> | The initialValue to seed the accumulator with |

**Example**  
```js
var sum = stream.reduce(function (sum, n) {
      return sum + n;
  });
```
<a name="sum"></a>
## sum() ⇒ <code>Number</code>
Calculates the sum of the elements of a stream.

**Kind**: global function  
**Returns**: <code>Number</code> - The sum of the elements of the stream  
**Example**  
```js
stream.sum()
  // => 31
```
<a name="map"></a>
## map(stream, fn) ⇒ <code>[Stream](#Stream)</code>
Maps a function over all the elements of a stream.

**Kind**: global function  
**Returns**: <code>[Stream](#Stream)</code> - Returns a new Stream with the input function applied to entries  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>[Stream](#Stream)</code> | Stream to map function to |
| fn | <code>function</code> | Function to apply to stream elements |

**Example**  
```js
Stream.map(integerStream, function (n) { return n*2; });
```
<a name="filter"></a>
## filter(fn) ⇒ <code>[Stream](#Stream)</code>
Filters a stream.

**Kind**: global function  
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
<a name="contains"></a>
## contains(element) ⇒ <code>Boolean</code>
Check if the stream contains `element`. Only defined for a finite stream

**Kind**: global function  
**Returns**: <code>Boolean</code> - Returns `true` if the stream contains the element  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>\*</code> | The element to be searched for |

**Example**  
```js
ones.contains(1)
  // => true
```
<a name="walk"></a>
## walk(fn)
Walks a stream and applies the input function to the stream. 
  Stream has to be finite for this to work.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to apply to every element of the stream |

**Example**  
```js
s.walk(function(element) {
       alert(element);
  });
```
<a name="print"></a>
## print(n)
Prints out the first `n` elements of a stream, will stop if stream length is less
  than `n`

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | Number of elements to print |

**Example**  
```js
s.print(5);
```
<a name="remove"></a>
## remove(n) ⇒ <code>[Stream](#Stream)</code>
Removes the first `n` elements of a stream. Returns an empty stream
  if `n` is greater than the stream's length.

**Kind**: global function  
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
<a name="toArray"></a>
## toArray() ⇒ <code>Array</code>
Constructs an array containing the elements of a finite stream

**Kind**: global function  
**Returns**: <code>Array</code> - A array containing the elements of the stream  
<a name="add"></a>
## add(s1, s2) ⇒ <code>[Stream](#Stream)</code>
Adds two streams

**Kind**: global function  
**Returns**: <code>[Stream](#Stream)</code> - Returns a new Stream that is the sum of the Augend and Addend streams  

| Param | Type | Description |
| --- | --- | --- |
| s1 | <code>[Stream](#Stream)</code> | Augend stream |
| s2 | <code>[Stream](#Stream)</code> | Addend stream |

**Example**  
```js
Stream.add(s1 s2);
```
<a name="zip"></a>
## zip([...streams]) ⇒ <code>[Stream](#Stream)</code>
Zips all elements of the input streams together. Works like Python's
  zip but returns arrays of arrays instead of a list of tuples
  The nth entry of a zipped stream is an an array consisting of
  all the nth elements of its constituent streams.

**Kind**: global function  
**Returns**: <code>[Stream](#Stream)</code> - A new stream containing the zipped elements  

| Param | Type | Description |
| --- | --- | --- |
| [...streams] | <code>[Stream](#Stream)</code> | streams to be zipped (picked off arguments object) |

**Example**  
```js
var zipped = Stream.zip(s1, s2, s3);
```
<a name="create"></a>
## create([...values]) ⇒ <code>[Stream](#Stream)</code>
Creates an input stream using a list of arguments

**Kind**: global function  
**Returns**: <code>[Stream](#Stream)</code> - A new stream containing the elements  

| Param | Type | Description |
| --- | --- | --- |
| [...values] | <code>\*</code> | values to be used in the stream |

**Example**  
```js
var s = Stream.create(1,2,3,4);
```
<a name="fromArray"></a>
## fromArray(values) ⇒ <code>[Stream](#Stream)</code>
Creates an input stream from an array

**Kind**: global function  
**Returns**: <code>[Stream](#Stream)</code> - A new stream containing the array elements  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | array to use in creating the stream |

**Example**  
```js
var s = Stream.fromArray([1,2,3,4]);
```
<a name="fromInterval"></a>
## fromInterval(low, high)
Constructs a stream made up of consecutive numbers in the
 range [low high]

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| low | <code>\*</code> | <code>0</code> | The lower limit value of the stream |
| high | <code>\*</code> |  | The upper limit value of the stream    returns {Stream} A finite stream with elements in the range [low, high] |

<a name="from"></a>
## from(start)
Constructs an infinite stream of consecutive numbers starting 
 from integer `start`

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| start | <code>Number</code> | <code>0</code> | The integer to start the stream from    returns {Stream} A infinite stream with elements starting from `start` |

<a name="upTo"></a>
## upTo(stop)
Constructs a stream made up of consecutive numbers up to `stop`

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stop | <code>Number</code> | The maximum and last value of the stream    returns {Stream} A finite stream with elements in the range [0, stop] |

<a name="Ones"></a>
## Ones() ⇒ <code>[Stream](#Stream)</code>
Returns an infinite stream of ones

**Kind**: global function  
**Returns**: <code>[Stream](#Stream)</code> - An infinite stream of Ones  
**Example**  
```js
var ones = Stream.Ones();
```
<a name="NaturalNumbers"></a>
## NaturalNumbers() ⇒ <code>[Stream](#Stream)</code>
Returns the stream of Natural numbers

**Kind**: global function  
**Returns**: <code>[Stream](#Stream)</code> - The infinite stream of natural numbers  
**Example**  
```js
var naturals = Stream.NaturalNumbers();
```
