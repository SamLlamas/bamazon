var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var tablelength = [];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    
    runSearch();
});

function runSearch() {
    tablelength = [];
    var query1 = "SELECT * FROM products;";
    connection.query(query1, function (err, res) {
        for (i =0; i < res.length; i++){
            tablelength.push(String(i+1));
        }
    });
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    listAll();
                    break;

                case "Create New Department":
                    newDepartment();
                    break;
            }
        });
}

var listAll = function () {
    var query = "SELECT department_name, SUM(product_sales) FROM products GROUP BY department_name, product_sales;";
    connection.query(query, function (err, res) {
        console.log(res)
        var table = new Table({
            head: ['TH 1 label', 'TH 2 label']
          , colWidths: [20, 20]
        });
        for (var i = 0; i < res.length; i++) {
            var table = new Table({ head: ["", "department Name", "Product Sales"] });
            
            
            // console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity + "\n");   
        }
        runSearch();
    });
    

}

var newDepartment = function(){
    
}