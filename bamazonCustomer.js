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
    printAll();
    setTimeout(function () { runSearch(); }, 100);

});




function runSearch() {
    tablelength = [];
    var query1 = "SELECT * FROM bamazon.products;";
    connection.query(query1, function (err, res) {
        for (i = 0; i < res.length; i++) {
            tablelength.push(String(i + 1));
        }
    });
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message: "Which Item would you like to purchase",
                choices: tablelength
            },
            {
                name: "number",
                type: "input",
                message: "How much would you like to purchase?",
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
                if (answer.number <= item.stock_quantity) {
                    var query = "UPDATE bamazon.products SET ? , ? WHERE ?";
                    connection.query(query, [
                        {
                            stock_quantity: (item.stock_quantity - answer.number)
                        },
                        {
                            product_sales: (item.price * answer.number)
                        },
                        {
                            item_id: answer.action
                        }
                    ], function (err) {
                        if (err) throw err;
                        console.log("Your total is: " + (item.price * answer.number));
                        connection.end();
                    });
                }
                else {
                    console.log("Insufficient quantity!")
                    runSearch();
                }
            });
        });
}

var printAll = function () {
    var query = "SELECT * FROM bamazon.products;";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity + "\n");
        }
    });

}