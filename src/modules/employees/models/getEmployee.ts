import mongoose, { Schema, Document } from "mongoose";

export interface IEmployeeDocument extends Document {
  name: string;
  email: string;
  tel: string;
  joined: string;
}

const EmployeeSchema = new Schema<IEmployeeDocument>(
  {
    name: String,
    email: String,
    tel: String,
    joined: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEmployeeDocument>("Employee", EmployeeSchema);
