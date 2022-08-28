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
create users mongoDB database that looks like this:

![users](https://i.imgur.com/rssibm1.png)

you need to create the user as shown above.

go to CINEMA\data\users.json and change the user id according to your database.

create a Cinema mongoDB database that looks like this:

![members](https://i.imgur.com/0L8lamo.png) 

![movies](https://i.imgur.com/P0WvBGD.png)  

![subs](https://i.imgur.com/tAvuaXp.png)

I used Robo 3T for this.

This project consists of two directories: client side and Rest-API, both need to run at the same time.
Open each directory in VS Code, cd to the root directory if needed and run `npm install` for each, to install all the dependencies.

---

## Usage
Once the dependencies are installed, you can run  `npm start` on each VS code window ,to start the application. You will then be able to access it at localhost:3000.

login with: username: rita1, password: 1234

---

## Previews
![home](https://i.imgur.com/XAI2wRG.png) 

![moviesP](https://i.imgur.com/bugA69U.png)  

![userMngP](https://i.imgur.com/wRnlkT3.png)

![subsP](https://i.imgur.com/DsuaSdv.png)
