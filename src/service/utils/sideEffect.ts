export const sideEffect = fn => v => {
    try {
        const result = fn(v);

        return result instanceof Promise
            ? result.then(() => v)
            : v;

    } catch (e) {
        console.error(e);
        throw e;
    }
};
