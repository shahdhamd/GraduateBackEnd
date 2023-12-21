import { roles } from "../../services/roles.js";

export const endpoint={
    getAll:[roles.Admin],
    update:[roles.Admin,roles.User],
    createContribution:[roles.Admin,roles.User],
    delete:[roles.User,roles.Admin]
}