import {test, expect} from "@fixtures/apiFixtures";
import { resourceData } from "@test-data/resourceData";

test.describe("Resource flows", () => {

    test('get all resources', async({ resourceService}) => {

        const response= await resourceService.getResources();
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body.data)).toBe(true);
    });

    test('get resource by id', async({ resourceService }) => {
        const response= await resourceService.getResourceById(2);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.id).toEqual(2);
    });

    test('get non- existent resource', async({ resourceService}) =>{
        const response = await resourceService.getResourceById(999);
        expect(response.status()).toBe(404);
    });

    test('create resource', async({ resourceService})=>{
        const response = await resourceService.createResource(resourceData.createOrUpdate);
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.id).toBeDefined();
        expect(body.name).toBeDefined();
    });

    test('update resource', async({ resourceService}) =>{

        const response = await resourceService.updateResource(2, resourceData.createOrUpdate);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.name).toBeDefined();
    });

    test('patch resource', async({ resourceService}) =>{
        const response = await resourceService.patchResource(2, resourceData.patch);
        expect(response.status()).toBe(200);
    });

    test('delete resource', async({ resourceService}) =>{
        const response = await resourceService.deleteResource(2);
        expect(response.status()).toBe(204);
    })
});