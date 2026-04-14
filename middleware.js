const express = require("express");
const jwt = require("jsonwebtoken"); 

function authmiddleware (req, res, next) {
    const token = req.headers.token; 
    const decoded = jwt.verify(token, "secret123123"); 

    if(decoded.userId){
        // req.userId = parseInt(decoded.userId); 
        req.userId = decoded.userId; 
        next(); 
    } else {
        res.status(403).json({
            message: "token invalid or not found"
        })
    }
}

module.exports = {
    authmiddleware: authmiddleware
}