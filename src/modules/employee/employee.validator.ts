import Joi from "joi";
import { AddEmployeeDTO } from "./employee.types";
import logger from "../../config/logger";
import { BadRequestError } from "../app/errorHandler";
import getEmployeeModel from "./models/getEmployee";

export const addEmployeeValidator = async (
  requestData: AddEmployeeDTO
): Promise<void> => {
  const schema = Joi.object().keys({
    name: Joi.string().required().invalid(null),
    email: Joi.string().email().required().invalid(null),
    tel: Joi.string().required().invalid(null),
    joined: Joi.string().required().invalid(null),
  });

  const employee = await getEmployeeModel
    .findOne({ name: requestData.name })
    .lean();
  if (employee)
    throw new BadRequestError(
      `user with name:${requestData.name} is already exists`
    );

  const isValiateResult: Joi.ValidationResult = schema.validate(requestData);
  if (isValiateResult?.error) {
    throw new BadRequestError(`${isValiateResult.error?.message}`);
  }
};

export const addEmployeesValidator = async (
  requestData: AddEmployeeDTO[]
): Promise<void> => {
  await Promise.all(requestData.map((data) => addEmployeeValidator(data)));
};
