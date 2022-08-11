import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Role } from 'src/utils/enum/role';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  telephoneNumber: number;

  @Prop()
  password: string;

  @Prop()
  isBloqued?: boolean;

  @Prop()
  isActivated?: boolean;

  @Prop()
  emailToken?: string;

  @Prop()
  age: number;

  @Prop()
  adress: string;

  @Prop()
  maritalStatus: string;

  @Prop()
  profession: string;

  @Prop()
  identificationNumber: string;

  @Prop()
  roles: Role;
}

export const UsersSchema = SchemaFactory.createForClass(User);
