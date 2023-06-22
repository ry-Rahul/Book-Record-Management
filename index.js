const express = require('express');
const {users} = require('./data/users.json');
const usersRouter = require('./routes/users.js')
const booksRouter = require('./routes/books.js')

const app = express();

const port = 8081;

app.get("/", (req,res)=>{
    res.status(200).json(
        {
            message: "Connection successful established",
        }
        );
});

app.use(express.json());

// i want to use this routes in this application
app.use("/users",usersRouter);
app.use("/books",booksRouter);


app.all("*", (req,res)=>{
    res.status(501).json(
        {
            message: "This Route is not yet defined!",
        }
    );
 });

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});