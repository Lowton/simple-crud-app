export class PersonService {
    constructor(repository) {
        this.repository = repository;
    }

    getPersons(){
        return this.repository.getPersons();
    }

    getPerson(id){
        return this.repository.getPerson(id);
    }
}