import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
  
  @Prop({ default: new Date(), unique: true })
  created_at: Date

  @Prop()
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);