export default class Artwork {
    id;
    id_museum;
    name;
    author;
    type;
    size;

    constructor(obj){
        this.id = obj.id;
        this.id_museum = obj.id_museum;
        this.name = obj.name;
        this.author = obj.author;
        this.type = obj.type;
        this.size = obj.size;
    }
}