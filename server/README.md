# Back-End for multiplayer video game
<a name="top"></a>
Server to handle multiplayers for Fort Nerf Client Application which was created by Bitwise!

# Table of contents
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <!-- <li><a href="#wireframe">Wireframe</a></li> -->
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

# About the Project
<a name="about-the-project"></a>
This app is built with the existing knowledge of the Node.js. This server side application is built primarily using the Express.js library. The application integrates Socket.io to use websockets to allow concurrent users to play on a game server. The database being used is MongoDB to hold game data until the data is deleted at the end of the match.
<p align="left">(<a href="#top">back to top</a>)</p>

### Built with
<a name="built-with"></a>
A few of the frameworks/libraries that were used to build the project are
* Node.js
* Typescript
* Express
* Socket.io
* Mongoose/MongoDB
* Express Router
* EsLint and AirBnb
<p align="left">(<a href="#top">back to top</a>)</p>
<!-- ### wireframe
  ### Getting Started The App build out with simple wireframes using Figma.
<img width="328" alt="wire-frame-frontend" src=""> -->

## Getting Started
<a name="getting-started"></a>
To install the Server FortNerf App Follow these steps

### Prerequisites
<a name="prerequisites"></a>
* npm
  ```
  npm install npm@latest -g
  ```

### Installation
<a name="installation"></a>

1. Clone the repo
  ```she
  git clone https://github.com/javiguerra777/capstone-backend
  ```
2. Install npm packages
  ```sh
  npm install
  ```
3. Create a MongoDB cluster and provide credentials to access the database, and create a SendGrid account and use the API key to send emails. It's important to remember to set these variables in a .env file to ensure the configuration is set up correctly.
```
DB_KEY="Database Credentials"
SENDGRID_API_KEY="Api Key"
```
4. npm start for the server
```
npm start
```


## Usage
Can be used to create new game room servers and save them in the database.
Can be used to delete game rooms
Can be used to send messages to other users in the same room.
You can:
- [x] Join the servers
- [x] Delete server once game has ended
- [x] Play with other users
- [x] Send message to other users
<p align="left">(<a href="#top">back to top</a>)</p>

## Deployment

Details on how to deploy this application will be announced soon.

<p align="left">(<a href="#top">back to top</a>)</p>