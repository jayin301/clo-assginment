import { Request, Response } from "express";
import getEmployeeModel from "./models/getEmployee";
import employeeCommandHandler from "./employee.command";
import {
  addEmployeeValidator,
  addEmployeesValidator,
} from "./employee.validator";
import { AddEmployeeDTO } from "./employee.types";
import Papa from "papaparse";
import * as fs from "fs";
import path from "path";
import { errorHandler } from "../app/errorHandler";

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
            employees = parseEmployeesWithCSVform(csvString);
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
        employees = parseEmployeesWithCSVform(payload.employees);
      }
      await addEmployeesValidator(employees);
      await employeeCommandHandler.addEmployees(employees);
      response.status(201).json({
        message: "Employee successfully added",
      });
    } catch (error: any) {
      errorHandler(error, request, response);
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
      errorHandler(error, request, response);
    }
  }

  async getEmployees(request: Request, response: Response) {
    try {
      const page = parseInt(request.query.page as string);
      const limit = parseInt(request.query.pageSize as string);
      const employees = await getEmployeeModel
        .find()
        .limit(limit)
        .skip((page - 1) * limit);

      return response.json({
        data: employees,
      });
    } catch (error: any) {
      errorHandler(error, request, response);
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
      errorHandler(error, request, response);
    }
  }
}

function parseEmployeesWithCSVform(csvString: string) {
  const csv: any[] = Papa.parse(csvString).data;
  return csv.map((employee) => {
    const [name, email, tel, joined] = employee;
    return {
      name: name,
      email: email,
      tel: tel,
      joined: joined,
    };
  });
}

export default new EmployeeController();
