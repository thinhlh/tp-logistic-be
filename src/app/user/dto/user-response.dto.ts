import { OmitType, PartialType } from "@nestjs/swagger";
import { User } from "../user.schema";

export class UserResponse extends OmitType(User, ['password']) { }