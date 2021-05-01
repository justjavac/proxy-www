# proxy-www

> 学会 Proxy 就可以为所欲为吗？
> 
> 对，学会 Proxy 就可以为所欲为！

原始来源：https://twitter.com/RReverser/status/1138788910975397888 #14

```js
const www = new Proxy(new URL('https://www'), {
    get: function get(target, prop) {
        let o = Reflect.get(target, prop);
        if (typeof o === 'function') {
            return o.bind(target)
        }
        if (typeof prop !== 'string') {
            return o;
        }
        if (prop === 'then') {
            return Promise.prototype.then.bind(fetch(target));
        }
        target = new URL(target);
        target.hostname += `.${prop}`;
        return new Proxy(target, { get });
    }
});
```

访问百度

```js
www.baidu.com.then(response => {
    console.log(response.status);
    // ==> 200
})
```

使用 `async`/`await` 语法：

```js
const response = await www.baidu.com

console.log(response.ok)
// ==> true

console.log(response.status);
// ==> 200
```
