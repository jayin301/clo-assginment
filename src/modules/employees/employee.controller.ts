import { Request, Response } from "express";
import getEmployeesModel from "./models/getEmployees";
import getEmployeeModel from "./models/getEmployee";
import employeeCommandHandler from "./employee.command";
import {
  addEmployeeValidator,
  addEmployeesValidator,
} from "./employee.validator";
import { AddEmployeeDTO } from "./employee.types";
import Papa from "papaparse";
import * as fs from "fs";
import path, { join } from "path";

class EmployeeController {
  async addEmployees(request: Request, response: Response) {
    try {
      const payload = request.body;
      const file = request.file;
      let employees: AddEmployeeDTO[] = [];

      if (file) {
        const ext = path.extname(file.filename);

        switch (ext) {
          case ".csv":
            const csvString = fs.readFileSync(file.path, { encoding: "utf8" });
            const csv: any[] = Papa.parse(csvString).data;
            employees = csv.map((employee) => {
              const [name, email, tel, joined] = employee;
              return {
                name: name,
                email: email,
                tel: tel,
                joined: joined,
              };
            });
            break;
          case ".json":
            const rawData = fs.readFileSync(file.path, { encoding: "utf8" });
            employees = JSON.parse(rawData);
            break;
          default:
            response.status(403).json({
              error: "파일 확장자명을 확인하세요.",
            });
        }
      } else {
        employees = payload;
      }

      addEmployeesValidator(employees);
      await employeeCommandHandler.addEmployees(employees);
      response.status(201).json({
        message: "Employee successfully added",
      });
    } catch (error: any) {
      console.log(error);
      response.status(500).json({
        error: error?.message,
      });
    }
  }

  async addEmployee(request: Request, response: Response) {
    try {
      const payload: AddEmployeeDTO = request.body;
      addEmployeeValidator(payload);
      await employeeCommandHandler.addEmployee(payload);
      response.status(201).json({
        message: "Employee successfully added",
      });
    } catch (error: any) {
      console.log(error);
      response.status(500).json({
        error: error?.message,
      });
    }
  }

  async getEmployees(request: Request, response: Response) {
    try {
      const page = request.query.page;
      const limit = request.query.pageSize;
      const employees = await getEmployeeModel
        .find()
        .limit(limit)
        .skip((page - 1) * limit);

      return response.json({
        data: employees,
      });
    } catch (error: any) {
      console.log(error);
      response.status(500).json({
        error: error?.message,
      });
    }
  }

  async getEmployee(request: Request, response: Response) {
    try {
      const employee = await getEmployeeModel.findOne({
        name: request.params.name,
      });
      return response.json({
        data: employee,
      });
    } catch (error: any) {
      console.log(error);
      response.status(500).json({
        error: error?.message,
      });
    }
  }
}

export default new EmployeeController();
