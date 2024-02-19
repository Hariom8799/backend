const ToDo = require("../models/todo")

exports.createToDo = async (req,resp)=>{

    try{
        const {title ,description} = req.body;

        const response = await ToDo.create({title,description});

        resp.status(200).json({
            success : true,
            data : response,
            message : "Entry successful created in the database"
        })

    }
    catch(error){
        console.error(error)
        console.log(error)
        resp.status(500).json({
            success :false,
            data : "Internal server error",
            message : error.message
        })
    }
}