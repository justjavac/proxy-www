const www = new Proxy(() => 'https://www', {
    get(target, key) {
        if (typeof key === 'string') {
            return new Proxy(() => target() + '.' + key, this);
        }
        if (key === Symbol.toPrimitive) {
            return () => target() + '/';
        }
    },
    apply(target, thisArg, args) {
        switch (typeof args[0]) {
            case 'function':
                return fetch(target().slice(0, -5)).then(...args);
            case 'object':
                const rest = String.raw(...args);
                return { then: () => fetch(target() + '/' + rest).then(...arguments) };
            case 'string':
                return { then: () => fetch(target() + '/' + arg[0]).then(...arguments) };
        }
    },
});
