# To run the app

## Pre-requisites
* Node.js
* MongoDB (optional)

## There are two ways of running the app
- ### With a local MongoDB instance
**This option requires you to hava a MongoDB server set up and running.**
1. Write the credentials to your local database in a .env file with the following format:
- DB_CONNECTION_STRING=<your connection string goes here>
2. In your terminal, navigate to the `back-end` folder and execute the following command:
- $ npm start

- ### Without a local MongoDB instance
1. Just run:
- $ npm start
