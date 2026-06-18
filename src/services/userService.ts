import { APIRequestContext, APIResponse } from "@playwright/test";
import { BaseApiClient } from "@clients/baseApiClient";

export class UserService extends BaseApiClient{

    constructor(request: APIRequestContext) {
        super(request);
    }

    //GET  /api/users -- fetch all users
    async getUsers(): Promise<APIResponse>{
        return await this.get('/api/users');
    }

    //GET /api/users/:id  -- fetch single user id
    async getUserById(id:number): Promise<APIResponse>{
        return await this.get(`/api/users/${id}`);
    }

    //POST  /api/users -- create a new user
    async createUser(body: object): Promise<APIResponse>{
        return await this.post('/api/users', body);
    }

    //PUT  /api/users/:id  -- full update of a user
    async updateUser(id:number, body:object): Promise<APIResponse>{
        return await this.put(`/api/users/${id}`, body);
    }

    //PATCH  /api/users/:id -- partial update of a user
    async patchUser(id:number, body:object): Promise<APIResponse>{
        return await this.patch(`/api/users/${id}`, body);
    }

    //DELETE  /api/users/:id  -- delete a user
    async deleteUser(id:number): Promise<APIResponse>{
        return await this.delete(`/api/users/${id}`);
    }
}