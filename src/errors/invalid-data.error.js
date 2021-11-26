import { STATUS } from "../share/constants.js";

export class InvalidDataError extends Error {
    constructor(message) {
        super();
        this.errorCode = STATUS.BAD_REQUEST;
        this.message = message;
    }
}