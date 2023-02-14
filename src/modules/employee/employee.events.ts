import getEmployeeModel from "./models/getEmployee";
import { IEmployee, IEmployeeCommand } from "./employee.types";

enum Commnads {
  add = "add",
}

class employeeEventHandler {
  async processEmployee(record: IEmployeeCommand) {
    switch (record.command) {
      case Commnads.add:
        await new getEmployeeModel({
          name: record.name,
          email: record.email,
          tel: record.tel,
          joined: record.joined,
        }).save();
        break;
    }
  }
}

export default employeeEventHandler;
