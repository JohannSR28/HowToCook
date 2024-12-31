import mongoose, { Schema, Document } from "mongoose";

// Définir l'interface TypeScript
export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
}

// Schéma Mongoose
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true } // Ajoute createdAt et updatedAt
);

export default mongoose.model<IUser>("User", UserSchema);
