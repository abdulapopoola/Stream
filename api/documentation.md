## Classes
<dl>
<dt><a href="#Stream">Stream</a></dt>
<dd></dd>
</dl>
## Functions
<dl>
<dt><a href="#isEmpty">isEmpty(stream)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a stream is empty</p>
</dd>
<dt><a href="#map">map(stream, fn)</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Maps a function to all the elements of a stream</p>
</dd>
<dt><a href="#Ones">Ones()</a> ⇒ <code><a href="#Stream">Stream</a></code></dt>
<dd><p>Returns an infinite stream of ones</p>
</dd>
<dt><a href="#pick">pick(n)</a> ⇒ <code>Array</code></dt>
<dd><p>Picks the first n elements out of a stream, terminates when it gets to the nth item or reaches the end of the stream</p>
</dd>
<dt><a href="#valueAt">valueAt(index)</a> ⇒ <code>*</code></dt>
<dd><p>Picks the element at the nth index in a stream. Returns undefined 
  if stream size is less than the index</p>
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

<a name="isEmpty"></a>
## isEmpty(stream) ⇒ <code>boolean</code>
Checks if a stream is empty

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns `true` if the stream is empty  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>[Stream](#Stream)</code> | stream to check for emptiness |

**Example**  
```js
Stream.isEmpty(emptyStream);
  // => true
```
<a name="map"></a>
## map(stream, fn) ⇒ <code>[Stream](#Stream)</code>
Maps a function to all the elements of a stream

**Kind**: global function  
**Returns**: <code>[Stream](#Stream)</code> - Returns a new Stream with the input function applied to entries  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>[Stream](#Stream)</code> | Stream to map function to |
| fn | <code>function</code> | Function to apply to stream elements |

**Example**  
```js
Stream.map(integerStream, function (n) { return n*2; });
  // => true
```
<a name="Ones"></a>
## Ones() ⇒ <code>[Stream](#Stream)</code>
Returns an infinite stream of ones

**Kind**: global function  
**Returns**: <code>[Stream](#Stream)</code> - Value at nth index in stream  
**Example**  
```js
var ones = Stream.Ones();
```
<a name="pick"></a>
## pick(n) ⇒ <code>Array</code>
Picks the first n elements out of a stream, terminates when it gets to the nth item or reaches the end of the stream

**Kind**: global function  
**Returns**: <code>Array</code> - Returns array of all successfully picked items  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | The number of elements to be picked |

**Example**  
```js
integerStream.pick(3);
  // => [1,2,3]
```
<a name="valueAt"></a>
## valueAt(index) ⇒ <code>\*</code>
Picks the element at the nth index in a stream. Returns undefined 
  if stream size is less than the index

**Kind**: global function  
**Returns**: <code>\*</code> - Value at nth index in stream  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> | The index of the stream element to be picked |

**Example**  
```js
integerStream.valueAt(3);
  // => 3
```
