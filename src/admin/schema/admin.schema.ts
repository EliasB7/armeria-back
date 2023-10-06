import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  id: number;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  isAdmin: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
