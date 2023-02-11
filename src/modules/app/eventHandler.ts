import client from "../../config/redis";
import employeeEventHandler from "../employees/employee.events";
import { IEmployee, IEmployeeCommand } from "../employees/employee.types";
import { convertArrayParametersToObject } from "./helper";
import logger from "../../config/logger";

const employeeEvent = new employeeEventHandler();

enum Commnads {
  add = "add",
}

class EventHandler {
  async getEmployeeRecord(): Promise<IEmployee[]> {
    const events: any = await client.sendCommand([
      "XREAD",
      "STREAMS",
      "employee_stream",
      "0-0",
    ]);
    if (!events) return [];
    const [_, records] = events[0];
    let employees: IEmployee[] = [];
    for (const record of records) {
      let [_, userData] = record;
      userData = convertArrayParametersToObject(userData);
      switch (userData.command) {
        case Commnads.add:
          employees.push({
            name: userData.name,
            email: userData.email,
            tel: userData.tel,
            joined: userData.joined,
          });
          break;
      }
    }
    return employees;
  }

  async employeeHandler(record: IEmployeeCommand) {
    try {
      await employeeEvent.processEmployee(record);
      const employees = await this.getEmployeeRecord();
      await employeeEvent.updateEmployees(employees);
    } catch (error) {
      logger.error(error);
    }
  }
}

export default new EventHandler();
