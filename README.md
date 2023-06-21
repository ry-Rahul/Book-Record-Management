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



