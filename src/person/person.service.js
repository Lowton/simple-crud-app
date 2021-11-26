import { InvalidDataError } from "../errors/invalid-data.error.js";

export class PersonService {
    constructor(repository) {
        this.repository = repository;
    }

    getPersons(){
        return this.repository.getPersons();
    }

    getPerson(id){
        return this.repository.getPerson(id);
    }

    addPerson(person){
        this.validatePerson(person);
        return this.repository.addPerson(person);
    }

    updatePerson(person){
        this.validatePerson(person);
        return this.repository.updatePerson(person);
    }

    deletePerson(person){
        return this.repository.deletePerson(person);
    }

    validatePerson(person) {
        if (!person.name) {
            throw new InvalidDataError("Person should have a name");
        }
        if (typeof person.name !== "string") {
            throw new InvalidDataError("Person name should be a string");
        }
        if (!person.age) {
            throw new InvalidDataError("Person should have an age");
        }
        if (typeof person.age !== "number") {
            throw new InvalidDataError("Person age should be a number");
        }
        if (!person.hobbies) {
            throw new InvalidDataError("Person should have a hobbies");
        }
        if (!Array.isArray(person.hobbies)) {
            throw new InvalidDataError("Person hobbies should be an array");
        }
    }
}