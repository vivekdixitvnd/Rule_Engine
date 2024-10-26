
# **Rule Engine Application**

This is a 3-tier Rule Engine application that allows users to dynamically create, combine, and evaluate rules based on user attributes like age, department, income, and more. It uses **React** for the frontend, **Node.js/Express** for the backend, and supports data persistence and rule evaluation via a REST API.

## **Table of Contents**
- [Installation](#installation)
- [Usage](#usage)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Common Errors and Troubleshooting](#common-errors-and-troubleshooting)

---

## **Installation**

### **Prerequisites**
- **Node.js**: Install from [Node.js](https://nodejs.org/).
- **npm**: Installed automatically with Node.js.
- **MongoDB** (Optional): For storing rules and evaluations (can use MongoDB Atlas for cloud storage).
  
### **Clone the Repository**
```bash
git clone <repository-url>
cd rule-engine
```

---

## **Frontend Setup**

The frontend is built using **React** and allows users to input rules and user data for evaluation.

### **Steps to Setup Frontend**

1. **Navigate to the Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend Development Server**:
   ```bash
   npm start
   ```
   The frontend should now be running on `http://localhost:3000`.

---

## **Backend Setup**

The backend is built using **Node.js** and **Express**, and it handles the rule parsing, AST generation, rule combination, and evaluation.

### **Steps to Setup Backend**

1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Backend Server**:
   ```bash
   npm start
   ```
   The backend server should now be running on `http://localhost:5000`.

### **Enable CORS**

To allow cross-origin requests between the frontend and backend, CORS is enabled in the backend by installing the `cors` package:
```bash
npm install cors
```

In `server.js`, include:
```javascript
const cors = require('cors');
app.use(cors());
```

---

## **API Endpoints**

### **1. Create Rule**
- **POST** `/create_rule`
- **Description**: Creates an AST from the provided rule string.
- **Request Body**:
  ```json
  {
    "rule_string": "age > 30 AND department = 'Sales'"
  }
  ```
- **Response**:
  ```json
  {
    "type": "operator",
    "value": "AND",
    "left": {
      "type": "operand",
      "value": "age > 30"
    },
    "right": {
      "type": "operand",
      "value": "department = 'Sales'"
    }
  }
  ```

### **2. Combine Rules**
- **POST** `/combine_rules`
- **Description**: Combines multiple rules into one AST.
- **Request Body**:
  ```json
  {
    "rules": ["age > 30 AND department = 'Sales'", "salary > 50000 OR experience > 5"]
  }
  ```
- **Response**: Combined AST.

### **3. Evaluate Rule**
- **POST** `/evaluate_rule`
- **Description**: Evaluates a rule against user data.
- **Request Body**:
  ```json
  {
    "ast": { ...AST representation... },
    "userData": { "age": 35, "department": "Sales", "salary": 60000 }
  }
  ```
- **Response**:
  ```json
  {
    "result": true
  }
  ```

---

## **Testing**

You can test the backend API using **Postman** or **curl**:

1. **Create Rule** Example:
   ```bash
   curl -X POST http://localhost:5000/create_rule \
   -H "Content-Type: application/json" \
   -d '{"rule_string": "age > 30 AND department = '\''Sales'\''"}'
   ```

2. **Evaluate Rule** Example:
   ```bash
   curl -X POST http://localhost:5000/evaluate_rule \
   -H "Content-Type: application/json" \
   -d '{"ast": {"type": "operator", "value": "AND", "left": {"type": "operand", "value": "age > 30"}, "right": {"type": "operand", "value": "department = '\''Sales'\''"}}, "userData": {"age": 35, "department": "Sales", "salary": 60000}}'
   ```

---

## **Common Errors and Troubleshooting**

### **1. Axios "Network Error"**

- **Cause**: The frontend is unable to communicate with the backend due to CORS, incorrect backend URL, or backend not running.
- **Solution**:
  - Ensure the backend is running on `http://localhost:5000`.
  - Add CORS to the backend (already included in the `server.js` file).
  - Verify the Axios URL in the frontend:
    ```javascript
    axios.post('http://localhost:5000/create_rule', { rule_string: 'age > 30 AND department = "Sales"' })
    ```

### **2. Backend Crashes**

- **Cause**: Incorrect backend code or unhandled errors.
- **Solution**: Check the backend logs for detailed error messages. Restart the backend with:
  ```bash
  npm start
  ```

### **3. Cross-Origin Request Blocked**

- **Cause**: CORS issue between frontend (port 3000) and backend (port 5000).
- **Solution**: Ensure CORS is enabled in the backend by adding:
  ```javascript
  app.use(cors());
  ```

### **4. MongoDB Connection Issues (Optional)**

- **Cause**: If MongoDB is not running or misconfigured.
- **Solution**: Ensure MongoDB is running locally or use MongoDB Atlas. Update the connection string in `server.js`:
  ```javascript
  mongoose.connect('mongodb://localhost:27017/rule-engine', { useNewUrlParser: true, useUnifiedTopology: true });
  ```



