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
        this.validate(person);
        return this.repository.addPerson(person);
    }

    updatePerson(id, person){
        this.validate(person);
        return this.repository.updatePerson({ id, ...person });
    }

    deletePerson(person){
        return this.repository.deletePerson(person);
    }

    validate(person) {
        if (!person.name) {
            throw new InvalidDataError("Person should have a name");
        }
        if (typeof person.name !== "string") {
            throw new InvalidDataError("Person's name should be a string");
        }
        if (!person.age) {
            throw new InvalidDataError("Person should have an age");
        }
        if (typeof person.age !== "number") {
            throw new InvalidDataError("Person's age should be a number");
        }
        if (!person.hobbies) {
            throw new InvalidDataError("Person should have hobbies");
        }
        if (!Array.isArray(person.hobbies)) {
            throw new InvalidDataError("Person's hobbies should be an array");
        }
        return true;
    }
}