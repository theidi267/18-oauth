# Lab-18-OAuth
Connecting to Auth0 for Sign In
![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 16: Basic Auth
===

* **Git Hub Repo:** [https://github.com/theidi267/16-basic-authentication](https://github.com/theidi267/16-basic-authentication)
* **Heroku App (auth server):** [https://lab-18-auth-server.herokuapp.com/](https://lab-18-auth-server.herokuapp.com/)
* **Heroku App (web-server):** [https://lab-18-web-server2.herokuapp.com/](https://lab-18-web-server2.herokuapp.com/)

## Overview
This is an app that uses authentication by Auth0. Connecting the user to their google accounts, and allowing then to load up data to AWS.

### Language, Tech/Framework used
- Written in JavaScript with ES6
- Node.js
- Jest
- Eslint
- dotenv
- testing with jest

### Data Models

This api supports a mongoose 'petrobot' model that is represented by the following:
```name: { type:String, required:true },
  species: { type:String, uppercase:true, required:true},
  legs: { type:Number, default:'4'},
  skills: { type:String, uppercase:true, default:'PURR'},
  userid: {type:mongoose.Schema.Types.ObjectId, ref:'users'},
});
```

## Server Endpoints

**POST** `/api/signup`

### https://lab-18-auth-server.herokuapp.com/api/signup
* `POST` request - when a user signs up with username, email and password, it sends back a token for Beareer authorization

- Example
 
 ```
 {"username": "justin", "email": "goat@sheep.com", "password": "foo"}
 ```

- Example for token

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMTg0ZDhmOGRkOWYwZDhlOTk2MmVjMSIsImlhdCI6MTUyODMxOTM3NX0.Pzg_k06Z7wGMi83g4QCM4Nr4AAYy8pinQqlfwj-mFEg
```


**GET** `api/signin`

### https://lab-18-auth-server.herokuapp.com/api/signin

* `GET` request, if hit with Bearer token, user is signed in, otherwise throws error 'bummer'


- Example for error
```
{
    "error": "bummer"
}
```

**GET** `api/v1/petrobots`

### https://lab-18-auth-server.herokuapp.com/api/v1/petrobots

- If hit with bearer token, will return a list of all pet-robots

- Example 

```
[
{
    "legs": 5,
    "skills": "WELDING",
    "_id": "5b18514d62f85dd94bcc91f9",
    "name": "purritron",
    "species": "MECH-CAT",
    "userid": "5b184d8f8dd9f0d8e9962ec1",
    "__v": 0
  },
  {
    "legs": 3,
    "skills": "KNIFE FIGHTING",
    "_id": "5b1851d362f85dd94bcc91fa",
    "name": "W00FPO",
    "species": "DOG-MATIC",
    "userid": "5b184d8f8dd9f0d8e9962ec1",
    "__v": 0
  }
]
```

**GET** `api/v1/petrobots/:id`

### https://lab-18-auth-server.herokuapp.com/api/v1/petrobots/:id

- If hit with a Bearer token, returns the specific pet-robot by id and expands the userid attached to the pet-robot

- Example 

```
{
    "legs": 5,
    "skills": "WELDING",
    "_id": "5b18514d62f85dd94bcc91f9",
    "name": "purritron",
    "species": "MECH-CAT",
    "userid": {
        "pets": [
            "5b18514d62f85dd94bcc91f9",
            "5b1851d362f85dd94bcc91fa"
        ],
        "_id": "5b184d8f8dd9f0d8e9962ec1",
        "username": "justin",
        "email": "goat@sheep.com",
        "password": "$2b$10$gFCcQQPlEMLJg8tfZirp0OFEg23I7sbMFh7V2F7TLTL6m75NolU06",
        "__v": 0
    },
    "__v": 0
}
```

**POST** `api/v1/petrobots`

### https://lab-18-auth-server.herokuapp.com/api/v1/petrobots

- If hit with Bearer token, user is able to create a new instance of pet-robot, and send it to the database.

- Input

```
{"name": "W00FPO", "species": "dog-matic", "legs": 3, "skills": "knife fighting", "userid": "5b184d8f8dd9f0d8e9962ec1"}
```

- Output

```
{
    "_id" : ObjectId("5b1851d362f85dd94bcc91fa"),
    "legs" : 3,
    "skills" : "KNIFE FIGHTING",
    "name" : "W00FPO",
    "species" : "DOG-MATIC",
    "userid" : ObjectId("5b184d8f8dd9f0d8e9962ec1"),
    "__v" : 0
}
```
