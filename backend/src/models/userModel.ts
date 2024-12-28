import mongoose, { Schema, Document } from "mongoose";

// Définir l'interface TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
}

// Schéma Mongoose
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
