import Joi from "joi";
import { AddEmployeeDTO } from "./employee.types";

export const addEmployeeValidator = (requestData: AddEmployeeDTO): void => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    tel: Joi.string().required(),
    joined: Joi.string().required(),
  });
  const isValiateResult: Joi.ValidationResult = schema.validate(requestData);
  if (isValiateResult?.error) {
    throw new Error(`${isValiateResult.error?.message}`);
  }
};

export const addEmployeesValidator = async (
  requestData: AddEmployeeDTO[]
): Promise<void> => {
  await Promise.all(requestData.map((data) => addEmployeeValidator(data)));
};
