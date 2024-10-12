const { Router } = require("express");
const { userRouter } = require("./userRouter.js");
const { bookRouter } = require("./bookRouter.js");

const router = Router();

router.use("/user", userRouter);
router.use("/book", bookRouter);


module.exports = {
    router
}