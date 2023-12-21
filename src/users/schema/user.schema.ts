import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  zipCode: number;

  @Prop()
  email: string;

  @Prop()
  phone: number;

  @Prop()
  password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
