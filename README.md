# RapidAPI/Node/Angular Integration Project ----------------------------------------------------------------

This project seamlessly integrates data from two RapidAPI services and presents the aggregated results. It consists of a backend Node.js server and a frontend Angular application.

## BACKEND (NODE.JS) SETUP ----------------------------------------------------------------

### Prerequisites

- Ensure Node.js is installed (version >= 14)
- Make sure Git is installed
- Obtain RapidAPI account with valid API keys

### Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/lovemore66/Basalt-nodeJs.git
    cd Basalt-nodeJs
    ```

2. Install project dependencies:

    ```bash
    npm install
    ```

3. Set your RapidAPI keys:

    Edit `.env` and replace placeholder values with your actual RapidAPI keys:

    ```javascript
    // Define your RapidAPI keys here
    const apiKey1 = 'your_api_key_1';
    const apiKey2 = 'your_api_key_2';
    ```

4. Start the Node.js server:

    ```bash
    npm start
    ```

   The server will be accessible at `http://localhost:3000`.

5. Test the API endpoints:

    - Aggregated Data:

      Open your browser or use a tool like Postman to access `http://localhost:3000/aggregated-data`.

    - Translation:

      Use a tool like Postman to make a POST request to `http://localhost:3000/translate` with parameters `source_language`, `target_language`, and `text`.
    - Transactions
       Open your browser or use a tool like Postman to access `http://localhost:3000/transactions`.

## FRONT END (ANGULAR) SETUP ----------------------------------------------------------------

### Prerequisites

- Ensure Angular CLI is installed (version >= 12)
- Have Node.js installed
- Backend server should be running

### Getting Started

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install Angular dependencies:

    ```bash
    npm install
    ```

3. Update API endpoint:

    Edit `src/environments/environment.ts` and set the `apiUrl` to the backend server:

    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:3000/api',
    };
    ```

4. Run the Angular development server:

    ```bash
    ng serve
    ```

   The frontend will be accessible at `http://localhost:4200`.

5. Open your browser and navigate to `http://localhost:4200` to view the integrated data.

