import mongoose from "mongoose";
import request from "supertest";
import app from "../../..";
import dotenv from "dotenv";
dotenv.config();

beforeAll(async () => {
  const Employee = mongoose.model("Employee");
  await Employee.deleteMany();
});
afterAll(async () => {
  const Employee = mongoose.model("Employee");
  await Employee.deleteMany();
});

describe("GET /employee", () => {
  test("employee 리스트 불러오기", (done) => {
    request(app).get("/api/employee").expect(200, done);
    done();
  });
});

describe("POST /employee/single", () => {
  test("add single employee to DB and get from name", (done) => {
    request(app)
      .post("/api/employee/single")
      .send({
        name: "employee1",
        email: "employee1@test.com",
        tel: "010-1234-1234",
        joined: "2022-10-10",
      })
      .then(() => {
        request(app)
          .get("/api/employee/employee1")
          .then((response) => {
            expect(response.body.data["name"]).toBe("employee1");
          });
      });
    done();
  });
});

describe("POST /employee", () => {
  test("add multiple employees from plain-text", (done) => {
    request(app)
      .post("/api/employee")
      .send({
        employees:
          "김철수,charles@clovf.com,01075312468,2018.03.07\n박영희,matilda@clovf.com,01087654321,2021.04.28\n홍길동,kildong.hong@clovf.com,01012345678,2015.08.15",
      })
      .then(() => {
        request(app)
          .get("api/employee")
          .then((response) => {
            expect(response.body.data.length).toBe(3);
          });
      });
    done();
  });
});
