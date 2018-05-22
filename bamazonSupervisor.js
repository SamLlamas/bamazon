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
                "Create New Department",
                "quit"
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
                case "quit":
                    connection.end();
            }
        });
}

var listAll = function () {
    var query = "SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) AS product_sales, SUM(p.product_sales)- d.over_head_costs AS total_profit FROM departments d LEFT JOIN products p ON d.department_name = p.department_name GROUP BY department_name ORDER BY department_id;";
    var table = new Table({
        head: ['department_id', 'department_name', "over_head_costs", "product_sales", "total_profit"]
      , colWidths: [15, 15,15,15,15]
    });
    
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            var items = res[i]
            if (items.product_sales != null){
                table.push([items.department_id, items.department_name, items.over_head_costs, items.product_sales, items.total_profit]);
            }
            else{
                table.push([items.department_id, items.department_name, items.over_head_costs, 0, (0 - (items.over_head_costs))]);
            }         
            // console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity + "\n");   
        }
        console.log(table.toString());
        runSearch();
    });
}

function newDepartment() {
    inquirer
        .prompt([
        {
            name: "name",
            type: "input",
            message: "what department would you like to add?"
        },
        {
            name: "price",
            type: "input",
            message: "what is its overhead cost?",
            validate: function (value) {
                if (Number.isInteger(parseInt(value))) {
                    return true;
                }
                else {
                    return "please enter a number"
                }
            }
        }]).then(function (answer) {
    console.log("Inserting new product \n");
    var query = connection.query(
      "INSERT INTO departments SET ?",
      {
        department_name: answer.name,
        over_head_costs: answer.price,
      },
      function(err, res) {
          console.log("Departments Updated");
          runSearch();
      }
    );
  });
}