import employeeEventHandler from "../employee/employee.events";
import { IEmployeeCommand } from "../employee/employee.types";
import logger from "../../config/logger";

const employeeEvent = new employeeEventHandler();

enum Commnads {
  add = "add",
}

class EventHandler {
  async employeeHandler(record: IEmployeeCommand) {
    try {
      await employeeEvent.processEmployee(record);
    } catch (error: any) {
      logger.error(error?.message);
    }
  }
}

export default new EventHandler();
