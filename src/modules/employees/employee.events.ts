import client from "../../config/redis";
import { getTodayFromDateTime } from "../app/helper";
import getEmployeeModel from "./models/getEmployee";
import getEmployeesModel from "./models/getEmployees";
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

  async updateEmployees(employees: Array<IEmployee>) {
    const allEmployees = await getEmployeesModel.findOne({});
    if (allEmployees) {
      allEmployees.employees = employees;
      allEmployees.noOfEmployee = employees.length;
      await allEmployees.save();
    } else {
      await new getEmployeesModel({
        employees,
        noOfEmployee: employees.length,
      }).save();
    }
  }
}

export default employeeEventHandler;
