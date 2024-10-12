const { bookPostHandler } = require("../handlers/bookHandler.js");
const { bookGetAllHandler } = require("../handlers/bookHandler.js");
const { bookGetByIdHandler } = require("../handlers/bookHandler.js");
const { bookUpdateHandler } = require("../handlers/bookHandler.js");
const { bookDeleteHandler } = require("../handlers/bookHandler.js");



const bookPostController = async(req, res) => {
    try {
        const { title, author, publishedYear, genre } = req.body;
        const created = await bookPostHandler(title, author, publishedYear, genre);
        return res.status(200).json(created);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const bookGetAllController = async(req, res) => {
    try {
        const found = await bookGetAllHandler();
        return res.status(200).json(found);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const bookGetByIdController = async(req, res) => {
    try {
        const { id } = req.params;
        const found = await bookGetByIdHandler(id);
        if(!found){
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        return res.status(200).json(found);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const bookUpdateController = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishedYear, genre } = req.body;
        const updated = await bookUpdateHandler(id, title, author, publishedYear, genre);
        if(!updated){
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const bookDeleteController = async(req, res) => {
    try {
        const { id } = req.params;
        const response = await bookDeleteHandler(id);
        if(!response){
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};





module.exports = {
    bookPostController,
    bookGetAllController,
    bookGetByIdController,
    bookUpdateController,
    bookDeleteController
}