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
                return fetch(target().replace(/\.then$/, '')).then(...args);
            case 'object':
                args = [ String.raw(...args) ];
            case 'string':
                return {
                    [Symbol.toPrimitive]: () => target() + '/' + arg[0],
                    then: (v, x) => fetch(target() + '/' + arg[0]).then(v, x),
                };
            default:
                return target() + '/';
        }
    },
});
