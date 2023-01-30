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


describe("Test the track path of the client", () => {

    test("It should response the code 200 if the track id exists", () => {
        return request(app)
            .get("/track/666")
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    test("It should response the code 200 if the track id exists but has no image", () => {
        return request(app)
            .get("/track/999")
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    test("It should response the code 404 if the track id does not exist", () => {
        return request(app)
            .get("/track/669")
            .then(response => {
                expect(response.statusCode).toBe(404);
            });
    });
});