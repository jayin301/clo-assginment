import mongoose, { Schema, Document } from "mongoose";
import { IEmployee } from "../employee.types";

interface IGetEmployeesDocument extends Document {
  employees: Array<IEmployee>;
  noOfEmployee: number;
}

const GetEmployeesSchema = new Schema<IGetEmployeesDocument>(
  {
    noOfEmployee: Number,
    employees: [
      {
        name: String,
        email: String,
        tel: String,
        joined: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGetEmployeesDocument>(
  "AllEmployees",
  GetEmployeesSchema
);
