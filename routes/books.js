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
    });
    // cobsole.log(userWithIssuedBooks);
    const issuedBooks = [];

    // loop through the userWithIssuedBooks array and find the book with the id of each.issuedBook
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

/*
  Route: /books
  Method: POST
  Description: create new book
  Acess:Public
  Parameter: None
  Data : author , name , genre , price , publhisher , id
*/
router.post("/",(req,res)=>{
      const {data} = req.body;

      if(!data){
            return res.status(400).json({
                success:false,
                message:"No data provided",
            });
        }
    
    const userWithSameId = books.find((each)=> each.id === data.id);
    if(userWithSameId){
        return res.status(400).json({
            success:false,
            message:"Book with same id already exists",
        });
    }

    const allBooks = [...books,data];

    return res.status(201).json({
        success:true,
        data:allBooks,
    });

});

/*
  Route: /books/:id
  Method: PUT
  Description: update book by id
  Acess:Public
  Parameter: id
  Data : author , name , genre , price , publhisher , id
*/
router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const bookId = books.find((each)=> each.id === id);
    if(!bookId){
        return res.status(400).json({
            success:false,
            message:"Book with same id does not exists",
        });
    };

    if(!data){
        return res.status(400).json({
            success:false,
            message:"No data provided",
        });
    } 
    
    const updatedBooks = books.map((each)=>{
        if(each.id ===id) {
            return {...each,...data};
        }
        return each;
    });

    return res.status(201).json({
        success:true,
        data:updatedBooks,
    });

});

// default export - means we exporting a single thing
module.exports = router;

// non default export
// module.exports = {router, abc, bla ,bla , bla}


















