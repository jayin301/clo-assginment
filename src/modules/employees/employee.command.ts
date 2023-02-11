import { convertObjectToParameters } from "../app/helper";
import client from "../../config/redis";
import eventHandler from "../app/eventHandler";
import getEmployeeModel from "./models/getEmployee";
import { AddEmployeeDTO } from "./employee.types";

class EmployeeCommandHandler {
  async addEmployee(payload: AddEmployeeDTO) {
    console.log(payload);
    console.log("hello");
    const { name, email, tel, joined } = payload;

    const employee = await getEmployeeModel.findOne({ email }).lean();
    if (employee) throw new Error("Email already exists");
    const employeeData = {
      name,
      email,
      tel,
      joined,
      command: "add",
    };
    const parameters = convertObjectToParameters(employeeData);
    await client.sendCommand(["XADD", "employee_stream", "*", ...parameters]);
    eventHandler.employeeHandler(employeeData);
  }

  async addEmployees(payload: AddEmployeeDTO[]) {
    await Promise.all(payload.map((data) => this.addEmployee(data)));
  }
}

export default new EmployeeCommandHandler();
