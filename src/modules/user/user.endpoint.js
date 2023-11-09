import { roles } from "../../services/roles.js";

export const endpoint={
    getAllUser:[roles.Admin],
    update:[roles.Admin,roles.User],
    addAccount:[roles.Admin],
    deleteUserAccount:[roles.Admin],
    upload:[roles.User,roles.Admin]
}