import { writeDataToJsonfile, printAddressData,readInput,updateObject, prompt } from "./utils";

class Person {
    firstName : string;
    lastName : string;
    emailId : string;
    phoneNumber : number;
    city :string;
    state : string;
    zipCode : number;
    constructor(firstName:string, lastName:string, emailId:string, phoneNumber:number, city:string, state:string, zipCode:number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}

class addressBookMain {
    public nameAddressMap = Object;
    public addNewItem(): void;
    addNewItem() {
        let userData = readInput();
        let personObj = new Person(userData["firstName"], userData["lastName"], userData["emailId"], userData["phoneNumber"], userData["city"], userData["state"], userData["zipCode"]);
        this.nameAddressMap[userData["firstName"]] = {
            "person": personObj,
        };
    }
    public printItems(): void;
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
    
    public writeDataToFile(): void;
    writeDataToFile(){
        writeDataToJsonfile(this.nameAddressMap);
    }

    public updateDataBasedName(): void;
    updateDataBasedName(){
        console.log("Enter the name")
        let userName = parseInt(prompt());
        let selectedUserObj = this.nameAddressMap[userName]
        let userData = readInput();
        updateObject(userData, selectedUserObj['person'])
    }
}

function main() {
    let addressBookObj = new addressBookMain()
    while(1){
        console.log('Select your choice\n \n1.exit \n2.Add Item\n3.Display Items\n4.Update\n5.Delete\n6.Sort\n\n')
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
            default:
                console.log("Invalid input");
                break;
        }
    }
}
main();
export {};