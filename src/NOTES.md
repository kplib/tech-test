## OVERVIEW

This project contains 3 parts:
1. src/api/ (Back-end) - contains the restful APIs for my app. I created my own little framework for back-end to brush up my skills in PHP and MySQL. Language: PHP, MySQL

2. src/spa/ (Front-end) - contains my single page application. I used a free Bootstrap template and integrated it with AngularJS. Framework: AngularJS, Bootstrap

3. src/scripts/ - this contains the DB script

## HOW TO RUN THE APP

### I. Back-end / API:
1. Installation
Please install the following:
- Apache Server 2.4.x
- PHP 5.5.x 
- MySQL Server 5.6.x

Please use default ports (i.e Apache - 80; MySQL - 3306) and make sure to start all the services after.

2. Enable the following:
- PHP - php_mysqli
- Apache - mod_rewrite

3. Set DocumentRoot in Apache httpd.conf to point to "src":
DocumentRoot "path-where-you-saved-the-project/src/"

4. Restart Apache service.

5. Execute the SQL script in src/scripts/frog_ms.db.sql


### II. Front-end / SPA
1. Install Node using the NodeJs installer. You may refer to this link [https://nodejs.org/en/] for the installer. This will also install npm (which we are going to use to run the SPA later).

2. Open command line, go to src/spa, and execute the following commands:
- npm install - This installs the node modules listed in package.json. This will also run bower, which downloads the angular components needed for this app 
- npm start - This runs the app

Please note that the port used is 8000.

3. Open Chrome (supported browser for the app) and access [http://localhost:8000]

### OTHERS

1. Things TODO and IMPROVE

Back End
- API must return PHP errors in the response
- API request authentication and validation
- Proper error notifications
- Error loggin
- Create API - check on duplicate entries
- Update API - must check if data is the same as the old one; currently returns Error if the same
- Assigning Frog to Pond - must be able to check if the Pond ID assigned is valid; Or Foreign Key can be implemented for as long as API is able to return the error properly

Front End
- Pagination of List pages
- Validation for dates (date format and date range)
- Validation for text fields (e.g max length)
- Login

2. Time spent on Development/Planning/Design - ~30hrs