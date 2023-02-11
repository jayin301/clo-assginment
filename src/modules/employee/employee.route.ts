import express from "express";
import employeeController from "./employee.controller";
import multer from "multer";
import fs from "fs";
import path from "path";

try {
  fs.readdirSync("uploads");
} catch (err) {
  console.error("uploads 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();

/**
 *  @swagger
 *  tags:
 *    name: Employee
 *    description: API to manage employee infos
 */
/**
 *  @swagger
 *  paths:
 *   /employee:
 *     get:
 *       summary: Lists of employees
 *       tags: [employee]
 *       responses:
 *         "200":
 *           description: Lists of employees.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/employees'
 *     post:
 *       summary: Creates a new book
 *       tags: [Books]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/employees'
 *       responses:
 *         "200":
 *           description: The created book.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/employees'
 */
router.get("/", employeeController.getEmployees);
router.get("/:name", employeeController.getEmployee);
router.post("/", upload.single("file"), employeeController.addEmployees);
router.post("/single", employeeController.addEmployee);

export default router;
