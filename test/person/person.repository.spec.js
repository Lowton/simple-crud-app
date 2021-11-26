import { TestFactory } from "../test.factory.js";
import { PersonRepository } from "../../src/person/person.repository.js";

describe("PersonRepository", () => {
    it("should return all persons", () => {
        const persons = [
            TestFactory.personFrom("John", 44, ["reading"]),
            TestFactory.personFrom("Anne", 22, ["reading", "jogging"]),
            TestFactory.personFrom("Bob", 35),
        ];

        const repository = new PersonRepository(persons);

        expect(repository.getPersons()).toHaveLength(3);
        expect(repository.getPersons()[0].age).toBe(44);
        expect(repository.getPersons()[1].hobbies).toHaveLength(2);
        expect(repository.getPersons()[1].hobbies).toContain("jogging");
        expect(repository.getPersons()[2].name).toBe("Bob");
    });

    describe("get person", () => {
        it("should return a person", () => {
            const person = TestFactory.personFrom();

            const repository = new PersonRepository([person]);

            expect(repository.getPerson(person.id)).toBeDefined();
            expect(repository.getPerson(person.id).name).toBe("Maxwell Smart");
            expect(repository.getPerson(person.id).age).toBe(32);
            expect(repository.getPerson(person.id).hobbies).toContain("detective");
        });

        it("should throw a not found error", () => {
            const repository = new PersonRepository([]);

            expect(() => repository.getPerson(123)).toThrow("Person with id 123 does not exist");
        });
    })
});