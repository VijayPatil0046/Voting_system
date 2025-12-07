# 🗳️ Online Voting System (Cassandra + React + Node.js)

A full-stack Online Voting System built using **React (Vite)** for the frontend, **Node.js + Express** for the backend, and **Apache Cassandra** for the database.

This project is primarily created for a **DBS / NoSQL demonstration** showcasing the integration of these technologies.

---

## ✨ Features

### Voter Capabilities
* **Register & Login**: Securely create and access a voter account.
* **View Candidates**: See the list of candidates in the election.
* **Cast Vote (only once)**: Submit a vote securely (single vote per voter enforced).
* **View Results**: See the current election results.

### Admin Capabilities
* **Admin Login**: Secure access for administrators.
* **Add / Update / Delete Candidates**: Manage the list of candidates.
* **View & Delete Voters**: Oversee the registered voters.
* **Export Results to CSV**: Download the final election results data.

---

## 🛠️ Tech Stack

| Category | Technology | Notes |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Modern, fast web UI development. |
| **Backend** | Node.js, Express | Server-side logic and RESTful API handling. |
| **Database** | Apache Cassandra | Highly available, scalable NoSQL database. |
| **API** | REST | Standard communication protocol. |

---

## 📁 Project Structure
DBS_THEORY 
    ├── voting-backend 
    └── voting-frontend

---

## 🚀 Setup Instructions

### Backend Setup (Node.js/Express + Cassandra)

1.  Navigate to the backend directory:
    ```bash
    cd voting-backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```
The server will run at: `http://localhost:5000`

### Frontend Setup (React/Vite)

1.  Navigate to the frontend directory:
    ```bash
    cd voting-frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
The frontend will typically run at: `http://localhost:5173`

---

## 🔒 Admin Login Credentials

Use these credentials to access the admin features on the frontend:

| Field | Value |
| :--- | :--- |
| **Username** | `admin` |
| **Password** | `admin123` |

---

## 🎯 Purpose

* **DBMS / DBS Project**: A hands-on course project.
* **Cassandra NoSQL Demonstration**: Practical experience with a distributed NoSQL database.
* **Full Stack Web Application**: Showcase of end-to-end development skills.

---

## 👨‍💻 Developer

Vijay Patil
CSE Student

> **Educational Use Only**