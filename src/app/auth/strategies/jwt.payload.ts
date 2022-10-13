import { Permission } from "src/app/permission/permission.schema";

export interface JWTPayload {
    username: string,
    tokenType: string,
    permissions: Permission[]
}