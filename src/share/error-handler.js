export class ErrorHandler {
    handleError(response, error) {
        response.writeHead(error.code, { "Content-Type": "application/json" });
        response.write(JSON.stringify(error));
        response.end();
    }
}
