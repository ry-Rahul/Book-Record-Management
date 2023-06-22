# Book-Record-Management

This is a book record management API Backend for the management fo records and books

# Routes and Endpoints

## / users
POST: Create a new user
GET: Get all list of user

## /user/{id}
GET: Get a user by id
PUT: Update a user by id
DELETE: Delete a user by id(check if he still has an issued book or not )

## /users/subscription-details/{id}
GET: Get user subscription details
1. Date of subscription
2. Valid till
3. Fine if any

## /books
GET: Get all books
POST: Create/Add a new book

## /books/{id}
Get: Get a book by id
PUT: Update a book by id

## /books/issued
GET: Get all issued books

## /books/issued/withFine
GET: Get all issued books with fine 

# Subscription Types
Basic (3 months)
Standard (6 months)
Premium (12 months)

if the subscription date is 21/06/23
and subscription type is standard
the value till date will be 21/12/23

if he has an issued book and the isseud book  is to be returned at 21/11/23 
if he missee  the date of return, then he gets a fine of Rs. 100./

if he has an issued boook and the  issued book is to be returned at 21/12/23 if he missed the date of return, and his subscription also expire then he will get fine fo Rs 200./

//npm i nodemon --save-dev its mean install only for devlopment not for production