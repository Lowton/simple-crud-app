import { NotFoundError } from "./errors/not-found.error.js";

export class Controller {
    constructor(personController) {
        this.personController = personController;
    }

    handleRequest(request, response) {
        if (request.url.startsWith("/person")) {
            this.personController.handleRequest(request, response);
        } else {
            throw new NotFoundError(`Route ${request.url} is not found`);
        }
    }
}