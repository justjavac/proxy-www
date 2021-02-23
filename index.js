const www = new Proxy(() => 'https://www', {
    get: function get(target, prop) {
        if (typeof prop !== 'string') { return o; }
        const hostname = `${target()}.${prop}`;
        return new Proxy(
            () => hostname,
            prop === 'then'
                ? { apply: (target, thisArg, args) => fetch(target()).then(...args),
                    get }
                : { get }
        );
    }
});
