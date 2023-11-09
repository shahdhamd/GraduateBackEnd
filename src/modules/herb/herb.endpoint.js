import { roles } from "../../services/roles.js";

export const endpoint={
    createHerb:[roles.Admin],
    delete:[roles.Admin],
    update:[roles.Admin],
    search:[roles.User,roles.Admin],
    getAllHerb:[roles.User,roles.Admin],
}