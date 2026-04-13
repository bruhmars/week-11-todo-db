const express = require("express"); 
const {authmiddleware} = require("./middleware");
const jwt = require("jsonwebtoken"); 
const app = express(); 
app.use(express.json()); 

let CURRENT_USER_ID = 1; 
let CURRENT_TODO_ID = 1; 

let USERS = []; 
let TODOS = []; 

app.post("/signup", (req, res) => {
    const username = req.body.username; 
    const password = req.body.password; 

    const existingUser = USERS.find(u => u.username === username); 
    if(existingUser) {
        return res.status(403).json({
            message: "user already exists"
        })
    }
    USERS.push({
        id: CURRENT_USER_ID++, 
        username, 
        password
    })
    res.json({
        id: CURRENT_USER_ID - 1
    })
})

app.post("/signin", (req,res) => {
    const username = req.body.username; 
    const password = req.body.password; 

    const existingUser =  USERS.find(u => u.username === username && u.password === password); 
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

app.post("/todo", authmiddleware, (req,res) => {
    const userId = req.userId; 
    const title = req.body.title; 
    const description = req.body.description; 

    TODOS.push({
        id: CURRENT_TODO_ID++, 
        title: title, 
        description: description, 
        userId: userId
    })
    res.json({
        message: "todo added"
    })
})

app.get("/todos", authmiddleware, (req, res) => {
    const userId = req.userId; 
    const userTodos = TODOS.filter(t => t.userId === userId); 
    res.json({
        todos: userTodos
    })
})

app.delete("/todo/:todoId", authmiddleware, (req, res) => {
    const userId = req.userId; 
    const todoId = parseInt(req.params.todoId); 

    TODOS = TODOS.filter(t => t.userId === userId && t.id === todoId); 
    res.json({
        message: "todo deleted"
    })

})

app.listen(3000); 