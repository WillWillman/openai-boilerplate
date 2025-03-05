const stringifyFunctions = (obj) => {
    if (typeof obj === 'function') {
        return !obj.signature
            ? obj.toString()
            : obj.signature
                ?.match(/^function\s*([^(]*)\(([^)]*)\)/)
                ?.[0]
                ?.replace(/^.*\(/, '(') + ' => void'
    } else if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
        return Object
            .entries(obj)
            .reduce((acc, [key, value]) => {
                acc[key] = stringifyFunctions(value);
                return acc;
            }, {});
    }
    return obj;
};

export const stringifyProps = props => JSON.stringify(stringifyFunctions(props), null, 2);
