import { Controller, Get } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Permission } from "./permission.schema";
import { PermissionService } from "./permission.service";

@Controller()
export class PermissionController {

    constructor(private readonly permissionService: PermissionService) { }

    @Get("/")
    async createPermission() {
        const permissionDocuments = await this.permissionService.getPermissions()
        return permissionDocuments
    }
}