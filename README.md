# O2ARC_V2

### Getting Started

This project is based on Node.js + SQLlite

```bash
--app.js
|-- bin
|   `-- www
|-- db
|   |-- O2ARC.db --> Our Main DB
|   |-- db.js --> 
|   |-- dbin.js --> These two db__.js files intializeds DB. MUST NOT BE EXCUTED!
|   |-- evaluation.json 
|   |-- logs.json
|   |-- sql.js
|   |-- tasklist.json
|   `-- testsets.json --> backup json files
|-- package-lock.json
|-- package.json
|-- public
|   |-- images
|   |   |-- background.png
|   |   `-- korea_mark.png
|   |-- javascripts
|   |   |-- logic_function.js --> This js file contains backend logic functions.
|   |   `-- testing_interface.js
|   `-- stylesheets
|       |-- common.css
|       |-- style.css
|       `-- testing_interface.css
|-- routes --> SERVER LOGIC + DB LOGIC
|   |-- index.js --> Main homepage routing
|   |-- problemset.js --> Problem Set page routing
|   `-- users.js 
`-- views
    |-- error.ejs --> 404 PAGE TEMPLATE 
    |-- index.ejs --> MAIN LOGIN PAGE TEMPLATE
    `-- problem_set.ejs --> QUESTION SET SELECTION TEMPLATE
    
    
 ### Main Logic and Function Flow Chart

```
