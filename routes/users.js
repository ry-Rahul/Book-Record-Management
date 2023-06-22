const express = require("express");

const {users} = require("../data/users.json");

const router = express.Router();

// all the routes attache with the router variable
/*
  Route: /users
  Method: GET
  Description: Get all the user
  Acess:Public
  Parameter:None
*/

router.get("/",(req,res)=>{
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
router.get("/:id",(req,res)=>{
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


router.post("/",(req,res)=>{

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

router.put("/:id",(req,res)=>{{
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


/*
  Route: /users/:id
  Method: DELETE
  Description: delete the user by id
  Acess:Public
  Parameter: id
*/

router.delete("/:id",(req,res)=>{

    const {id} = req.params;
    const user = users.find((each)=> each.id == id);

    if(!user) 
        return res.status(404).json({ success: false, message :"user not found", });

    const index = users.indexOf(id);
    users.splice(index,1);

    return res.status(201).json({ success: true, data:users, });
});

module.exports = router;












