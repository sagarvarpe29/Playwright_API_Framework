import { APIRequestContext, APIResponse } from "@playwright/test";

export class BaseApiClient {

    protected request: APIRequestContext;

    constructor(request: APIRequestContext){
        this.request = request;
    }

    async get(endpoint: string, headers?: object): Promise<APIResponse>{
        return await this.request.get(endpoint, {
            headers : {...headers}
        });
    }

    async post(endpoint: string, body:object, headers?:object): Promise<APIResponse>{
        return await this.request.post(endpoint, {
            data: body,
            headers: {...headers}
        });
    }

    async put(endpoint: string, body:object, headers?:object): Promise<APIResponse>{
        return await this.request.put(endpoint,{
            data: body,
            headers: {...headers}
        });
    }

    async patch(endpoint:string, body:object, headers?:object): Promise<APIResponse>{
        return await this.request.patch(endpoint, {
            data: body,
            headers: {...headers}
        });
    }

    async delete(endpoint: string, headers?: object): Promise<APIResponse>{
        return await this.request.delete(endpoint,{
            headers: {...headers}
        });
    }
}