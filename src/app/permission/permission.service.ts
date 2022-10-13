import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { instanceToInstance, plainToInstance } from "class-transformer";
import { Model } from "mongoose";
import { PermissionResponse } from "./permission.response";
import { Permission, PermissionDocument } from "./permission.schema";

@Injectable()
export class PermissionService {
    constructor(@InjectModel(Permission.name) private readonly permissionModel: Model<PermissionDocument>) { }

    async getPermissions(): Promise<Permission[]> {
        new this.permissionModel(({
            title: "Permission 1"
        })).save()
        return (await this.permissionModel.find().exec()).map((data) => plainToInstance(PermissionResponse, instanceToInstance(data)))
    }
}