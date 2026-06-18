import {test, expect} from "@fixtures/apiFixtures";
import { authData } from "@test-data/authData";

test.describe('Auth API', () => {

    test('test valid auth flow', async ({ authService}) => {
        const response = await authService.login(authData.validUser.email,authData.validUser.password);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.token).toBeDefined();
    });

    test('test invalid auth flow', async({ authService}) => {
        const response = await authService.login(authData.invalidUser.email, authData.invalidUser.password);
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBeDefined();
    });

    test('test valid register flow', async({ authService}) => {
        const response = await authService.register(authData.validRegister.email, authData.validRegister.password);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.id).toBeDefined();
        expect(body.token).toBeDefined();
    }); 
});