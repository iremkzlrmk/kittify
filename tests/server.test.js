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

describe("Test the track path of the server", () => {

    test("It should response the code 200 if the track id exists", () => {
        return request(app)
            .get("/track/666")
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


describe("Test the image path of the server", () => {

    test("It should response the code 200 if the track id exists and has an image", () => {
        return request(app)
            .get("/image/666")
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    test("It should response the code 200 if the track id exists and doesn't have an image", () => {
        return request(app)
            .get("/image/999")
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    test("It should response the code 404 if the track id does not exist", () => {
        return request(app)
            .get("/image/669")
            .then(response => {
                expect(response.statusCode).toBe(404);
            });
    });
});


describe("Test the audio path of the server", () => {

    test("It should response the code 200 if the track id exists", () => {
        return request(app)
            .get("/audio/666")
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    test("It should response the code 404 if the track id does not exist", () => {
        return request(app)
            .get("/audio/669")
            .then(response => {
                expect(response.statusCode).toBe(404);
            });
    });
});