const express = require("express");
const router = express.Router();

const {createToDo} = require("../controllers/createTodo");
const {getToDo} = require("../controllers/getToDo")

router.post("/createtodo" , createToDo);
router.get("/gettodo",getToDo);

module.exports = router;