import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type PermissionDocument = Permission & Document

@Schema({
    versionKey: false,
})
export class Permission {

    @Prop()
    title: string
}

export const PermissionSchema = SchemaFactory.createForClass(Permission)