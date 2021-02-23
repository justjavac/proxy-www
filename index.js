const www = function () {
    const handlers = {
        apply: (target, thisArg, args) =>
            fetch(target().slice(0, -5)).then(...args),
        get: (target, key, proxy) =>
            new Proxy(() => `${target()}.${key}`, handlers),
    };
    return new Proxy(() => 'https://www', handlers);
}();
