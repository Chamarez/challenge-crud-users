import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

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
  isBloqued: boolean;

  @Prop()
  isActivated: boolean;

  @Prop()
  emailToken: string;

  @Prop()
  age: number;

  @Prop()
  adress: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
