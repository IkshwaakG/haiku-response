import React, { useState, useEffect} from "react";
import axios from 'axios';
import sqlite3 from 'sqlite3';

const App: React.FC = () => {
    const [textInput, setTextInput] = useState<string>('');
    const [result, setResult] = useState<string[]>([]);
    const [chatGptResponse, setChatGptResponse] = useState<string>('');
    const [databaseResponse, setDatabaseResponse] = useState<string[]>([]);

    useEffect(() => {
        fetchDataFromDb();}, []);

    const processInput = async () => {

        const statement = "Critique response for the following haiku:";

        const fullPrompt = `${statement}\n${textInput}`;

        // Split the input into lines
        const lines = fullPrompt.split('\n');

        // Set the result state
        setResult(lines);

        try {
            // Make a POST request to ChatGPT API
            const response = await axios.post(
                'https://api.openai.com/v1/engines/davinci-codex/completions',
                {
                    prompt: fullPrompt,
                    max_tokens: 100,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // add your OpenAI API Key here.
                    },
                }
            );

            // Set the ChatGPT response state
            setChatGptResponse(response.data.choices[0]?.text || 'No response from ChatGPT');

            // Save the request and response to the database
            saveToDb(lines, response.data.choices[0]?.text || 'No response from ChatGPT');
        } catch (error) {
            console.error('Error fetching data from ChatGPT:', error);
        }
    };


    const saveToDb = (request: string[], response: string) => {
        // Open SQLite database connection
        const db = new sqlite3.Database('/Users/ikshwaakgolivi/haiku-response/haiku_data.db'); //replace this with the path to the db.

        // Insert data into the database
        const insertQuery = `INSERT INTO haiku_data (request, response) VALUES (?, ?)`; //enter the db name
        db.run(insertQuery, [JSON.stringify(request), response], (err) => {
            if (err) {
                console.error('Error inserting data into the database:', err);
            } else {
                console.log('Data inserted into the database successfully.');
                // Fetch data from the database after inserting
                fetchDataFromDb();
            }

            // Close the database connection
            db.close();
        });
    };

    const fetchDataFromDb = () => {
        // Open database connection
        const db = new sqlite3.Database('/Users/ikshwaakgolivi/haiku-response/haiku_data.db'); //replace this with the path to the db.

        // Select data from the database
        const selectQuery = 'SELECT * FROM haiku_data'; //enter the db name
        db.all(selectQuery, (err, rows) => {
            if (err) {
                console.error('Error fetching data from the database:', err);
            } else {
                console.log('Data fetched from the database successfully.');
                // Set the database response state
                setDatabaseResponse(rows);
            }
            // Close the database connection
            db.close();
        });
    };

    return (
        <div className="App">
            <h1>Three-Line Text Input</h1>

            <label htmlFor="text-input">Enter three lines of text:</label>
            <textarea
                id="text-input"
                placeholder="Type your text here..."
                rows={3}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
            ></textarea>

            <button onClick={processInput}>Submit</button>

            <div id="result">
                <h3>Result:</h3>
                {result.map((line, index) => (
                    <p key={index}>Line {index + 1}: {line}</p>
                ))}
            </div>

            <div id="chatgpt-response">
                <h3>ChatGPT Response:</h3>
                <pre>{chatGptResponse}</pre>
            </div>


            <div id="database-response">
                <h3>Database Response:</h3>
                {databaseResponse.map((row, index) => (
                    <div key={index}>
                        <p>Request: {JSON.parse(row.request).join(', ')}</p>
                        <p>Response: {row.response}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;