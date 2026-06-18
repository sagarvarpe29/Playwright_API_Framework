import { APIRequestContext, APIResponse } from "@playwright/test";
import { BaseApiClient } from "@clients/baseApiClient";

export class AuthService extends BaseApiClient{

    constructor(request: APIRequestContext){
        super(request);
    }

    //POST /api/login  -- login and get token
    async login(email:string, password:string):Promise<APIResponse>{
        return await this.post('/api/login', {
            email:email,
            password:password
        });
    }

    //POST /api/register  -- register a new user
    async register(email:string, password:string):Promise<APIResponse>{
        return await this.post('/api/register', {
            email: email,
            password: password
        })
    }
}