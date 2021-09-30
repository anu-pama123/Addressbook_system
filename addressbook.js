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
    }
    addressBookMain.prototype.addNewItem = function () {
        var userData = utils_1.readInput();
        var personObj = new Person(userData["firstName"], userData["lastName"], userData["emailId"], userData["phoneNumber"], userData["city"], userData["state"], userData["zipCode"]);
        this.nameAddressMap[userData["firstName"]] = {
            "person": personObj
        };
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
    return addressBookMain;
}());
function main() {
    var addressBookObj = new addressBookMain();
    while (1) {
        console.log('Select your choice\n \n1.exit \n2.Add Item\n3.Display Items\n4.Update\n5.Delete\n6.Sort\n\n');
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
            default:
                console.log("Invalid input");
                break;
        }
    }
}
main();
