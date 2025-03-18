# Node.js Backend Test

## 📌 Project Overview
This is a **Node.js backend** application that uses **Express.js** and **PostgreSQL** for handling resource lineage queries and expression evaluation. The app follows a structured **MVC architecture** with separate folders for routes, controllers, services, and configuration.

## 📁 Project Structure
```
NODEJS-BACKEND-TEST
│── node_modules/          # Node.js dependencies
│── src/
│   │── config/
│   │   ├── db.js          # PostgreSQL database connection
│   │── controllers/
│   │   ├── calculationController.js # Handles expression evaluation logic
│   │   ├── resourceController.js    # Handles resource lineage logic
│   │── routes/
│   │   ├── calculationRoutes.js  # Routes for calculations
│   │   ├── resourceRoutes.js     # Routes for resource lineage
│   │── services/
│   │   ├── calculationService.js # Business logic for calculations
│   │   ├── resourceService.js    # Business logic for resources
│── app.js                 # Express application setup
│── server.js              # Server entry point
│── example.env            # Environment variables
│── dockerfile             # Dockerfile for containerization
│── init.sql               # SQL file for database initialization
│── package.json           # Node.js dependencies & scripts
│── package-lock.json      # Dependency lock file
```

## 🚀 Setup & Installation

### **1️⃣ Prerequisites**
- **Node.js v18+** installed
- **Docker** installed

### **2️⃣ Clone the Repository**
```sh
git clone <repo-url>
cd NODEJS-BACKEND-TEST
```

### **3️⃣ Install Dependencies**
```sh
npm install
```

### **4️⃣ Configure Environment Variables**
Copy `example.env` to `.env` file in the root folder and set the database connection:
```env
DB_USER=postgres
DB_PASS=password
DB_NAME=procurifieddb
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

### **5️⃣ Build & Start PostgreSQL with Docker**
```sh
npm run db:build  # Build PostgreSQL image
npm run db:start  # Start PostgreSQL container
```

### **6️⃣ Check Database Logs & Connect**
```sh
npm run db:logs   # View PostgreSQL logs
npm run db:psql   # Open PostgreSQL shell
```

### **7️⃣ Stop & Remove Database Container**
```sh
npm run db:stop   # Stop and remove PostgreSQL container
```

### **🔟 Start the Server**
```sh
npm run start
```
Server will start at **http://localhost:3000**

## Testing

### Prerequisites
- Ensure Node.js and npm are installed.

### Running Tests
To execute tests, run:
```sh
npm run db:start // if not started

npm run test
```

### Test Coverage
- **`/resources/lineage/:id`** → Fetches lineage of a resource.
- **`/calculations/:id`** → Evaluates a calculation based on variables.

## Manual Testing

**1️⃣ Test lineage**
```sh
curl http://localhost:3000/resources/lineage/3
```

**2️⃣ Test calculations**
```sh
curl http://localhost:3000/calculations/2
```

**3️⃣ Acces the database and change a variable value**
eg
```
| id |    name     | value
  1    variable1       4 (was 2.5)
```

### **4️⃣ Do a recalculation for variable 1 **
```sh
curl http://localhost:3000/calculations/recalculate/1

```
should result in an array of affected calculations and new_value
```json
{"calculatedValue":[{"id":1,"new_value":24}]}

```

## 📡 API Endpoints

### **1️⃣ Resource Lineage API**
#### Get the lineage (ancestors) of a resource:
**GET** `/resources/lineage/:id`
##### Example Request:
```sh
curl -X GET http://localhost:3000/resources/lineage/3
```
##### Example Response:
```json
{
    "lineage": [1, 2]
}
```

### **2️⃣ Expression Evaluation API**
#### Evaluate an expression from the database:
**GET** `/calculations/:id`
##### Example Request:
```sh
curl -X GET http://localhost:3000/calculations/1
```
##### Example Response:
```json
{
    "calculatedValue": 22.5
}
```

**GET** `/calculations/recalculate/:variableId`
##### Example Request:
```sh
curl -X GET http://localhost:3000/recalculate/1
```
##### Example Response:
```json
{
    "calculatedValue":[
        {
            "id":1,
            "new_value":24
        }
    ]
}
```

## 🛠 Troubleshooting
- **Database connection issues?** Check `.env` settings and ensure PostgreSQL is running.

## 📜 License
MIT License

