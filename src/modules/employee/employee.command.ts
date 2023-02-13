import client from "../../config/redis";
import eventHandler from "../app/eventHandler";
import getEmployeeModel from "./models/getEmployee";
import { AddEmployeeDTO } from "./employee.types";
import logger from "../../config/logger";

class EmployeeCommandHandler {
  async addEmployee(payload: AddEmployeeDTO) {
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
    await client.sAdd("employee_stream", JSON.stringify(employeeData));
    eventHandler.employeeHandler(employeeData);
  }

  async addEmployees(payload: AddEmployeeDTO[]) {
    await Promise.all(
      payload.map(async (data) => {
        await this.addEmployee(data);
      })
    );
  }
}

export default new EmployeeCommandHandler();
