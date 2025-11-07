# Database-Interaction-with-PostgreSQL-and-Application-Programming-Practice
Objective: Implement a PostgreSQL database using the provided schema and write an application in Javascript that connects to this database to perform specific CRUD (Create, Read, Update, Delete) operations.


# TECH USED
JavaScript Node JS 
Postgres SQL

# Set Up Instruction 
HOW TO CLONE FROM GIT:
URL: https://github.com/ChrisPham03/Database-Interaction-with-PostgreSQL-and-Application-Programming-Practice.git
HOW TO SET UP POSTGRES SQL: 

SCHEMA

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    enrollment_date DATE
);

PROJECCT DIRECTORY STRUCTURE 
# main (all main function in here)
app.js
function inside:
testconnect
getAllStudents(): Retrieves and displays all records from the students table.
addStudent(first_name, last_name, email, enrollment_date): Inserts a new student record into the students table.
updateStudentEmail(student_id, new_email): Updates the email address for a student with the specified student_id.
deleteStudent(student_id): Deletes the record of the student with the specified student_id.
main(): this main running all the function and log the result for testing interaction
# environment variable control 
.env
Note: .env wont be show in the repo as it was ignore for safety, avoid credential leak
The variables details: 
DB_USER=username
DB_HOST=localhost
DB_DATABASE=databasename
DB_PASSWORD=*****
DB_PORT=5432
# dependencies configuration
package.json
package-lock.json 
# document 
README.md

Video link: