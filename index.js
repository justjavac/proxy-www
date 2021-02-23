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
