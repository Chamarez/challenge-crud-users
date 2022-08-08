import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { BCRYPT } from 'src/bcrypt/bcrypt.const';
import { Bcrypt } from 'src/bcrypt/bcrypt.provider';
import { Role } from 'src/utils/enum/role';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  saltRounds = 10;

  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private configService: ConfigService,
    @Inject(BCRYPT)
    public bcryptProvider: Bcrypt,
  ) {}

  async getAllUsers() {
    return this.userModel.find().exec();
  }

  async create(user: RegisterDto): Promise<any> {
    try {
      const userHash: any = { ...user };
      userHash.password = this.generatePassword(user.password);
      userHash.roles = [Role.USER];
      const newUser = await this.userModel.create(userHash);
      return newUser;
    } catch (e) {
      console.log(e);
    }
  }
  async update(id: string, user: RegisterDto): Promise<any> {
    const userHash: any = { ...user };
    userHash.password = this.generatePassword(user.password);
    const response = this.userModel
      .findOneAndUpdate(
        { _id: id },
        {
          ...userHash,
        },
      )
      .catch(() => {
        throw new BadRequestException('User not found');
      });
    return !!response;
  }
  generatePassword(password: string): string {
    return this.bcryptProvider.hashSync(password, this.saltRounds);
  }
}
