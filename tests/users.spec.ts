import { test, expect } from "@fixtures/apiFixtures";
import { userData } from "@test-data/userData";

test.describe("User Flows", () => {
  test("get all users", async ({ userService }) => {
    const response = await userService.getUsers();
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
  });

  test("get user by id", async ({ userService }) => {
    const response = await userService.getUserById(2);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.id).toEqual(2);
  });

  test("get non-existent user", async ({ userService }) => {
    const response = await userService.getUserById(999);
    expect(response.status()).toBe(404);
  });

  test("create user", async ({ userService }) => {
    const response = await userService.createUser(userData.createOrUpdate);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.id).toBeDefined();
    expect(body.name).toBeDefined();
  });

  test("update user", async ({ userService }) => {
    const response = await userService.updateUser(2, userData.createOrUpdate);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBeDefined();
    expect(body.job).toBeDefined();
  });

  test("patch user", async ({ userService }) => {
    const response = await userService.patchUser(2, userData.patch);
    expect(response.status()).toBe(200);
  });

  test("delete user", async ({ userService }) => {
    const response = await userService.deleteUser(2);
    expect(response.status()).toBe(204);
  });
});