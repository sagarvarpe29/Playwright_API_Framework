interface AuthPayload {
    email: string;
    password: string;
}

export const authData:{validUser: AuthPayload, invalidUser: AuthPayload, validRegister: AuthPayload} = {
    validUser:{ email: "eve.holt@reqres.in", password: "cityslicka"},
    invalidUser:{ email: "invalid@test.com", password: "wrongpass"},
    validRegister:{ email:"eve.holt@reqres.in", password:"pistol"}
}
