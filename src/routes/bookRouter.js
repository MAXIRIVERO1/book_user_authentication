const { verifyToken } = require("../authentication/verifyToken.js");
const { bookPostController } = require("../controllers/bookController.js");
const { bookGetAllController } = require("../controllers/bookController.js");
const { bookGetByIdController } = require("../controllers/bookController.js");
const { bookUpdateController } = require("../controllers/bookController.js");
const { bookDeleteController } = require("../controllers/bookController.js");


const bookRouter = require("express").Router();

bookRouter.use(verifyToken);

bookRouter.post("/create", bookPostController);
bookRouter.get("/getAll", bookGetAllController);
bookRouter.get("/:id", bookGetByIdController);
bookRouter.put("/update/:id", bookUpdateController);
bookRouter.delete("/delete/:id", bookDeleteController);




module.exports = {
    bookRouter
}