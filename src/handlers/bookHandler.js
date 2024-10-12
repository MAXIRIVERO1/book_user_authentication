const { Book } = require("../db/db.js");





const bookPostHandler = async(title, author, publishedYear, genre) => {
    const created = await Book.create({title, author, publishedYear, genre});
    return created;
};

const bookGetAllHandler = async() => {
    const found = await Book.findAll();
    return found;
};

const bookGetByIdHandler = async(id) => {
    const found = await Book.findByPk(id);
    return found;
};

const bookUpdateHandler = async(id, title, author, publishedYear, genre) => {
    const found = await Book.findByPk(id);
    if(!found){
        return false;
    }
    const updated = await found.update({title, author, publishedYear, genre});
    return updated;
};

const bookDeleteHandler = async(id) => {
    const found = await Book.findByPk(id);
    if(!found){
        return false;
    }
    await found.destroy();
    return "Deletion complete";
};



module.exports = {
    bookPostHandler,
    bookGetAllHandler,
    bookGetByIdHandler,
    bookUpdateHandler,
    bookDeleteHandler
}