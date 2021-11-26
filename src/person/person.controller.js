import { METHOD, STATUS } from "../share/constants.js";
import { InvalidDataError } from "../errors/invalid-data.error.js";
import { InternalServerError } from "../errors/internal-server.error.js";
import { NotFoundError } from "../errors/not-found.error.js";

const UUID_PATTERN = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

export class PersonController {
    constructor(service, errorHandler) {
        this.service = service;
        this.errorHandler = errorHandler;
    }

    handleRequest(request, response) {
        const personRoute = request.url.replace("/person", "").replace(/\/$/, "");
        switch (request.method) {
            case METHOD.GET:
                return this.handlePersonGetRequest(response, personRoute);
            case METHOD.POST:
                return this.handlePersonPostRequest(request, response, personRoute);
            case METHOD.PUT:
                return this.handlePersonPutRequest(request, response, personRoute);
            case METHOD.DELETE:
                return this.handlePersonDeleteRequest(request, response, personRoute);
            default:
                throw new InternalServerError(`${request.method} request does not allowed`);
        }
    }

    handlePersonGetRequest(response, route) {
        if (route === "") {
            this.successResponse(response, STATUS.OK, this.service.getPersons());
        } else {
            const id = route.split("/")[1];
            if (UUID_PATTERN.test(id)) {
                this.successResponse(response, STATUS.OK, this.service.getPerson(id));
            } else {
                throw new InvalidDataError(`${id} is not a valid person ID (UUID)`);
            }
        }
    }

    successResponse(response, status, data) {
        response.writeHead(status, { "Content-Type": "application/json" });
        if (!!data) {
            response.write(JSON.stringify(data));
        }
        response.end();
    }

    handlePersonPostRequest(request, response, route) {
        if (route === "") {
            request.on("data", (data) => {
                const person = JSON.parse(data);
                try {
                    this.successResponse(response, STATUS.CREATED, this.service.addPerson(person));
                } catch (error) {
                    this.errorHandler.handleError(response, error);
                }
            });
        } else {
            throw new NotFoundError(`Route ${request.url} that can apply ${request.method} request is not found`);
        }
    }

    handlePersonPutRequest(request, response, route) {
        const id = route.split("/")[1];
        if (UUID_PATTERN.test(id)) {
            request.on("data", (data) => {
                const person = JSON.parse(data);
                console.log(person);
                try {
                    this.successResponse(response, STATUS.CREATED, this.service.updatePerson(id, person));
                } catch (error) {
                    this.errorHandler.handleError(response, error);
                }
            });
        } else {
            throw new InvalidDataError(`${id} is not a valid person ID (UUID)`);
        }
    }

    handlePersonDeleteRequest(request, response, route) {
        const id = route.split("/")[1];
        if (UUID_PATTERN.test(id)) {
            this.service.deletePerson(id);
            this.successResponse(response, STATUS.NO_CONTENT);
        } else {
            throw new InvalidDataError(`${id} is not a valid person ID (UUID)`);
        }
    }
}