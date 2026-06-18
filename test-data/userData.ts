interface UserPayload{
    name:string;
    job:string;
}

export const userData:{createOrUpdate: UserPayload, patch: Partial<UserPayload>} = {
    createOrUpdate:{ name: "John Doe", job: "QA Engineer"},
    patch:{ job: "QA Engineer" },
}