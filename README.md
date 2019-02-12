# Phone-Book-App

## Description

The goal of this React Web application is to create a phone book. 

### The application have three pages : 
1. Page on which you’ll display a list of all phone book records.
2. Page on which you’ll edit a record from the phone book list.
3. Page allowing to add a record to the phone book list.


### Index

* [Libraries](#libraries)
* [How to run](#how-to-run)

---

## Libraries

* react (^16.8.1)
* react-dom (^16.8.1)
* react-debounce-input (^3.2.0)
* react-router-dom (^4.3.1)
* npm (version 5.6.0)
* nodejs (version 9.10.1)
* postgres (version 11.1-1)
* @material-ui/core (^3.9.2)
* @material-ui/icons (^3.0.2)

[TOP](#index)

___

## How to run

1. Firstly, clone the repository : https://github.com/1n3ffbl3/Phone-Book-App.git

2. After that you have to install dependencies:
 
    - npm 
    - nodejs
    - postgres

3. After successful installation, go into phone-front and phone-backend directories, and run: 

    - npm install (for npm)
 	
4. Create database "phoneBook" on your PostgresSQL server (local)

5. Run the script to set up the table and add data to it:

	- node models/database.js
    - node models/phoneBookData.js

6. In both directories run:

    - npm start (for npm)
 
7. Following pages are available:

* All phone book records

    - localhost:3000/ 

* Edit a record in phone book

    - localhost:3000/edit/:phoneBookRecordId 

* Add new record to phone book

    - localhost:3000/new 
    
[TOP](#index)

___
