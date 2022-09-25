Node.JS Cinema Data Management
============
This is a node.js website for cinema employees where they can manage members’ and movies’ data. each employee has individualized permissions to add, update and delete movies, subscribers, and employees.

---

## Features
- add, update, and delete data
- access management
- search and sort movies
- login and register (only employees that were added by the admin can register)
- route protection using sessions
- includes individuall session time out for each user


#### Data Structure:
- **2 Rest-APIs from [jsonplaceholder](jsonplaceholder.typicode.com):** initial members and movies data
- **2 JSON Files:** users and permissions (first user (the admin) will always be with all permissions)
- **Rest-API:** manages a MongoDB database with 3 collections:
                users, members (initiated with the APIs from jsonplaceholder), and subs (empty at first run)  
- **MongoDB database** of users(employees)                   
---

## Setup
You can use [studio3t](https://studio3t.com/download/) for the following steps.

Create a MongoDB database called usersDB and add a user. use the example below:

![usersDB](https://i.imgur.com/rssibm1.png)

This will be the Admin of the website.

Go to \data\users.JSON and change the user id according to your database.

![replaceId](https://i.imgur.com/U5cW6IE.png)

Create a MongoDB database called cinemaDB with the 3 following collections:

![CinemaDB](https://i.imgur.com/zlKjvhZ.png) 

This project consists of two directories: client-side and Rest-API, both need to run at the same time.
Open each directory in VS Code and run `npm install` for each, to install all the dependencies.

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
<div align="center">
  <img align=center height="600"  src="https://media.giphy.com/media/v7fN7IPJCD3uCT0DL6/giphy.gif">
</div>





