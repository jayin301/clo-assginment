import client from "../../config/redis";
import eventHandler from "../app/eventHandler";
import getEmployeeModel from "./models/getEmployee";
import { AddEmployeeDTO } from "./employee.types";
import logger from "../../config/logger";
import { BadRequestError } from "../app/errorHandler";

class EmployeeCommandHandler {
  async addEmployee(payload: AddEmployeeDTO) {
    const { name, email, tel, joined } = payload;
    const employee = await getEmployeeModel.findOne({ email }).lean();
    if (employee) throw new BadRequestError("Email already exists");
    const employeeData = {
      name,
      email,
      tel,
      joined,
      command: "add",
    };
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
