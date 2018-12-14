// filter predicate for removing nulls and undefined values from an array
const isNotNull = <T>(x: T): x is NonNullable<T> => !!x;

export default isNotNull;
