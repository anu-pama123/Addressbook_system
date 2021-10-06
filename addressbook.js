"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var Person = /** @class */ (function () {
    function Person(firstName, lastName, emailId, phoneNumber, city, state, zipCode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
    return Person;
}());
var addressBookMain = /** @class */ (function () {
    function addressBookMain() {
        this.nameAddressMap = Object;
        this.nameAddressMap = this.loadDataFromFile();
    }
    addressBookMain.prototype.addNewItem = function () {
        var userData = utils_1.readInput();
        var personObj = new Person(userData["firstName"], userData["lastName"], userData["emailId"], userData["phoneNumber"], userData["city"], userData["state"], userData["zipCode"]);
        this.nameAddressMap[userData["firstName"]] = {
            "person": personObj
        };
        console.log('~~~~~~~~~~~');
        console.log(this.nameAddressMap);
    };
    addressBookMain.prototype.printItems = function () {
        console.log('+++++++++++++++');
        console.log(this.nameAddressMap);
        console.log("\n------------------\n");
        for (var key in this.nameAddressMap) {
            var value = this.nameAddressMap[key];
            utils_1.printAddressData(value['person']);
        }
        console.log("\n------------------\n");
    };
    addressBookMain.prototype.writeDataToFile = function () {
        utils_1.writeDataToJsonfile(this.nameAddressMap);
    };
    addressBookMain.prototype.loadDataFromFile = function () {
        var nameAddressMap = Object;
        var addressBookData = utils_1.loadDataFromJsonFile();
        for (var _i = 0, addressBookData_1 = addressBookData; _i < addressBookData_1.length; _i++) {
            var record = addressBookData_1[_i];
            var personObj = new Person(record["firstName"], record["lastName"], record["emailId"], record["phoneNumber"], record["city"], record["state"], record["zipCode"]);
            nameAddressMap[record["firstName"]] = {
                "person": personObj
            };
        }
        return nameAddressMap;
    };
    addressBookMain.prototype.deleteItemBasedOnName = function () {
        console.log("Enter the name");
        var userName = utils_1.prompt();
        delete this.nameAddressMap[userName];
        console.log('Deleted !!!');
    };
    addressBookMain.prototype.updateDataBasedName = function () {
        console.log("Enter the name");
        var userName = utils_1.prompt();
        var selectedUserObj = this.nameAddressMap[userName];
        var userData = utils_1.readInput();
        console.log(userName);
        console.log(this.nameAddressMap);
        utils_1.updateObject(userData, selectedUserObj['person']);
    };
    addressBookMain.prototype.searchItemBasedOnName = function () {
        console.log("Enter the name");
        var userName = utils_1.prompt();
        // let searchItem = this.nameAddressMap[userName].has;
        // this.nameAddressMap = searchItem;
        // console.log('Found Person !!!');
        // console.log(searchItem);
        for (var key in this.nameAddressMap) {
            var value = this.nameAddressMap[key];
            // printAddressData(value['person'])
            // console.log(value);
            // console.log(value.person.firstName);
            if (value.person.firstName == userName) {
                console.log('Found person !!');
                console.log(value.person);
            }
        }
    };
    return addressBookMain;
}());
function main() {
    var addressBookObj = new addressBookMain();
    while (1) {
        console.log('Select your choice\n \n1.exit \n2.Add Item\n3.Display Items\n4.Update\n5.Delete\n6.Search\n\n');
        var userChoice = parseInt(utils_1.prompt());
        if (userChoice == 1) {
            console.log("exit");
            addressBookObj.writeDataToFile();
            break;
        }
        switch (userChoice) {
            case 2:
                addressBookObj.addNewItem();
                break;
            case 3:
                addressBookObj.printItems();
                break;
            case 4:
                addressBookObj.updateDataBasedName();
                break;
            case 5:
                addressBookObj.deleteItemBasedOnName();
                break;
            case 6:
                addressBookObj.searchItemBasedOnName();
                break;
            default:
                console.log("Invalid input");
                break;
        }
    }
}
main();
