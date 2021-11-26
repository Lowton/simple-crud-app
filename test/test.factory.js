import { v4 as uuid } from 'uuid';

export class TestFactory {
    static personFrom(name, age, hobbies) {
        return this.personWithUuidFrom(this.anyUuid(), name, age, hobbies);
    }

    static personWithUuidFrom(uuid, name, age, hobbies) {
        return {
            id: uuid,
            ...this.personWithoutUuidFrom(name, age, hobbies),
        };
    }

    static personWithoutUuidFrom(name, age, hobbies) {
        return {
            name: name || "Maxwell Smart",
            age: age || 32,
            hobbies: hobbies?.length > 0 ? hobbies : ["detective"],
        };
    }

    static anyUuid() {
        return uuid();
    }
}