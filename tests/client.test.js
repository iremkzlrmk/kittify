const request = require("supertest");
const app = require("../src/client-app.js");

describe("Test the root path of the client", () => {
    test("It should response the GET method", () => {
        return request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });
});