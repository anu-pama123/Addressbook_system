import { writeDataToJsonfile, loadDataFromJsonFile, printAddressData,readInput, updateObject, prompt } from "./utils";

interface personBase {
    firstName : string;
    lastName : string;
    emailId : string;
    phoneNumber : number;
    city :string;
    state : string;
    zipCode : number;
}

interface adressbookBase {
    addNewItem(): void;
    printItems(): void;
    writeDataToFile(): void;
    loadDataFromFile(): any;
    updateDataBasedName(): void;
    deleteItemBasedOnName(): void;
    searchItemBasedOnName(): void;
}

class Person implements personBase{

    constructor(public firstName:string, public lastName:string, public emailId:string, public phoneNumber:number, public city:string, public state:string, public zipCode:number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
    
}

class addressBookMain implements adressbookBase {
    public nameAddressMap = Object;
    constructor(){
        this.nameAddressMap = this.loadDataFromFile()
    }
    
    addNewItem() {
        let userData = readInput();
        let personObj = new Person(userData["firstName"], userData["lastName"], userData["emailId"], userData["phoneNumber"], userData["city"], userData["state"], userData["zipCode"]);
        this.nameAddressMap[userData["firstName"]] = {
            "person": personObj,
        };
        console.log('~~~~~~~~~~~')
        console.log(this.nameAddressMap);
    }
    
    printItems(){
        console.log('+++++++++++++++');
        console.log(this.nameAddressMap);
        console.log("\n------------------\n")
        for (let key in this.nameAddressMap) {
            let value = this.nameAddressMap[key];
            printAddressData(value['person'])
        }
        console.log("\n------------------\n")
    }
        
    writeDataToFile(){
        writeDataToJsonfile(this.nameAddressMap);
    }
    
    loadDataFromFile(){
        let nameAddressMap = Object;
        let addressBookData = loadDataFromJsonFile();
        for(var record of addressBookData){
            let personObj = new Person(record["firstName"], record["lastName"], record["emailId"], record["phoneNumber"], record["city"], record["state"], record["zipCode"]);
            nameAddressMap[record["firstName"]] = {
                "person": personObj,
            };
        }
        return nameAddressMap;
    }

    deleteItemBasedOnName(){
        console.log("Enter the name")
        let userName = prompt();
        delete this.nameAddressMap[userName];
        console.log('Deleted !!!')
    }

    updateDataBasedName(){
        console.log("Enter the name")
        let userName = prompt();
        let selectedUserObj = this.nameAddressMap[userName]
        let userData = readInput();
        console.log(userName);
        console.log(this.nameAddressMap);
        updateObject(userData, selectedUserObj['person'])
    }

    searchItemBasedOnName(){
        console.log("Enter the name")
        let userName = prompt();
        for (let key in this.nameAddressMap) {
            let value = this.nameAddressMap[key];
            if(value.person.firstName == userName) {
                console.log('Found person !!');
                console.log(value.person); 
            }
        }
    }
}

function main() {
    let addressBookObj = new addressBookMain()
    while(1){
        console.log('Select your choice\n \n1.exit \n2.Add Item\n3.Display Items\n4.Update\n5.Delete\n6.Search\n\n')
        let userChoice = parseInt(prompt());
        if(userChoice==1){
            console.log("exit")
            addressBookObj.writeDataToFile()
            break;
        }
        switch(userChoice){
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
export {};





