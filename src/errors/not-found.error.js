import { STATUS } from "../share/constants.js";

export class NotFoundError extends Error {
    constructor(message) {
        super();
        this.code = STATUS.NOT_FOUND;
        this.message = message;
    }
}