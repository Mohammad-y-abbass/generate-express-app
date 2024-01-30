# 🚀 rapid-express - Express App Generator CLI 🚀

Are you tired of writing the same code in every project? Don't worry, I've got you covered.

## Introduction

Welcome to rapid-express, your go-to tool for rapidly generating Express.js applications with ease. rapid-express simplifies the process of setting up a new Express.js project by providing a command-line interface that automates the creation of a boilerplate Express.js application with a predefined folder structure, middleware setup, error handling, and database configuration.

## Installation

First navigate to the directory where you want to create your project.
Then run `npm i @mohammad-abbass/rapid-express` to install it globally.

## Usage

First navigate to the directory that you want to build the project in.

run the following command:

`npx @mohammad-abbass/rapid-express your-project-name
`

Replace `your-project-name` with the name of your new Express.js project. rapid-express will create a new folder with the specified project name and generate the boilerplate Express.js application inside it.

After that you will be prompted to enter your `MONGO_URI` to set up connection to database, paste it and press enter.

## Project Structure

The Express.js application generated by rapid-express follows a structured layout, as shown below:

```my-express-app/
  ├── node_modules/
  ├── src/
  │   ├── config/
  │   │   └── db.js
  │   ├── controllers/
  │   ├── middleware/
  │   │   └── globalErrorHandler.js
  │   ├── models/
  │   ├── routes/
  │   ├── utils/
  │   │   └── apiError.js
  │   └── index.js
  ├── .env
  ├── package.json
  └── package-lock.json

```
