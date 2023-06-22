const express = require('express');
const {users} = require('./data/users.json');

const app = express();

const port = 8081;
app.use(express.json());

app.get("/", (req,res)=>{
    res.status(200).json(
        {
            message: "Connection successful established",
        }
    );
});

/*
  Route: /users
  Method: GET
  Description: Get all the user
  Acess:Public
  Parameter:None
*/

app.get("/users",(req,res)=>{
    res.status(200).json({
        sucess: true,
        data: users,
    });
});


/*
  Route: /users/:id
  Method: GET
  Description: Get the user by id
  Acess:Public
  Parameter:id
*/
app.get("/users/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id == id);
    if(!user){
        return res.status(404).json({
            success: false,
            message :"user not found",
        });
    }
    return res.status(201).json({
        success:true,
        data:user,
    })
})
/*
  Route: /users
  Method: POST
  Description: Create a new user
  Acess:Public
  Parameter: None
*/


app.post("/users",(req,res)=>{

    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

    const user = users.find((each)=> each.id == id);
    if(user){
        return res.status(404).json({
            success: false,
            message :"User already exists with this id",
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });

    return res.status(201).json({
        success:true,
        data:users,
    })

});

/*
  Route: /users/:id
  Method: PUT
  Description: Update the user by id
  Acess:Public
  Parameter: id
*/

app.put("/users/:id",(req,res)=>{{
     const {id} = req.params;
     const {data} = req.body;

     const user = users.find((each)=> each.id == id);
     if(!user) 
        return res.status(404).json({ success: false, message :"user not found", });

    const updatedData = users.map((each)=>{
         if(each.id == id){

            // it will replace the old data with new data 
             return {...each, ...data};
         } 
            return each;
    });

    return res.status(201).json({
        success:true,
        data:updatedData,
    });
 
}});

app.put("/users/:id",(req,res)=>{

});

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

