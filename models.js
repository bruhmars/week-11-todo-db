const mongoose = require("mongoose"); 

mongoose.connect("mongodb+srv://duckymars69_db_user:WK3UiDgv786ATpxp@trelloff.funo5es.mongodb.net/todo"); 

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