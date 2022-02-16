-- Create database
CREATE DATABASE todosdb;

-- Connect to database
\c todosdb;

-- Create table
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    task VARCHAR(30),
    done BOOLEAN
);