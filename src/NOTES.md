## OVERVIEW

This project contains 3 parts:
1. src/api/ (Back-end) - contains the restful APIs for my app.
I created my own little framework for back-end to brush up my skills in PHP and MySQL.

Language: PHP, MySQL

2. src/spa/ (Front-end) - contains my single page application. 
I used a free Bootstrap template and integrated it with AngularJS.

Framework: AngularJS, Bootstrap

3. src/scripts/ - this contains the DB script

## HOW TO RUN THE APP

## I. Back-end / API:
1. Installation
Please install the following:
- Apache Server 2.4.x
- PHP 5.5.x 
- MySQL Server 5.6.x

Please use default ports (i.e Apache - 80; MySQL - 3306) and make sure to start all the services after.

2. Enable the following:
a. PHP 
- php_mysqli

b. Apache
- mod_rewrite

3. Set DocumentRoot in Apache httpd.conf to point to "src":
DocumentRoot "<path-where-you-saved-the-project>/src/"

4. Restart Apache service.

5. Execute the SQL script in src/scripts/frog_ms.db.sql


II. Front-end / SPA
1. Install Node using the NodeJs installer. 
You may refer to the link below for the installer.
[https://nodejs.org/en/]https://nodejs.org/en/

This will also install npm (which we are going to use to run the SPA later).

2. Open command line, go to src/spa, and execute the following commands:

a. This installs the node modules listed in package.json. This will also run bower, which downloads the angular components needed for this app 

npm install 

b. This runs the app

npm start

*The port used is 8000

3. Open Chrome (supported browser for the app) and access [http://localhost:8000]http://localhost:8000

## OTHERS

1. Things TODO and IMPROVE
Back End
a. API must return PHP errors in the response
b. API request authentication and validation
c. Proper error notifications
d. Error loggin
d. Create API - check on duplicate entries
e. Update API - must check if data is the same as the old one; currently returns Error if the same
f. Assigning Frog to Pond - must be able to check if the Pond ID assigned is valid; Or Foreign Key can be implemented for as long as API is able to return the error properly

Front End
a. Pagination of List pages
b. Validation for dates (date format and date range)
c. Validation for text fields (e.g max length)
d. Login

2. Time spent on Development/Planning/Design - ~30hrs