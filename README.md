<h1 align="center">
🌐 MERN Stack
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>

<p align="center">
   <a href="https://github.com/amazingandyyy/mern/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
   <a href="https://circleci.com/gh/amazingandyyy/mern">
      <img src="https://circleci.com/gh/amazingandyyy/mern.svg?style=svg" />
   </a>
</p>

> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.

Getting Started
To get start project, follow these instructions:

## clone or download

```terminal
$ git clone <https://github.com/NguyenNgocBaoITITIU19084/Thesis_MERN_REC_SYS.git>
```

## project structure

```terminal
LICENSE
package.json
backend/
   package.json
   .env (to create .env, check [prepare your secret session])
frontend/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites

- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## frontend-side usage(PORT: 3000)

```terminal
$ cd frontend          // go to frontend folder
$ yarn # or npm i    // npm install packages
$ npm run dev        // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 5000)

### Prepare your secret

run the script at the first level:

(You need to add a JWT_SECRET in .env to connect to MongoDB this is an example of env file)

```terminal
PORT = 5000
Mongoose_URL = "mongodb://127.0.0.1:27017/example"

#Email config
EMAIL="example@gmail.com"
PASSWORD="bjcitnmzoxesneif"
SMPT_HOST=smtp.gmail.com
SMPT_PORT=587
SMPT_SERVICE=false

#jsonwebtoken connfig
JWT_SECRET_KEY=example
JWT_EXPIRES_ACCESS=7d
JWT_SECRET_KEY_REFESH=example
JWT_EXPIRES_REFESH=7d

#Cloudinary Config
CLOUDINARY_NAME = example
CLOUDINARY_API_KEY = example
CLOUDINARY_API_SECRET = example

#STRIPE Config
STRIPE_SECRECT_KEY=example
STRIPE_PUBLIC_KEY=example
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm run dev // run it locally
```
