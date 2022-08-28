Node.JS Cinima Data Management
============
This is a node.js web site for cinema employees where they can mange members and movies data. each employee have individualized permetions to add, update and delete movies, subscribers and employees.

---

## Features
- add, update and delete data
- acssecc managment
- search and sort movies
- login (only existing users can login)
- route protection using sessions
- includes outomatic logout after a period of time that is predetermend indevidually for each user

#### Data Structure:
- **External Rest-APIs:** initial members and movies data
- **Json Files:** users and promissions (first user (employee) will always be with all permissions)
- **Rest-API:** manages a mongoDB database with 3 collections:
                users, members (initiated with the external APIs) and subs  
- mongoDB database of users(employees)                
---

## Setup
Create mongoDB database called usersDB and add a user as shown below:

![usersDB](https://i.imgur.com/rssibm1.png)

Go to CINEMA\data\users.json and change the user id according to your database.

Create a mongoDB database called cinemaDB with the 3 following collections:

![CinemaDB](https://i.imgur.com/zlKjvhZ.png) 

You can use Robo 3T for this.

This project consists of two directories: client side and Rest-API, both need to run at the same time.
Open each directory in VS Code, cd to the root directory if needed and run `npm install` for each, to install all the dependencies.

---

## Usage
Once the dependencies are installed, you can run  `npm start` on each VS code window ,to start the application. You will then be able to access the web site at localhost:3000.
On the login page click on "Sign Up" and choose a password for the username you created in the users database.
Now you can login with those username and password. 

<div align="center">
  <img align=center height="300"  src="https://i.imgur.com/uNQQnEn.png">&nbsp &nbsp
  <img align=center height="250"  src="https://i.imgur.com/vwK8Qfu.png">
</div>

---

## Preview
https://giphy.com/channel/rita10514/preview

