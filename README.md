# shopify-backend-challenge
TASK: Build an inventory tracking web application for a logistics company. We are looking for a web application that meets the requirements listed below, along with one additional feature, with the options also listed below.

## Tech Stack:
Backend : `Node.js`, `Express.js`
Frontend : `React.js`

## Folder Structure Instructions:
1. `shopify-backend` : contains all the code for backend of the application
2. `inventory-frontend` : contains all the code for the frontend of the application

## Project Execution Instructions:
1. Clone/download the repository
2. Dependencies required : `nodeJS`
  - You can download the relevant nodeJS installer [here](https://nodejs.org/en/download/)
3. Open command prompt in the downloaded repo and enter the following commands :
 1. `cd shopify-backend` : this will take you inside the backend code folder
 2. `npm install` : this will download and install all the dependencies required to run the project
 3. `npm start` : this will start your backend server on PORT 8080
 4. `cd ..` : Go one directory backwards
 5. `cd inventory-frontend` : this will take you to the frontend code
 6. `npm install` : Again, this downloads and installs the dependencies required for the frontend
 7. `npm start` : This starts the server for the frontend code on PORT 3000
4. At the end of all the above steps, you should be able to access the application at the following URL : `http://localhost:3000`
 
## Routing:
1. The following are the routes available for accessing the inventory items :
    GET http://localhost:8080/inventory/items
Returns all the list of items in the inventory stored in MongoDB database

    POST http://localhost:8080/inventory/item
Creates a new inventory item and stores it as a MongoDB collection
    
    PUT http://localhost:8080/inventory/item/:itemId
Updates the inventory item with the `itemId` passed in the request parameter and stores it as a MongoDB collection

    DELETE http://localhost:8080/inventory/item/:itemId
Deletes the item with the `itemId` passed in the request parameter from the MongoDB database
    
2. The following are the routes available for accessing the warehouse    
    GET http://localhost:8080/warehouse/get
Returns all the list of warehouses stored in MongoDB database

    POST http://localhost:8080/warehouse/create
Creates a new warehouse and stores it as a MongoDB collection
