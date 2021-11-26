import { METHOD, STATUS } from "../share/constants.js";
import { InvalidDataError } from "../errors/invalid-data.error.js";

const UUID_PATTERN = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

export class PersonController {
    constructor(service) {
        this.service = service;
    }

    handleRequest(request, response) {
        const personRoute = request.url.replace("/person", "").replace(/\/$/, "");
        switch (request.method) {
            case METHOD.GET:
                return this.handlePersonGetRequest(response, personRoute);
            case METHOD.POST:
                return this.handlePersonPostRequest(response, personRoute);
            case METHOD.PUT:
                return this.handlePersonPutRequest(response, personRoute);
            case METHOD.DELETE:
                return this.handlePersonDeleteRequest(response, personRoute);
        }
    }

    handlePersonGetRequest(response, route) {
        if (route === "") {
            this.successResponse(response, this.service.getPersons());
        }
        const id = route.split("/")[1];
        if (UUID_PATTERN.test(route)) {
            this.successResponse(response, this.service.getPerson(id));
        } else {
            throw new InvalidDataError(`${id} is not a valid person ID`);
        }
    }

    successResponse(response, data) {
        response.writeHead(STATUS.OK, { "Content-Type": "application/json" });
        response.write(JSON.stringify(data));
        response.end();
    }

    handlePersonPostRequest() {
        return undefined;
    }

    handlePersonPutRequest(response, route) {
        return undefined;
    }

    handlePersonDeleteRequest(response, route) {

    }
}