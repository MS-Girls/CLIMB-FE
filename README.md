# CLIMB FRONTEND

## Steps to Set up the Development Server

This project uses ASP.NET Core for the frontend. There are two methods that you could use to set up the development environment. One is to set up the environment locally in your machine which requires certain pre-requisites to be installed on your machine. The Second method is to use docker. The following are the steps outlined to do the same.

## Local Development Environment

### Pre-requisites

1. [**Node.js**](https://nodejs.org/en/download): A JavaScript runtime environment

2. [**NPM**](https://www.npmjs.com/): Node Package Manager to install packages. *Please Note that installing Node.js automatically installs NPM on your machine*

3. [**Git**](https://git-scm.com/downloads): To clone the repository and for Version Control

### Steps

1. First Make sure that the above pre-requisites are installed successfully, by typing the following commands on the command line

```shell
node -v
npm -v
git -v
```

2. Clone the repository

```shell
git clone https://github.com/MS-Girls/CLIMB-FE
```

3. Navigate to the frontend directory and install the packages

```shell
cd CLIMB-FE
npm install
```

4. Set up environment variables

Create a ```.env``` file and the add the following environment variables

```shell
NEXT_PUBLIC_BACKEND_URL=
```

5. To Start the server for development execute

```shell
npm run dev
```

6. To Start the server for production execute

```shell
npm run build
npm run start
```

7. Navigate to your browser hit [```http://localhost:3000```](http://localhost:3000) to access your frontend


## Using Docker

### Pre-requisites

1. Just make sure that [**docker**](https://www.docker.com/get-started/) is installed your system by typing the command ```docker -v``` on your command line

2. Also you require [**Git**](https://git-scm.com/downloads) to be installed inorder to clone the repository

### Steps

1. Clone the repository and navigate to the frontend

```shell
git clone https://github.com/MS-Girls/CLIMB-FE
cd CLIMB-FE
```

2. Set up environment variables

Create a ```.env``` file and set up the environment variables

3. To build docker image and start the container execute

```shell
docker build -t CLIMB-frontend:latest .
docker run -d -p 3000:3000 --env-file .env  --name CLIMB-frontend CLIMB-frontend:latest
```

4. Navigate to your browser hit [```http://localhost:3000```](http://localhost:3000) to access your frontend