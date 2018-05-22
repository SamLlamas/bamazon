var mysql = require("mysql");
var inquirer = require("inquirer");
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
    var query1 = "SELECT * FROM bamazon.products;";
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
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    listAll();
                    break;

                case "View Low Inventory":
                    listLow();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    newProduct();
                    break;
            }
        });
}

var listAll = function () {
    var query = "SELECT * FROM bamazon.products;";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity + "\n");   
        }
        runSearch();
    });
    

}

var listLow = function () {
    var query = "SELECT * FROM bamazon.products WHERE stock_quantity < 5;";
    connection.query(query, function (err, res) {
        if (res.length == 0){
            console.log("Nothing's running low!")
        }
        else { 
            for (var i = 0; i < res.length; i++) {
                console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity + "\n");
            }
        }
        runSearch();
    });
}

function addInventory() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message: "What Item would you like to add Inventory to?",
                choices: tablelength
            },
            {
                name: "number",
                type: "input",
                message: "How much would you like to add?",
                validate: function (value) {
                    if (Number.isInteger(parseInt(value))) {
                        return true;
                    }
                    else {
                        return "please enter a number"
                    }
                }
            }
        ]).then(function (answer) {
            var query = "SELECT * FROM bamazon.products WHERE item_id =" + answer.action + ";";
            connection.query(query, function (err, res) {
                var item = res[0];
                var query = "UPDATE bamazon.products SET ? WHERE ?";
                connection.query(query, [
                    {
                        stock_quantity: (parseInt(item.stock_quantity) + parseInt(answer.number))
                    },
                    {
                        item_id: answer.action
                    }
                ], function (err) {
                    if (err) throw err;
                    console.log("You've added " + answer.number + " units to " + item.product_name + " Inventory");
                    runSearch();
                });
            });
        });
}

function newProduct() {
    inquirer
        .prompt([
        {
            name: "item_name",
            type: "input",
            message: "What would you like to add?"
        },
        {
            name: "department_name",
            type: "input",
            message: "What Department does it belong to?"
        },
        {
            name: "price",
            type: "input",
            message: "how much is it?",
            validate: function (value) {
                if (Number.isInteger(parseInt(value))) {
                    return true;
                }
                else {
                    return "please enter a number"
                }
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units are you adding?",
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
      "INSERT INTO bamazon.products SET ?",
      {
        product_name: answer.item_name,
        department_name: answer.department_name,
        price: answer.price,
        stock_quantity: answer.quantity
      },
      function(err, res) {
          console.log("Inventory updated!");
          runSearch();
      }
    );
  });
}
