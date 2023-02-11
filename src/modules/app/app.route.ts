import express from "express";
import EmployeeRoute from "../employee/employee.route";

/**
 * @swagger
 * tags:
 *  name: employees
 *  description: employee management
 */

const router = express.Router();

const defaultRoutes = [
  {
    path: "/employee",
    route: EmployeeRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
