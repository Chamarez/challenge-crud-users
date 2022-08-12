import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Role } from 'src/utils/enum/role';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: false })
  firstName: string;

  @Prop({ required: true, unique: false })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  telephoneNumber: number;

  @Prop()
  password: string;

  @Prop()
  isBloqued?: boolean;

  @Prop()
  isActivated?: boolean;

  @Prop()
  emailToken?: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  adress: string;

  @Prop({ required: true })
  maritalStatus: string;

  @Prop({ required: true })
  profession: string;

  @Prop({ required: true })
  identificationNumber: string;

  @Prop({ required: true })
  roles: Role;
}

export const UsersSchema = SchemaFactory.createForClass(User);
