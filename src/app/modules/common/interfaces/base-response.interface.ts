/**
 * The shape of all responses coming from the API
 */
export default interface BaseResponseInterface<T> {
    errors: Error[];
    data: T;
}

interface Error {
    code: number
    description: string;
}
