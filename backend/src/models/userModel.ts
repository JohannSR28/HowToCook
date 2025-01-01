import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  recipesId: string[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Ajout de select: false
  recipesId: { type: [String], default: [] }, // IDs des recettes comme string
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
export type { IUser };
