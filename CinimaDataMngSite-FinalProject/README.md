Node.JS Cinema Data Management
============
This is a node.js website for cinema employees where they can manage members’ and movies’ data. each employee has individualized permissions to add, update and delete movies, subscribers, and employees.

---

## Features
- add, update, and delete data
- access management
- Search and sort movies
- login and register (only employees that were added by the admin can register)
- route protection using sessions
- includes automatic logout after a period that is predetermined individually for each user


#### Data Structure:
- **External Rest-APIs:** initial members and movies data
- **JSON Files:** users and permissions (first user (employee) will always be with all permissions)
- **Rest-API:** manages a MongoDB database with 3 collections:
                users, members (initiated with the external APIs), and subs  
- **MongoDB database** of users(employees)                   
---

## Setup
Create a MongoDB database called usersDB and add a user as shown below:

![usersDB](https://i.imgur.com/rssibm1.png)

This will be the Admin of the website.

Go to CINEMA\data\users.JSON and change the user id according to your database.

Create a MongoDB database called cinemaDB with the 3 following collections:

![CinemaDB](https://i.imgur.com/zlKjvhZ.png) 

You can use Robo 3T for this.

This project consists of two directories: client-side and Rest-API, both need to run at the same time.
Open each directory in VS Code, cd to the root directory if needed, and run `npm install` for each, to install all the dependencies.

---

## Usage
Once the dependencies are installed, you can run  `npm start` on each VS code window, to start the application. You will then be able to access the website at localhost:3000.
Now you can log in with the username and password according to your users' database. 

When the Admin adds a new user, he decides what will be his username. 

When the new employee wants to log in, he first needs to sign up by clicking on "Sign Up" On the login page. Then he chooses a password for the username he received from the admin. He can log in after the sign-up is done.

<div align="center">
  <img align=center height="300"  src="https://i.imgur.com/uNQQnEn.png">&nbsp &nbsp
  <img align=center height="250"  src="https://i.imgur.com/vwK8Qfu.png">
</div>

---

## Preview
https://giphy.com/channel/rita10514/preview


