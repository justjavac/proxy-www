# proxy-www

> 学会 Proxy 就可以为所欲为吗？
> 
> 对，学会 Proxy 就可以为所欲为！

原始来源：https://twitter.com/RReverser/status/1138788910975397888 #14

```js
const www = new Proxy(() => 'https://www', {
    get(target, key, proxy) {
        return typeof key === 'string'
                   ? new Proxy(() => target() + '.' + key, this) :
               key === Symbol.toPrimitive
                   ? () => target() + '/' :
               Reflect.get(target, key, proxy);
    },
    apply(target, thisArg, args) {
        switch (typeof args[0]) {
            case 'function':
                return fetch(target().replace(/\.then$/, '')).then(...args);
            case 'object':
                const href = target() + '/' + String.raw(...args);
                return {
                    [Symbol.toPrimitive]: () => href,
                    then: (v, x) => fetch(href).then(v, x),
                };
        }
    },
});
```

访问百度

```js
www.baidu.com.then(response => {
    console.log(response.status);
    // ==> 200
});
```

使用 `async`/`await` 语法：

```js
const response = await www.baidu.com;

console.log(response.ok);
// ==> true

console.log(response.status);
// ==> 200
```

带上路径：

```js
await www.baidu.com`s?wd=justjavac`;
```
