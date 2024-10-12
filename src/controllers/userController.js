const { userPostHandler } = require("../handlers/userHandler.js");
const { userGetAllHandler } = require("../handlers/userHandler.js");
const { userGetByIdHandler } = require("../handlers/userHandler.js");
const { userPutHandler } = require("../handlers/userHandler.js");
const { userDeleteHandler } = require("../handlers/userHandler.js");



const userPostController = async(req, res) => {
    try {
        const { email, password } = req.body;
        const created = await userPostHandler({ email, password });
        if(!created){
            return res.status(400).json({ success: false, message: "User already exists"});
        }
        return res.status(200).json(created);
    } catch (error) {
        return res.status(200).json({ error: error.message });
    }
};

const userGetAllController = async(req, res) => {
    try {
        const found = await userGetAllHandler();
        return res.status(200).json(found);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

const userGetByIdController = async(req, res) => {
    try {
        const { id } = req.params;
        const found = await userGetByIdHandler(id);
        return res.status(200).json(found);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const userPutController = async(req, res) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;
        const updated = await userPutHandler(id, email, password);
        if(!updated){
            return res.status(404).json({ success: false, message: "User not found" });
        };
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const userDeleteController = async(req, res) => {
    try {
        const { id } = req.params;
        const response = await userDeleteHandler(id);
        if(!response){
            return res.status(404).json({ success: false, message: "User not found" });
        };
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};



module.exports = {
    userPostController,
    userGetAllController,
    userGetByIdController,
    userPutController,
    userDeleteController
};