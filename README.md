<h1 align="center">TREASURESCAPE</h1>
<h3 align="center">TreasureScape aims to help students get acquinted with the nus campus in a fun and engaging way through a game of treasure hunt!</h3>

## Motivation:
Do you remember when you first entered NUS, all lost and confused? Relying on google map and the nusNextBus app to get around campus for the first two months? Well, we now have the solution to make this easier for incoming freshmen or anyone new to the campus! Our motivation behind this project is to create a mobile application to help students get acquainted with the NUS campus in a fun and engaging way. We feel that as freshmen, it was hard for us to get around campus at the start and we did not know many of the shortcuts we could take to get to the different locations around campus. Hence, we hope that through this treasure hunt application freshmen would be able to learn to get around campus efficiently. 

## Aim:
We hope to create a mobile application to help students get acquainted with the NUS campus in a fun and engaging way through a treasure hunt! 

## User Stories:
- As someone new to the campus, I would want to know how to get around campus without getting lost. 

- As a busy NUS student, I would like to know the fastest route to get to class to save time. 

- As a first-year student who is unfamiliar with the campus, I would like to learn more about the different facilities available on campus. 

- As a first-year student entering a new environment, I would be keen on meeting new people.

- As a store vendor, I would want exposure for my store to prospective customers. 

- As a club/organisation, I would want freshmen to know more about what I do so they can turn into prospective members.

## Features of our application: 
   1. User Authentication 
   3. Live Geolocation of User on the Map
   4. Detection of Treasure
   5. Prize Redemption System
   6. Mission System
   7. Friends Matching System
   8. Augmented Reality 
   9. User Database 


## Technologies used:
- React Native
- SupaBase
- ARCore 
- Google Geolocation API

## Currently working on:
2. Geolocation API
3. Augmented Reality API

## MileStone:
### MileStone 1:
#### 1. functioning user login and sign up 

App is connected to the backend supabase data base.  

Able to perform login and sign up on the app.


#### 2. Basic navigation between pages 

Able to navigate within the login group (login page, signup page, forget password page)

Able to navigate within the home group (home page, mission page, map page, friends page, shop page) 

Able to navigate from login group to home group.


### MileStone 2:
#### 1. fully functioning user Authentication

able to login, signup and forget password (forget password WIP)


#### 2. functioning mission system (done)

able to retrieve data from the database (done)

able to update and awards player when mission is completed (done)


#### 3. functioning friends system

able to retrieve data from user's friend list (done)

functioning online and offline indicator of friends

popup menu of add friends (done)

able to request, add and remove friends from user's friend list

updating of database from the performed actions


#### 4. functioning shop system

able to retrieve data from the database (done)

able to perform buying feature from the shop

storing of item purchase

updating of shop database and player database with each purchase


#### 5. functioning map geolocation

working geolocation of the app

display player geolocation on the app

detection of treasure when near


#### 6. object detection

detection of the treasure 


#### 7. Misc

loading page (done)

auto update of page after update to database (done)

pop up memu of profile photo (done)

update of user profile pic using camera / gallery in the profile popup

## Quickstart
1. Install [NodeJS](https://nodejs.org/en/download) for windows or 
```bash
#for linux
curl https://get.volta.sh | bash
source ~/.bashrc
volta install node@18
``` 
2. Fork and clone the project
3. Navigate into the project dir using cd
4. Install any nessessory dependency 
```bash
npm install expo
npm install react-hook-form
```
5. Start the program
```bash
npm start
```
6. Scan the QR code or key in the url into expo go app on your phone / simulator

## ER diagram for database
![image](https://github.com/linha00/Treasurescape/assets/121675791/4f5540d6-c590-4d2d-9f3f-8904d5e244c8)
