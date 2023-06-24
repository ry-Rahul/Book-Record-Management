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


/*
  Route: /users/subscription-details/:id
  Method: GET
  Description: get all user subscription details by id
  Acess:Public
  Parameter: id
*/
router.get("/subscription-details/:id",(req,res)=>{
     const {id} = req.params;

     const user = users.find((each)=> each.id == id);

     if(!user) 
        return res.status(404).json({ success: false, message :"user not found", });

    // Function to get the date in days
     const getDateInDays = (data = "")=>{
        let date;
        if(data === ""){
            // current date
            date = new Date();
          }else{
            // getting date on the basis of data variable
            date = new Date(data);
       }

    //    getting the difference between the current date and the date passed in the function
       let days = Math.floor((date / (1000 * 60 * 60 * 24))); 

         return days;


    }


    // getting the subscription details of the user
    const subscriptionType = (date)=>{
      if(users.subscriptionType === "Basic"){
        date = date +90;
      }else if(users.subscriptionType === "Standard"){
        date = date + 180;
      } else if(users.subscriptionType === "Premium"){
        date = date + 365;
      }

        return date;  
    }

    // subscription expiration calculation
    // january 1, 1970, UTC.// milliseconds
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {

        ...user,

        subscriptionExpired: 
              subscriptionExpiration < currentDate ? true : false,

        daysLeftForExpiration: 
              subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,

        fine: 
             returnDate < currentDate 
                ? subscriptionExpiration <= currentDate
                  ?200
                  :100
                :0, 
    };
   
     return res.status(201).json({
        success:true,
        data,
     });

});

module.exports = router;












