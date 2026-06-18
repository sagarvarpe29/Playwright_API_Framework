import { APIRequestContext, APIResponse } from "@playwright/test";
import { BaseApiClient } from "@clients/baseApiClient";

export class ResourceService extends BaseApiClient{

    constructor(request: APIRequestContext){
        super(request);
    }

    //GET  /api/unknown -- fetch all resources
    async getResources(): Promise<APIResponse>{
        return await this.get('/api/unknown');
    }

    //GET  /api/unknown/:id -- fetch single resource
    async getResourceById(id:number): Promise<APIResponse>{
        return await this.get(`/api/unknown/${id}`);
    }

    //POST  /api/unknown -- create resource
    async createResource(body:object): Promise<APIResponse>{
        return await this.post('/api/unknown', body);
    }

    //PUT  /api/unknown/:id  -- full update of a resource
    async updateResource(id:number, body:object): Promise<APIResponse>{
        return await this.put(`/api/unknown/${id}`, body);
    }

    //PATCH  /api/unknown/:id -- partial update of a resource
    async patchResource(id:number, body:object): Promise<APIResponse>{
        return await this.patch(`/api/unknown/${id}`, body);
    }

    //DELETE  /api/unknown/:id  -- delete a resource
    async deleteResource(id:number): Promise<APIResponse>{
        return await this.delete(`/api/unknown/${id}`);
    }
}