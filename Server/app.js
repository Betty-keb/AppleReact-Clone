/**
 Question 1: Create a MySQL database by the name "myDB" and create a database user by
the name "myDBuser" with a permissions to connect with the "myDB" database. Use the
"mysql" module to create a connection with the newly created database. Display console
message if the connection is successful or if it has an error.
Please find further instructions under the “Instructions for question 1” below


Instructions for question 1
● To create your database and username, you will need to start your MAMP or WAMP
application and to access your MySQL. Please make sure to remember the username
and password you used when you create the database user.
● You will need a custom module ( example, “app.js”) to write the code that connects
your MySQL database to your MySQL database server
● Once you create your database, you will use Node to manipulate your database.
However, for Node to be able to access your database, you need a MySQL driver, a
module that creates a connection between Node and the MySQL database you
created.
○ Make sure to install the "mysql" driver module from npm and import it in your
“app.js” before writing a Node script to create a connection with the database
you created.
○ You will need your database name, username and user password credentials to
allow Node to access your database.
● Now, connect to the MySQL database server. It is a good practice to always display a
message using console to make sure there is a successful connection to the MySQL
database server from your Node.js application
● run your app (type the “node app.js” command)
● Make sure to always keep your server running after updating your app.js module with
a new code
● It is highly recommended, especially for this week’s practice exercise, that you code
along while watching your class videos.

 */

const mysq = require("mysql");
const express = require("express");
const cors = require("cors");
var app = express();

app.use(express.json());
app.use(cors());

const connection = mysq.createConnection({
  user: "myDB",
  password: "myDB",
  host: "localhost",
  database: "mydb",
});
connection.connect((err) => {
  if (err) console.log(err);
  console.log("connected!!");
});

/**
 Question 2: Here is a link to a document that contains the tables we need to create and
convert the apple.com/iphones page into a dynamic page with a database. As you can see
from the document, there are 5 tables that are needed (please scroll horizontally and
vertically over the document to see all the 5 tables). Write a SQL query to create the
apple.com tables inside of the "myDB" database you created above. Once you write the
queries, use the "mysql" module to execute the queries on the database. Try both of these
methods to initiate the execution of the queries:
● Include the execution code directly in the module to be executed as you run the app
● Use the Express module to receive requests. Configure your module in a way that it
executes the queries when the "/install" URL is visited.
Please find further instructions under the “Instructions for question 2” below.
 
 
 Instructions for question 2
● We need Express server to serve the table data upon a request with the URL of
“/install”. Therefore, before creating a server, make sure to install Express from NPM
and import it into your “app.js” module.
● You will then write a SQL query to create tables from your Node app when the
"/install" URL is visited.
○ Please watch out for syntax errors line by line. From past experiences, we have
seen a lot of students struggling to create tables due to misspelling, missing a
comma or semicolon.
● Make sure to execute the query you wrote to create your tables and show either an
error message or a message showing creation of tables when the "/install" URL is
visited.
● run your app. Make sure to always keep your server running
● Make sure your MySQL database is also on (meaning, your MAMP/WAMP needs to
be started)
● Now run your localhost in your browser and visit the /install" URL. Make sure to also
include the port number you provided for your Express server
 */

app.get("/install", (req, res) => {
  let createProduct = `CREATE TABLE  if not exists products(product_id int auto_increment, product_url VARCHAR(255) not null, product_name VARCHAR(255) not null, PRIMARY KEY (product_id))`;

  connection.query(createProduct, (err, results, fields) => {
    if (err) console.log(err);
  });

  let createProductDiscription = `CREATE TABLE  if not exists ProductDescription(discription_id int auto_increment,
    product_id int,
    product_brief_description TEXT not null,
    product_description TEXT not null,
    product_img VARCHAR(255) not null,
    product_link VARCHAR(255) not null,
    PRIMARY KEY (discription_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id))`;

  connection.query(createProductDiscription, (err, results, fields) => {
    if (err) console.log(err);
  });

  let createProductPrice = `CREATE TABLE  if not exists ProductPrice(price_id int auto_increment,
    product_id int,
    starting_price VARCHAR(255) not null,
    price_range VARCHAR(255) not null,
    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id))`;

  connection.query(createProductPrice, (err, results, fields) => {
    if (err) console.log(err);
  });

  let createUser = `CREATE TABLE  if not exists User(user_id int auto_increment,
    User_name VARCHAR(255) not null,
    User_password VARCHAR(255) not null,
    PRIMARY KEY (user_id))`;

  connection.query(createUser, (err, results, fields) => {
    if (err) console.log(err);
  });

  let createOrders = `CREATE TABLE  if not exists Orders(order_id int auto_increment,
    product_id int,
    user_id int,
    PRIMARY KEY (order_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (user_id) REFERENCES User (user_id))`;

  connection.query(createOrders, (err, results, fields) => {
    if (err) console.log(err);
  });

  res.send("Table Created");
});

/**
//  Question 3: Create an HTML file called, “index.html” with a form to populate the
// "products" table you created above.
// ● The form on the HTML page should send a POST request to a URL named
// "/add-product"
// ● Use Express to receive the POST request
// ● Use the body-parser module to parse the POST request sent to your Express server
// ● Write a SQL query to insert the data received from the HTML form into the
// "products" table
// Please find further instructions under the “Instructions for question 3” below.
 
 
//     Instructions for question 3
// ● This question is basically asking you to write a query that adds all the information
// entered into the HTML form into your products table (in your database) when you
// run your localhost in your browser using the “/addiphones” URL
// ● You will need to include the correct URL address in your form’s “action” attribute.
// Make sure this URL address includes the correct port number that matches the port
// number you used when you created your Express server
// ● Install the body-parser module from NPM and import it into your app. body-parser is
// a module that captures all the information entered in an HTML form and parses
// (separates them into easily processed units) them in an object form. Because the data
// from HTML forms are now in an object form, it will become easy to access them.
// ● Install the CORS module from NPM and import it into your app. Web browsers by
// default don't allow cross-origin resource sharing/CORS. CORS is a built-in browser
// security feature that protects unknown websites from accessing/using your website's
// resources. You need the CORS module installed to allow your Express server to have
// access to the form URL.
// ● Now you will write a SQL query to insert the data received from the HTML form into
// the "products" table
// ● Make sure to execute the query you wrote to insert the data. Please show either an
// error message or a message showing the insertion of form data into your tables when
// the “/addiphones” URL is visited.
// ● Open your HTML file in your browser, fill out the form and submit it.
// ● Now, go to your database. If there is no error, you will see the information from the
// HTML form inserted into the respective tables in your database.

 
//  */
//middle ware to extract info from the html
// app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/addiphones", (req, res) => {
  const {
    url,
    name,
    briefDescription,
    fullDescription,
    img,
    link,
    price,
    range,
    user_name,
    password,
  } = req.body; // object distructuring
  let insertProduct = `INSERT INTO products(product_url, product_name) VALUES ('${url}', '${name}')`;

  connection.query(insertProduct, (err, results) => {
    if (err) throw err;
    console.log("1 record inserted");
  });

  let insertUser = `INSERT INTO user(User_name, User_password) VALUES ('${user_name}', '${password}')`;

  connection.query(insertUser, (err, results) => {
    if (err) throw err;
    console.log("1 record inserted");
  });

  connection.query(
    `SELECT product_id, user_id FROM products JOIN User WHERE product_url = "${url}" AND user_name = "${user_name}"`,
    (err, rows) => {
      if (err) console.log(err);
      console.log(rows);
      let newAddedProductID = rows[0].product_id;
      let newAddedUserID = rows[0].user_id;
      let insertProductDiscription = `INSERT INTO productdescription(product_id, product_brief_description,product_description,product_img, product_link) VALUES ("${newAddedProductID}", "${briefDescription}", "${fullDescription}", "${img}", "${link}")`;

      let insertProductPrice = `INSERT INTO productprice (product_id, starting_price, price_range) VALUES ("${newAddedProductID}", "${price}", "${range}")`;

      let insertproductOrders = `INSERT INTO orders(product_id, user_id) VALUES("${newAddedProductID}", "${newAddedUserID}")`;

      connection.query(insertProductDiscription, (err, results) => {
        if (err) throw err;
        console.log("Product price inserted");
      });

      connection.query(insertProductPrice, (err, results) => {
        if (err) throw err;
        console.log("Product price inserted");
      });
      connection.query(insertproductOrders, (err, results) => {
        if (err) throw err;
        console.log("Product price inserted");
      });
    }
  );

  res.end("data inserted");
});

// OR work without selection only by results.insertId i.e insertId is amethod on result
// app.post("/addiphones", (req, res) => {
//   const { url, name, briefDescription, fullDescription, img, link, price, range, user_name, password} = req.body; // object distructuring

//   let insertProduct = `INSERT INTO products(product_url, product_name) VALUES ('${url}', '${name}')`;
//   connection.query(insertProduct, (err, results) => {
//     if (err) throw err;
//     console.log("1 record inserted");
//     console.log(results);

//   let insertUser = `INSERT INTO user(User_name, User_password) VALUES ('${user_name}', '${password}')`;
//   connection.query(insertUser, (err, row) => {
//     if (err) throw err;
//     console.log("1 record inserted");

//     let insertProductDiscription = `INSERT INTO productdescription(product_id, product_brief_description,product_description,product_img, product_link) VALUES ("${results.insertId}", "${briefDescription}", "${fullDescription}", "${img}", "${link}")`;

//     let insertProductPrice = `INSERT INTO productprice (product_id, starting_price, price_range) VALUES ("${results.insertId}", "${price}", "${range}")`;

//     let insertproductOrders = `INSERT INTO orders(product_id, user_id) VALUES("${results.insertId}", "${row.insertId}")`;

//     connection.query(insertProductDiscription, (err, results) => {
//       if (err) throw err;
//       console.log("Product price inserted");
//     });

//     connection.query(insertProductPrice, (err, results) => {
//       if (err) throw err;
//       console.log("Product price inserted");
//     });
//     connection.query(insertproductOrders, (err, results) => {
//       if (err) throw err;
//       console.log("Product price inserted");
//     });
//   }
//   );
// })
//   res.end("data inserted");
// });

app.get("/iphones", (req, res) => {
  connection.query(
    "SELECT * FROM products p JOIN productdescription pd JOIN productprice pp ON p.product_id = pd.product_id AND p.product_id = pp.product_id",
    (err, rows, fields) => {
      let iphones = { products: [] };
      iphones.products = rows;
      var stringIphones = JSON.stringify(iphones);
      if (!err) res.end(stringIphones);
      else console.log(err);
    }
  );
});

// app.get("/iphones", (req, res) => {
//   connection.query(
//     "SELECT product_name AS Name, product_brief_description AS PBD, starting_price AS 'Bignning Price' FROM products p JOIN productdescription pd JOIN productprice pp ON p.product_id = pd.product_id AND p.product_id = pp.product_id",
//     (err, rows, fields) => {
//       let iphones = { products: [] };
//       // console.log(iphones);
//       iphones.products = rows;
//       // console.log(rows);
//       var stringIphones = JSON.stringify(iphones);
//       if (!err) res.end(stringIphones);

//       else console.log(err);
//       // console.log(stringIphones);
//     }
//   );
// });

const PORT = 1234;
hostName = "localhost";
app.listen(PORT, () => {
  console.log(`Server running at ${PORT} http://${hostName}:${PORT}`);
});
