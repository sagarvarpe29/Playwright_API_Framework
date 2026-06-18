import { test as base, expect } from "@playwright/test"
import { AuthService } from "@services/authService";
import { UserService } from "@services/userService";
import { ResourceService } from "@services/resourceService";

//Define a type for your custom fixtures
type ApiFixtures = {
    authService: AuthService;
    userService: UserService;
    resourceService: ResourceService;
};

//Extend base with your fixture implementations
export const test = base.extend<ApiFixtures>({

    authService: async ({ request }, use) => {
        await use(new AuthService(request));
    },

    userService: async ({ request }, use) => {
        await use(new UserService(request));
    },

    resourceService: async ({ request }, use) => {
        await use(new ResourceService(request));
    },
    
});

export { expect };
