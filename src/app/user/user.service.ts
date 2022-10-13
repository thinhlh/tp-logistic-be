import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserStatus } from './user-status.schema';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userRepository: Model<UserDocument>) {

    }

    async findUserByUsername(username: string): Promise<User | null> {

        const user = (await this.userRepository.findOne({
            username: username
        })).toObject<User>()

        return user;
    }
}
