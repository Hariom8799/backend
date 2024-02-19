const ToDo = require("../models/todo");

exports.getToDo = async (req,resp)=>{

    try{

        const AllTodos = await ToDo.find({});

        resp.status(200).json({
            success : true,
            data : AllTodos,
            message : "fetched"
        })

    }
    catch(error){
        console.error(error);
        console.log(error);
        resp.status(500).json({
            success : false,
            message : "internal server error",
            error : error.message
        })
    }
    

}