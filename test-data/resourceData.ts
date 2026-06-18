interface ResourcePayload{
    name:string;
    year:number;
    color:string;
    pantone_value:string;
}

export const resourceData:{createOrUpdate: ResourcePayload, patch: Partial<ResourcePayload>} = {
    createOrUpdate:{ name: "cerulean", year: 2023, color:"#98B2D1",pantone_value:"15-1520"},
    patch:{ name: "cerulean updated" }
}