const mongoose = require("mongoose"); 

//mongoose schema and model obj 

const UserSchema = new mongoose.Schema({
    username: String, 
    password: String
}); 

const todoSchema = new mongoose.Schema({
    title: String,  
    description: String, 
    userId: mongoose.Types.ObjectId
}); 

const userModel = mongoose.model("users", UserSchema); 
const todoModel = mongoose.model("todos", todoSchema); 

module.exports = {
    userModel: userModel, 
    todoModel: todoModel
}
