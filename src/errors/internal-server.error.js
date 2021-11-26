import { STATUS } from "../share/constants.js";

export class InternalServerError extends Error {
    constructor(message) {
        super();
        this.errorCode = STATUS.INTERNAL_SERVER_ERROR;
        this.message = message;
    }
}