# proxy-www

> 学会 Proxy 就可以为所欲为吗？
> 
> 对，学会 Proxy 就可以为所欲为！

```js
const www = new Proxy(() => 'https://www', {
    get(target, key, proxy) {
        if (typeof key === 'string') {
            return new Proxy(() => target() + '.' + key, this);
        }
        if (key === Symbol.toPrimitive) {
            return () => target() + '/';
        }
        return Reflect.get(target, key, proxy);
    },
    apply(target, thisArg, args) {
        switch (typeof args[0]) {
            case 'function':
                return fetch(target().slice(0, -5)).then(...args);
            case 'object':
                args = [ String.raw(...args) ];
            case 'string':
                return {
                    [Symbol.toPrimitive]: () => target() + '/' + arg[0],
                    then: (v, x) => fetch(target() + '/' + arg[0]).then(v, x),
                };
            default:
                return target();
        }
    },
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
