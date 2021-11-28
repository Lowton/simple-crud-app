import axios from "axios";
import { config as loadEnvConfig } from "dotenv";
import { TestFactory } from "../test/test.factory";

loadEnvConfig();

describe("E2E server test", () => {
    const port = process.env.port || 9000;

    it("/person GET should return an empty array", async () => {
        const response = await axios.get(`http://localhost:${port}/person`);

        expect(response.status).toBe(200);
        expect(response.data).toEqual([]);
    });

    it("/person POST should return the created person", async () => {
        const person = TestFactory.personWithoutUuidFrom("Bob", 122, ["slipping"]);
        const response = await axios.post(`http://localhost:${port}/person`, person);

        expect(response.status).toBe(201);
        expect(response.data.id).toBeDefined();
        expect(response.data.name).toBe("Bob");
    });

    it("/person/:id GET should return an existing person", async () => {
        const person = TestFactory.personWithoutUuidFrom("Bob", 122, ["slipping"]);
        const savedPerson = await axios.post(`http://localhost:${port}/person`, person);
        let id = savedPerson.data.id;

        const response = await axios.get(`http://localhost:${port}/person/${id}`);

        expect(response.status).toBe(200);
        expect(response.data.id).toBe(id);
        expect(response.data.name).toBe("Bob");
    });

    it("/person/:id UPDATE should return the updated person", async () => {
        const person = TestFactory.personWithoutUuidFrom("Bob", 122, ["slipping"]);
        const savedPerson = await axios.post(`http://localhost:${port}/person`, person);
        let id = savedPerson.data.id;
        const personToUpdate = TestFactory.personWithoutUuidFrom("Tom", 25, ["reading"]);

        const response = await axios.put(`http://localhost:${port}/person/${id}`, personToUpdate);

        expect(response.status).toBe(200);
        expect(response.data.id).toBe(id);
        expect(response.data.name).toBe("Tom");
    });

    it("/person/:id DELETE should delete the person", async () => {
        const person = TestFactory.personWithoutUuidFrom("Bob", 122, ["slipping"]);
        const savedPerson = await axios.post(`http://localhost:${port}/person`, person);
        let id = savedPerson.data.id;

        const deleteResponse = await axios.delete(`http://localhost:${port}/person/${id}`);

        expect(deleteResponse.status).toBe(204);
    });
});