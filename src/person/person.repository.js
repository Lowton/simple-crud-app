import { v4 as uuid } from 'uuid';
import { NotFoundError } from "../errors/not-found.error.js";

export class PersonRepository {
    constructor(storage) {
        this.storage = storage;
    }

    getPersons() {
        return this.storage;
    }

    getPerson(id) {
        const person = this.storage.find(p => p.id === id);
        if (!!person) {
            return person;
        } else {
            throw new NotFoundError(`Person with id ${id} does not exist`);
        }
    }

    addPerson(person) {
        person.id = uuid()
        this.storage.push(person);
    }

    updatePerson(person) {
        this.deletePerson(person.id);
        this.storage.push(person);
    }

    deletePerson(id) {
        if (!!this.getPerson(id)) {
            this.storage = this.storage.filter(person => person.id !== id);
        }
    }
}