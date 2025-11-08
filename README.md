## QUANG MINH PHAM
## 101300755

# Database Interaction with PostgreSQL and Node.js

This project is an application built with Node.js that connects to a PostgreSQL database. It demonstrates fundamental CRUD (Create, Read, Update, Delete) operations on a `students` table as required for a database systems assignment.

## 🛠️ Technology Stack

  * **Application:** Node.js
  * **Database:** PostgreSQL
  * **Driver:** `node-postgres` (pg)
  * **Configuration:** `dotenv` (for managing environment variables)

## 🎥 Video Demonstration

https://drive.google.com/file/d/1dgu7d_3S8rTSc24AfTTVt1yfpQwnoOYC/view?usp=sharing

## 🚀 Setup and Installation

Follow these steps to set up the database and run the application.

### 1\. Clone the Repository

```bash
git clone https://github.com/ChrisPham03/Database-Interaction-with-PostgreSQL-and-Application-Programming-Practice.git
cd Database-Interaction-with-PostgreSQL-and-Application-Programming-Practice
```

### 2\. Database Setup (PostgreSQL)

Before running the app, you must create the database and table.

1.  Open your PostgreSQL tool (like **pgAdmin** or `psql`).
2.  Create a new database.
3.  Run the following SQL script to **create the table** and **insert the initial data**:

<!-- end list -->

```sql
-- Create the table structure
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    enrollment_date DATE
);

-- Insert the initial data
INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');


```

### 3\. Application Setup (Node.js)

**a. Install Dependencies**

Open your terminal in the project folder and run:

```bash
npm install
```

**b. Set Up Environment Variables**

This project uses a `.env` file to securely store your database credentials. This file is ignored by Git and will not be uploaded to the repository.

1.  Create a new file in the root of the project named `.env`
2.  Copy and paste the text below into the file, replacing the values with your **own** database credentials.

<!-- end list -->

```
# .env file

DB_USER=your_postgres_username
DB_HOST=localhost
DB_DATABASE=name_of_your_database
DB_PASSWORD=your_secret_password
DB_PORT=5432
```

## ▶️ Running the Application

Once the setup is complete, run the application from your terminal using command node app.js :

```bash
node app.js
```

The script will automatically connect to the database and execute the following functions in order, logging the results to the console:

1.  **`testConnection()`**: Verifies that the connection to the database is successful.
2.  **`getAllStudents()`**: Shows the initial list of students.
3.  **`addStudent()`**: Adds a new student to the table.
4.  **`updateStudentEmail()`**: Updates the email of a specific student.
6.  **`getAllStudents()`**: Shows the final list of students to demonstrate the changes.

-----