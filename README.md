# thevelops-test-back

I did the project using node, express-generator, mongoose, joi, JWT and swagger for api documentation.

The db.js have the configurations of the database. I created a database on mLab (Cloud solution for mongodb), and it's already linked there. Be free to run a local database and change de URL Connection.

/routes/ folder has the routes files.

I developed an middleware to verify the token (JWT), and you can found it in /routes/token.js

users.js route file have auth validations (/login)

You can access full documentation made in swagger accessing (/api/api-docs)

To run, you can just download the dependencies with NPM - npm install - and start the server - npm start.