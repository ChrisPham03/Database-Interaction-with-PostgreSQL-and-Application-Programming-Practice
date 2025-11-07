// Import the Pool object from the 'pg' library
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file
// Configure the connection details for your database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// A quick test function to see if we can connect
async function testConnection() {
    try {
         // Try to get a client from the pool
        const client = await pool.connect();
        console.log('Successfully connected');
        // Release the client back to the pool
        client.release(); 
    } catch (err) {
        console.error('Error connecting', err.stack);
    }
}

/**
 * Retrieve and display all students from the 'students' table.
 */
async function getAllStudents(){
    let client;
    try {
        client = await pool.connect();
        const res = await client.query('SELECT * FROM students;');
        console.table(res.rows)
    }
    catch (err) {
        console.error('Error executing query', err.stack);
    }
    finally {
        if (client) {
            client.release();
        }
    }
}

/**
 * Adds a new student to the 'students' table.
 * @param {string} first_name - The first name of the student.
 * @param {string} last_name - The last name of the student.
 * @param {string} email - The email address of the student.
 * @param {string} enrollment_date - The enrollment date of the student (YYYY-MM-DD).
 */
async function addStudent(first_name, last_name, email, enrollment_date){
    let client;
    try {
        client = await pool.connect();
        /* For the querry implement, I used parameterized query to prevent SQL injection. 
           Although not required, but I think it would be a good practice.
        */
        const insertQuery = 'INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4);';
        const values = [first_name, last_name, email, enrollment_date];
        const res = await client.query(insertQuery, values);
        console.log('Student added successfully');

    }
    catch (err) {
        console.error('Error executing query', err.stack);
    }
    finally {
        if (client) {
            client.release();
        }
    }
}

/**
 * Updates the email address for a specific student.
 * @param {number} student_id - The ID of the student to update.
 * @param {string} new_email - The new email address.
 */
async function  updateStudentEmail(student_id, new_email){
    let client;
    try {
        client = await pool.connect();
        /* For the querry implement, I used parameterized query to prevent SQL injection. 
           Although not required, but I think it would be a good practice.
        */
        const updateQuery = 'UPDATE students SET email = $1 WHERE student_id = $2;';
        const values = [new_email, student_id];
        const res = await client.query(updateQuery, values);
        if (res.rowCount > 0) {
            console.log(`Successfully updated email for student ID: ${student_id}`);
        } else {
            console.log(`No student found with ID: ${student_id}`);
        }
    }
    catch (err) {
        console.error('Error executing query', err.stack);
    }
    finally {
        if (client) {
            client.release();
        }
    }
}

/**
 * Delete student by ID from the table.
 * @param {number} student_id - The ID of the student to update.
 */
async function deleteStudent(student_id){
    let client;
    try {
        client = await pool.connect();
         /* For the querry implement, I used parameterized query to prevent SQL injection. 
           Although not required, but I think it would be a good practice.
        */
        const deleteQuery = 'DELETE FROM students WHERE student_id = $1;';
        const values = [student_id];
        const res = await client.query(deleteQuery, values);
        if (res.rowCount > 0) {
            console.log(`Successfully deleted student ID: ${student_id}`);
        } else {
            console.log(`No student found with ID: ${student_id}`);
        }
    }
    catch (err) {
        console.error('Error executing query', err.stack);
    }
    finally {
        if (client) {
            client.release();
        }
    }
}

async function main() {
// Run the test
testConnection();
// Test the new function
await addStudent('Chris', 'Vietnam', 'chris@example.com', '2023-09-03');
await addStudent('Bao', 'Vietnam', 'bao@example.com', '2023-09-03');
await addStudent('Tom', 'Vietnam', 'tom@example.com', '2023-09-03');


await getAllStudents(); // See the list after, with Alice!

// Test the update function
//await updateStudentEmail(1, 'alice.new@example.com'); // Assuming Alice is ID 1
    
// See the list after
//await getAllStudents();

pool.end(); // This closes all connections and lets the script exit


}


// Run main function!
main();