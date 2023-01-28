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

describe("Test the tracks path of the server", () => {
    test("It should response the code 200 if the track id exists", () => {
        return request(app)
            .get("/tracks/666")
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    test("It should response the code 200 if the track id exists", () => {
        return request(app)
            .get("/tracks/666")
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

});