export interface IEmployee {
  name: string;
  email: string;
  tel: string;
  joined: string;
}

export interface AddEmployeeDTO {
  name: string;
  email: string;
  tel: string;
  joined: string;
}

export interface IEmployeeCommand extends IEmployee {
  command: string;
}
