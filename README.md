# CLOUDAPPI-Test

Resful API to manage users. Database is done ina MongoDB database.

## Dependencies
- Express
- Mongoose
- Body-parser
- Morgan
- Swagger-ui
- Dotenv
## Development dependencies
- Mocha
- Supertest
- Nodemon

## Run on local enviroment
- Must be have MongoDB running
- Set .env variables
- Clone repository
```sh
   $ git clone https://github.com/valenciafg/cloudappi-test.git
```
- Install dependencies
```sh
   $ npm i
```
- Run
```sh
   $ npm run dev
```

## Run tests
```sh
   $ npm run test
```

## Cloud location
The API is hosted in a EC2 Server
URL: http://18.217.235.43:8080

## End-points documentation:
http://18.217.235.43:8080/api-docs

## Postman tests
https://s3.us-east-2.amazonaws.com/bucket.valenciafg.public/CloudAppi+-+V%C3%ADctor+Valencia.postman_collection.json
