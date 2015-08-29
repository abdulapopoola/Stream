## Classes
<dl>
<dt><a href="#Stream">Stream</a></dt>
<dd></dd>
</dl>
## Functions
<dl>
<dt><a href="#isEmpty">isEmpty()</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a stream is empty</p>
</dd>
<dt><a href="#pick">pick()</a> ⇒ <code>Array</code></dt>
<dd><p>Picks the first n elements out of a stream, terminates when it gets to the nth item or reaches the end of the stream</p>
</dd>
</dl>
<a name="Stream"></a>
## Stream
**Kind**: global class  
<a name="new_Stream_new"></a>
### new Stream(first, restGenerator)
Creates the Stream object

**Returns**: <code>Object</code> - Returns the new Stream object instance  

| Param | Type | Description |
| --- | --- | --- |
| first | <code>\*</code> | First element of the stream |
| restGenerator | <code>function</code> | function to generate remaining parts of the stream |

<a name="isEmpty"></a>
## isEmpty() ⇒ <code>boolean</code>
Checks if a stream is empty

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns `true` if the stream is empty  
**Example**  
```js
emptyStream.isEmpty();
  // => true
```
<a name="pick"></a>
## pick() ⇒ <code>Array</code>
Picks the first n elements out of a stream, terminates when it gets to the nth item or reaches the end of the stream

**Kind**: global function  
**Returns**: <code>Array</code> - Returns array of all successfully picked items  
**Example**  
```js
integerStream.pick(3);
  // => [1,2,3]
```
