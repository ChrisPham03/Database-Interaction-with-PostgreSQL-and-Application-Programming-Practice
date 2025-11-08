/**
 * @file app.js
 * @description Main application file for demonstrating CRUD operations
 * on a PostgreSQL 'students' table using Node.js and node-postgres.
 */

// Import the Pool object from 'pg' for database connection pooling
// Reason: Efficiently manages multiple connections to the database.
const { Pool } = require('pg');

// Import and configure dotenv to be able to load environment variables from .env file
// Reason: Keeps sensitive information like DB credentials out of the source code.
require('dotenv').config();

/**
 * Configure the connection pool.
 * A Pool is used instead of a single Client for efficiency, as it
 * manages a "pool" of connections that can be leased and reused,
 * saving the overhead of creating a new connection for every query.
 */
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

/**
 * Verifies the database connection by leasing a client from the pool
 * and immediately releasing it.
 */
async function testConnection() {
    let client; // Declare client outside try to access in finally
    try {
        // Try to get a client from the pool
        client = await pool.connect();
        console.log('Successfully connected to PostgreSQL!');
    } catch (err) {
        console.error('Error connecting', err.stack);
    } finally {
        // **Crucial:** Always release the client back to the pool
        // This ensures the connection is available for other operations.
        if (client) {
            client.release();
        }
    }
}

/**
 * Retrieve and display all students from the 'students' table.
 */
async function getAllStudents() {
    let client;
    try {
        client = await pool.connect();
        const sql = 'SELECT * FROM students;';
        const res = await client.query(sql);
        console.log('--- All Students ---');
        console.table(res.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
    } finally {
        // Ensure the client is always released, even if the query fails.
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
 * @param {string} enrollment_date - The enrollment date (YYYY-MM-DD).
 */
async function addStudent(first_name, last_name, email, enrollment_date) {
    let client;
    // Uses a parameterized query ($1, $2...) to prevent SQL injection.
    const insertQuery = 'INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4);';
    const values = [first_name, last_name, email, enrollment_date];

    try {
        client = await pool.connect();
        await client.query(insertQuery, values);
        console.log('Student added successfully');
    } catch (err) {
        console.error('Error executing query', err.stack);
    } finally {
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
async function updateStudentEmail(student_id, new_email) {
    let client;
    // Parameterized query prevents SQL injection.
    const updateQuery = 'UPDATE students SET email = $1 WHERE student_id = $2;';
    const values = [new_email, student_id];

    try {
        client = await pool.connect();
        const res = await client.query(updateQuery, values);
        
        // Provide intuitive feedback on whether the update was successful
        if (res.rowCount > 0) {
            console.log(`Successfully updated email for student ID: ${student_id}`);
        } else {
            console.log(`No student found with ID: ${student_id}`);
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
    } finally {
        if (client) {
            client.release();
        }
    }
}

/**
 * Deletes a student from the 'students' table by their ID.
 * @param {number} student_id - The ID of the student to delete.
 */
async function deleteStudent(student_id) {
    let client;
    // Parameterized query prevents SQL injection.
    const deleteQuery = 'DELETE FROM students WHERE student_id = $1;';
    const values = [student_id];

    try {
        client = await pool.connect();
        const res = await client.query(deleteQuery, values);
        
        // Provide feedback on whether the delete was successful
        if (res.rowCount > 0) {
            console.log(`Successfully deleted student ID: ${student_id}`);
        } else {
            console.log(`No student found with ID: ${student_id}`);
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
    } finally {
        if (client) {
            client.release();
        }
    }
}

/**
 * Main function to orchestrate and demonstrate the CRUD operations.
 */
async function main() {
    // 1. Test the connection first
    await testConnection();
    
    // 2. Add a new student
    // Note: This line should be commented out after the first run
    // to avoid 'duplicate key' errors from the unique email constraint.
    // await addStudent('Chris', 'Pham', 'chris@example.com', '2023-09-03');

    // 3. Show all students
    await getAllStudents();

    // 4. Test the update function
    // await updateStudentEmail(4, 'chris.new@example.com');
    
    // 5. Show all students again to see the update
    // await getAllStudents();

    // 6. Test the delete function
    // await deleteStudent(1); // Deletes student with ID 1
    
    // 7. Show all students to confirm deletion
    // await getAllStudents();

    // Close all connections in the pool
    // Reason: This allows the Node.js script to exit gracefully.
    pool.end();
}

// Run the main orchestration function
main();