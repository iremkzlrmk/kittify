const request = require("supertest");
const app = require("../src/server-app.js");

describe("Test the root path of the server", () => {
    test("It should response the GET method", () => {
        return request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });
});