# To run the app

## Pre-requisites
* Node.js
* Nodemon (\`npm install nodemon -D\` inside the folder)
* MongoDB (optional)

## There are two ways of running the app
- ### With a local MongoDB instance
**This option requires you to have a MongoDB server set up and running.**
1. Write the credentials to your local database in a .env file with the following format:
- DB_CONNECTION_STRING=\<your connection string goes here\>
2. In your terminal, navigate to the \`back-end\` folder and execute the following commands:
- $ npm install
- $ npm start

- ### Without a local MongoDB instance (there is an instance hosted online and the app tries to connect to it by default)
1. Just run:
- $ npm install
- $ npm start
