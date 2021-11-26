import { Controller } from "./controller.js";
import { PersonRepository } from "./person/person.repository.js";
import { PersonService } from "./person/person.service.js";
import { PersonController } from "./person/person.controller.js";
import { ErrorHandler } from "./share/error-handler.js";

export class ServerContext {
    static getController() {
        return new Controller(this.getPersonController());
    }

    static getErrorHandler() {
        return new ErrorHandler();
    }

    static getPersonController() {
        return new PersonController(this.getPersonService(), this.getErrorHandler());
    }

    static getPersonService() {
        return new PersonService(this.getPersonRepository());
    }

    static getPersonRepository() {
        return new PersonRepository([]);
    }
}