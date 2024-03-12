import { Schema, model } from 'mongoose'

export interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
}

const UserSchema = new Schema({
  'email': {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  'password': {
    type: String,
    required: true,
    len: [8, 'Password must be at least 8 characters']
  },
  'name': {
    type: String,
    required: true,
  }
})

export const User = model<UserDocument>('User', UserSchema)
