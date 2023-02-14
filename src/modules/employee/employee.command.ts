import eventHandler from "../app/eventHandler";
import { AddEmployeeDTO } from "./employee.types";

class EmployeeCommandHandler {
  async addEmployee(payload: AddEmployeeDTO) {
    const { name, email, tel, joined } = payload;
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
