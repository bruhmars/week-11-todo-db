const express = require("express"); 
const {authmiddleware} = require("./middleware");
const jwt = require("jsonwebtoken"); 
const  {todoModel, userModel} = require("./models"); 

const app = express(); 
app.use(express.json()); 

// let CURRENT_USER_ID = 1; 
// let CURRENT_TODO_ID = 1; 

// let USERS = []; 
// let TODOS = []; 

app.post("/signup", async (req, res) => {
    const username = req.body.username; 
    const password = req.body.password; 

    // const existingUser = USERS.find(u => u.username === username); 
    const existingUser = await userModel.findOne({ //db requests
        username: username, 
        password: password
    }); 
    
    if(existingUser) {
        return res.status(403).json({
            message: "user already exists"
        })
    }
    // USERS.push({
    //     id: CURRENT_USER_ID++, 
    //     username, 
    //     password
    // })
    const newUser = await userModel.create({
        username: username, 
        password: password
    })
    res.json({
        id: newUser._id
    })
})

app.post("/signin", async (req,res) => {
    const username = req.body.username; 
    const password = req.body.password; 

    const existingUser = await userModel.findOne({
        username: username, 
        password: password 
    });  //USERS.find(u => u.username === username && u.password === password); 
    if(!existingUser){
        res.status(403).json({
            message: "incorrect credentials"
        })
        return
    }
    const token = jwt.sign({
        userId: existingUser.id
    }, "secret123123"); 

    res.json({
        token
    })
})

app.post("/todo", authmiddleware, async (req,res) => {
    const userId = req.userId; 
    const title = req.body.title; 
    const description = req.body.description; 

    //todomodel.create 
    // TODOS.push({
    //     id: CURRENT_TODO_ID++, 
    //     title: title, 
    //     description: description, 
    //     userId: userId
    // })
    const newTodo = await todoModel.create({
        title: title, 
        description: description, 
        userId: userId
    })
    res.json({
        message: "todo added"
    })
})

app.get("/todos", authmiddleware, async (req, res) => {
    const userId = req.userId; 
    const userTodos = await todoModel.find({
        userId: userId
    }); //TODOS.filter(t => t.userId === userId); 
    res.json({
        todos: userTodos
    })
})

app.delete("/todo/:todoId", authmiddleware, async (req, res) => {
    const userId = req.userId; 
    // const todoId = parseInt(req.params.todoId); 
    const todoId = req.params.todoId; 
    await todoModel.deleteOne({
        _id: todoId, 
        userId: userId
    });  //TODOS.filter(t => t.userId === userId && t.id === todoId); 
    res.json({
        message: "todo deleted"
    })

})

app.listen(3000); 