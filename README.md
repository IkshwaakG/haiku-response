# Haiku-Response Web-App

This Web-based app allows users to input three lines of text, make requests to ChatGPT, display the responses, and store the data in an SQLite database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)

## Prerequisites

Before running the app, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

2. Change into the project directory:

    ```bash
    cd your-repository
   ```
   
3. Install dependencies:
    ```bash
   npm install
    ```
   
## Usage

1. Start the development server:

    ```bash
   npm start
   ```
2. Open your web browser and go to http://localhost:3000 to view the app.

3. Enter three lines of text, click the "Submit" button, and see the responses from ChatGPT and the data saved in the SQLite database.

## Configuration
1. Update the src/App.js file to include your OpenAI API key in the Authorization header for ChatGPT requests.
2. Update the SQLite database path and table name in the saveToDb and fetchDataFromDb functions.

## Dependencies
```
1. React
2. Axios
3. SQLite3
```
