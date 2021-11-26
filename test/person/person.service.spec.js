import { PersonService } from "../../src/person/person.service.js";
import { TestFactory } from "../test.factory.js";

describe("Person service", () => {
    const service = new PersonService();

    describe("validation check", () => {
        it("should be okay", () => {
            const person = TestFactory.personFrom();

            expect(service.validate(person)).toBeTruthy();
        });

        it("should throw an expected name error", () => {
            const brokenPerson = {age: 12, hobbies: []};

            expect(() => service.validate(brokenPerson)).toThrow("Person should have a name");
        });

        it("should throw an expected string name error", () => {
            const brokenPerson = {name: 10, age: 12, hobbies: []};

            expect(() => service.validate(brokenPerson)).toThrow("Person's name should be a string");
        });

        it("should throw an expected name error", () => {
            const brokenPerson = {name: "Bob", hobbies: []};

            expect(() => service.validate(brokenPerson)).toThrow("Person should have an age");
        });

        it("should throw an expected string name error", () => {
            const brokenPerson = {name: "Bob", age: "12", hobbies: []};

            expect(() => service.validate(brokenPerson)).toThrow("Person's age should be a number");
        });

        it("should throw an expected name error", () => {
            const brokenPerson = {name: "Bob", age: 1};

            expect(() => service.validate(brokenPerson)).toThrow("Person should have hobbies");
        });

        it("should throw an expected string name error", () => {
            const brokenPerson = {name: "Bob", age: 1, hobbies: "slipping"};

            expect(() => service.validate(brokenPerson)).toThrow("Person's hobbies should be an array");
        });
    });
});
