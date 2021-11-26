import { createServer } from "http";
import { config as loadEnvConfig } from "dotenv";
import { ServerContext } from "./server-context.js";

loadEnvConfig();

const controller = ServerContext.getController();
const errorHandler = ServerContext.getErrorHandler();

const server = createServer((req, res) => {
    try {
        controller.handleRequest(req, res);
    } catch (error) {
        errorHandler.handleError(res, error);
    }
});

server.listen(process.env.port, () => {
    console.log(`Server running on Port ${process.env.port}`);
});
