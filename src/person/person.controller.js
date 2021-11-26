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
                return this.handlePersonDeleteRequest(response, personRoute);
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
            response.end(JSON.stringify(data));
        } else {
            response.end();
        }
    }

    async handlePersonPostRequest(request, response, route) {
        if (route === "") {
            const person = await this.getRequestData(request);
            try {
                this.successResponse(response, STATUS.CREATED, this.service.addPerson(person));
            } catch (error) {
                this.errorHandler.handleError(response, error);
            }
        } else {
            throw new NotFoundError(`Route ${request.url} that can apply ${request.method} request is not found`);
        }
    }

    async handlePersonPutRequest(request, response, route) {
        const id = route.split("/")[1];
        if (UUID_PATTERN.test(id)) {
            const person = await this.getRequestData(request);
            try {
                this.successResponse(response, STATUS.OK, this.service.updatePerson(id, person));
            } catch (error) {
                this.errorHandler.handleError(response, error);
            }
        } else {
            throw new InvalidDataError(`${id} is not a valid person ID (UUID)`);
        }
    }

    handlePersonDeleteRequest(response, route) {
        const id = route.split("/")[1];
        if (UUID_PATTERN.test(id)) {
            this.service.deletePerson(id);
            this.successResponse(response, STATUS.NO_CONTENT);
        } else {
            throw new InvalidDataError(`${id} is not a valid person ID (UUID)`);
        }
    }

    getRequestData(request) {
        return new Promise(((resolve, reject) => {
            try {
                let body = "";
                request.on("data", (chunk) => body += chunk.toString());
                request.on("end", () => resolve(JSON.parse(body)));
            } catch (error) {
                reject(error);
            }
        }));
    }
}