import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OmitType, PartialType } from "@nestjs/swagger";
import { Document } from "mongoose";
import { Permission } from "../permission/permission.schema";
import { UserStatus } from "./user-status.schema";

export type UserDocument = User & Document

@Schema({
    versionKey: false,
})
export class User {
    @Prop({ unique: true })
    username: string

    @Prop()
    password: string

    @Prop()
    name: string

    @Prop({ unique: true })
    email: string

    @Prop({ enum: UserStatus })
    status: UserStatus

    @Prop()
    permissions: Permission[]
}

export const UserSchema = SchemaFactory.createForClass(User)
