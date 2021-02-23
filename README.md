# proxy-www

> 学会 Proxy 就可以为所欲为吗？
> 
> 对，学会 Proxy 就可以为所欲为！

```js
const www = new Proxy(() => 'https://www', {
    get (target, key) { return new Proxy(() => `${target()}.${key}`, this); },
    apply: (target, thisArg, args) => fetch(target().slice(0, -5)).then(...args),
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
