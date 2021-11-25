import { createServer } from "http";
import {config as envConfig } from "dotenv";

envConfig();

const server = createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.write(JSON.stringify(JSON.stringify({ message: "Hello World!" })))
    res.end()
});

server.listen(process.env.port, () => {
    console.log(`Server running on Port 9000`)
})