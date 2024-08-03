
# AgentPro Network

The AgentPro Network project is a comprehensive web application designed to streamline the process of agent marketing and profile management. Utilizing the MERN stack technology—MongoDB, Express.js, React.js, and Node.js—the project provides a robust platform where agents can easily register, create, and share their professional profiles. Here are the key features and components of the project:


## Key Features

1 . Agent Registration and Profile Creation:

    -> Secure registration process.

    ->Detailed profile creation with credentials and contact information.

2 .Public Profile URL Generation:

    -> Unique URLs for agents to share and advertise their profiles.

    -> Generated at the time of registration and accessible through the platform.

3 .Admin Dashboard:

    -> Admin can view all registered agents.

    -> Admin can edit, update, or delete agent profiles.

    -> Toggle agent status (Active/Inactive).

4 .Backend API Development:

    -> RESTful APIs using Express.js for efficient data handling.

    -> API testing with Postman for validation.

5 .Scalable Database Management:

    ->MongoDB for efficient data storage.
## Installation
1 . Clone the repository:

```bash
  https://github.com/Yash-panchall/AgentProNetwork.git
  cd AgentProNetwork
```
2 . Install dependencies:

  -> In client

  ```bash
    cd client
    npm i
  ```

-> In server

  ```bash
    cd server
    npm i
  ```

3 . Set up environment variables:

  ```bash
    MONGODB_URI = #Enter Your Database Url Here to connect with Database
    JWT_SECRET_KEY = AGENTSSECRETTOKENSIGN
    CLOUDINARY_CLOUD_NAME = 
    CLOUDINARY_API_KEY = 
    CLOUDINARY_API_SECRET = 
    FRONTENDDOMAIN = http://localhost:5173
  ```

4 . Start the development server:

  -> In client

  ```bash
    cd client
    npm run dev
  ```

  -> In server

  ```bash
    cd server
    nodemon server.js
  ```

## API Endpoints Past In Browser


1 . Agent Registration Page 

```bash
  http://localhost:5173/agent/register
```
2 . After Registration Login 

```bash
  http://localhost:5173/agent/profile
```

