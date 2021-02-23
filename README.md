# proxy-www

> 学会 Proxy 就可以为所欲为吗？
> 
> 对，学会 Proxy 就可以为所欲为！

```js
const www = function () {
    const handlers = {
        apply: (target, thisArg, args) =>
            fetch(target()).then(...args),
        get: (target, key, proxy) =>
            typeof prop === 'string'
                ? new Proxy(() => `${target()}.${key}`, handlers)
                : Reflect.get(target, key, proxy),
    };
    return new Proxy(() => 'https://www', handlers);
}();
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
