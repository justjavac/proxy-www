const www = new Proxy(() => 'https://www', {
    get (target, key) { return new Proxy(() => `${target()}.${key}`, this); },
    apply: (target, thisArg, args) => fetch(target().slice(0, -5)).then(...args),
});
