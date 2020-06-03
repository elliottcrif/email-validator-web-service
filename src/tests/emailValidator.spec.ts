import test, { Test } from "blue-tape";
import { app } from "../server";
import { uniqueEmails } from "../util";
import request from "supertest";

test("Email Validator should return number of unique emails", async (t: Test) => {
  let emails = [
    "test.email@gmail.com",
    "test.email+spam@gmail.com",
    "testemail@gmail.com",
  ];

  t.equal(uniqueEmails(emails), 1, "should be 1 unique email");
});

test("Email Validator Route", async (t: Test) => {
  let emails = [
    "test.email@gmail.com",
    "test.email+spam@gmail.com",
    "testemail@gmail.com",
  ];

  t.doesNotThrow(
    () =>
      request(app)
        .post("/email-validation")
        .send({ emails })
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          t.equal(res.body.uniqueEmails, 1, "should be 1 unique email");
        }),
    "Route returns correct result"
  );
});
