const express = require("express");

const router = express.Router();

const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

/*
  Route: /books
  Method: GET
  Description: get all books
  Acess:Public
  Parameter:None
*/

router.get("/",(req,res)=>{
    res.status(200).json({
        sucess: true,
        data: books,
    });
});

/*
  Route: /books/:id
  Method: GET
  Description: get all books by id
  Acess:Public
  Parameter:id
*/

router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=> each.id === id);
    
    if(!book){
        return res.status(401).json({
            success:false,
            message:"Book not found",
        });
    }
    return res.status(201).json({
        success:true,   
        data:book,
    })
});
 
/*
  Route: /books/issued/books
  Method: GET 
  Description: get all issued books 
  Acess:Public
  Parameter: None
*/
router.get("/issued/by-user",(req,res)=>{

    const userWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook)  return each;
    })

    const issuedBooks = [];

    userWithIssuedBooks.forEach((each) => {
        const book = books.find((book)=> book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);


    });

    if(issuedBooks.length == 0){
        return res.status(404).json({
            success:false,
            message:"No book issued yet",
        });
    }
    
    return res.status(201).json({
        success:true,
        data:issuedBooks,
    });

});

// default export - means we exporting a single thing
module.exports = router;

// non default export
// module.exports = {router, abc, bla ,bla , bla}


















