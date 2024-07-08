export declare class APIRequest<T> {
    url: string;
    token: string;
    payload: T;
}
export declare class APIResponse<T> {
    response: T;
    statusCode: number;
    success: boolean;
    errors: any;
}
export declare class HttpUtils {
    static getAPIResult<R>(url: string, token: string): Promise<R>;
    static deleteAPI<R>(url: string, token: string, tokenName: string): Promise<R>;
    static postAPIRequest<T, R>(url: string, token: string, payload: T, tokenName?: string): Promise<APIResponse<R>>;
    static fetchDataByPostAPI<T, R>(url: string, token: string, payload: T, tokenName: string): Promise<APIResponse<R>>;
    static uploadAPIRequest<T, R>(url: string, token: string, formData: FormData): Promise<APIResponse<R>>;
}
//# sourceMappingURL=HttpUtils.d.ts.map