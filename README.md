# bamazon

## Overview
For this project, the focus was to test the usage of connecting Javascript with SQL. A database, called Bamazon, was created with
the tables Products and Department. This project contains 3 different JS files:
1) A customer JS
2) A Supervisor JS
3) A Manager JS
Each JS has its own distinct functions which relate to the name and their role within a store. Below are examples of said functions:

## Customer JS Functions:

![Image of CustomerFunction1](https://github.com/SamLlamas/bamazon/blob/master/images/Customer1.JPG)
On start, the customer JS displays a list of all possibile purchases and asks which item you would like to purchase.

![Image of CustomerFunction2](https://github.com/SamLlamas/bamazon/blob/master/images/Customer2.JPG)

On select, it then prompts for how many you would like to purchase. it then returns a total and closes out. 

## Supervisor JS Functions"

![Image of SupervisorFunction1](https://github.com/SamLlamas/bamazon/blob/master/images/Supervisor1.JPG)
Supervisor has 2 functions. The first joins both the department table with the products table to calculate the total profit per department 
and displays it accordingly

![Image of SupervisorFunction2](https://github.com/SamLlamas/bamazon/blob/master/images/Supervisor2.JPG)
The Second function gives the ability to add more departments along with their overhead costs. 

## Manager JS Functions: 
![Image of ManagerFunction1](https://github.com/SamLlamas/bamazon/blob/master/images/Manager2.JPG)
The first Manager function allows to the user to check inventory and displays it accordingly. 

![Image of ManagerFunction3](https://github.com/SamLlamas/bamazon/blob/master/images/Manager3.JPG)
The second function displays only inventory that is running low, meaning less than 5 in stock.

![Image of ManagerFunction4](https://github.com/SamLlamas/bamazon/blob/master/images/Manager4.JPG)
The third function gives the ability to restock inventory

![Image of ManagerFunction5](https://github.com/SamLlamas/bamazon/blob/master/images/Manager5.JPG)
the last function allows the manager to add new products to the inventory list

