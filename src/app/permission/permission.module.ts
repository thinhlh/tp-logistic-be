import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { PermissionController } from "./permission.controller";
import { Permission, PermissionSchema } from "./permission.schema";
import { PermissionService } from "./permission.service";

@Module({
    controllers: [PermissionController],
    providers: [PermissionService],
    imports: [MongooseModule.forFeature([
        {
            name: Permission.name,
            schema: PermissionSchema,
        },
    ])]
})
export class PermissionModule {

}