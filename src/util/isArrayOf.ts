export function isArrayOf<T>(value: any, elementTest: (element: any) => element is T): value is T[] {
    if (!Array.isArray(value)) return false
    return value.every(elementTest)
}

export const notNullable = <T>(value: T): value is NonNullable<T> => value != null;
