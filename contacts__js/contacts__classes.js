/* class User {
    constructor(name){
        this.name = name;
        this.start();
    } // -------------------------------- constructor самозапускается
    start(){
        console.log(this.name)
    }

    get userName(){
        return this.name;
    }
    
    set userName(newName){
        this.name = newName;
    }
}
  

const user = new User('alex');
console.log(user) */

/* class User {
    constructor(userData){
        
        this.data = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            address: userData.address,
            phone: userData.phone,
        }
    }
} */

//----------------------------------------------------------------------

class User {
    constructor({id, name, email, address, phone}){
        
        this.data = {
            id: `${Math.round(performance.now())}`,
            name,
            email,
            address,
            phone,
        }
    }

    edit(data){
        this.data = data;
    }

    get(){
        return this.data;
    }
}

class Contacts {

/*     newUserData = {
        name: 'Steve',
        email: 'st@gmail.com',
        address: 'NY',
        phone: '+111222333',
    } */

    constructor(){
        this.contactsData = [
            /* new User({id: 1,
                name: 'Val',
                email: 'val@gmail.com',
                address: 'Minsk',
                phone: '+123456789',}),
            new User({id: 2,
                name: 'Max',
                email: 'max@gmail.com',
                address: 'Moscow',
                phone: '+987654321',}) */
        ];
    }

    add(userData){
        const addedUser = new User(userData);
        this.contactsData.push(addedUser);
    }

    edit(idUser, newUserData){
        this.contactsData = this.contactsData.map((userContacts) => {

            const id = userContacts.get().id;
            const userData = userContacts.get();

           if(id === idUser){
            userContacts.edit({
                ...userData,
                ...newUserData, // spread-оператор
            });
           }
           return userContacts;
        });
    }

    remove(idUser){
        this.contactsData = this.contactsData.filter((userContacts) => {
            const id = userContacts.get().id;
            return id !== idUser;
        });
    }

    get(){
        return this.contactsData;
    }
}
 
class ContactsApp extends Contacts{
    constructor(data){
        super(data);

        this.rootElem = document.querySelector('.app');

        if(!this.rootElem) return;
        
        const contacts = document.createElement('div');
        contacts.classList.add('contacts');

        contacts.innerHTML = `
        <div class="contacts__wrapper">
            <h1 class="contacts__logo gradient">
                <span>📞</span>
                MY CONTACTS</h1>
                <div class="contacts__form">
                    <h3 class="contacts__title">ADD NEW CONTACT</h2>
                    <input type="text" placeholder="Name ... 🖊" class="contacts__input contacts__input_name">
                    <input type="text" placeholder="Email ... 🖊" class="contacts__input contacts__input_email">
                    <input type="text" placeholder="Address ... 🖊" class="contacts__input contacts__input_address">
                    <input type="text" placeholder="Phone ... 🖊" class="contacts__input contacts__input_phone">
                </div>
                <button class ="contacts__btnAdd gradient">S A V E</button>
                <div class="contacts__content">
                    <ul class="contacts_items"></ul>
                </div>        
        </div>`;

        this.rootElem.appendChild(contacts);

        this.btnAdd = document.querySelector('.contacts__btnAdd');

        if(!this.btnAdd) return;

        this.btnAdd.addEventListener('click', () => {
            this.onAdd();
        });
    }

    /* getCookie (name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    } */

    get = () => {
        this.ulElem = document.querySelector('.contacts_items');        

        if(!this.ulElem) return;

        this.ulElem.innerHTML = '';

        this.contactList = super.get();

        this.contactList.forEach((cnctct) => {
            const data = cnctct.get();
            const {id, name, email, address, phone} = data;

            this.liElem = document.createElement('li');
            this.liElem.classList.add('cnctct__info');        

            this.btnRemove = document.createElement('button');
            this.btnRemove.classList.add('contacts__btnRemove');
            this.btnRemove.classList.add('gradient');
            this.btnRemove.innerHTML = ' X ';

            //if (id) this.liElem.innerHTML += `<div class= "cnctct__id">${id}</div>`
            if (name) this.liElem.innerHTML += `<div class= "cnctct__name">Name: ${name}</div>`
            if (email) this.liElem.innerHTML += `<div class= "cnctct__email">Email: ${email}</div>`
            if (address) this.liElem.innerHTML += `<div class= "cnctct__address">Address: ${address}</div>`
            if (phone)this.liElem.innerHTML += `<div class= "cnctct__phone">Phone: ${phone}</div>`
            
            this.ulElem.append(this.liElem);
            this.liElem.append(this.btnRemove);

            this.liElem.addEventListener('dblclick', (event) => {
                this.onEdit(event, this.liElem, id);
            });

            this.btnRemove.addEventListener('click', () => {
                this.onRemove(id);
            });     
        });
    }

    onEdit = (event, liElem, id) => {
        if(!id || !this.liElem) return;

        this.cnctctName = this.liElem.querySelector('.cnctct__name');
        this.cnctctEmail = this.liElem.querySelector('.cnctct__email');
        this.cnctctAddress = this.liElem.querySelector('.cnctct__address');
        this.cnctctPhone = this.liElem.querySelector('.cnctct__phone');

        if (this.cnctctName) {
            this.cnctctName.contentEditable = "true";
            this.cnctctName.addEventListener('keyup', (event) => {
                console.log(id)
                this.onSave(event, id);
            });
            this.cnctctName.focus();
        }

        if (this.cnctctEmail) {
            this.cnctctEmail.contentEditable = "true";
            this.cnctctEmail.addEventListener('keyup', (event) => {
                this.onSave(event, id);
            });
            this.cnctctEmail.focus();
        }

        if (this.cnctctAddress) {
            this.cnctctAddress.contentEditable = "true";
            this.cnctctAddress.addEventListener('keyup', (event) => {
                this.onSave(event, id);
            });
            this.cnctctAddress.focus();
        }

        if (this.cnctctPhone) {
            this.cnctctPhone.contentEditable = "true";
            this.cnctctPhone.addEventListener('keyup', (event) => {
                this.onSave(event, id);
            });
            this.cnctctPhone.focus();
        }

        if (event.target == this.cnctctName) this.cnctctName.focus();
        if (event.target == this.cnctctEmail) this.cnctctEmail.focus();
        if (event.target == this.cnctctAddress) this.cnctctAddress.focus();
        if (event.target == this.cnctctPhone) this.cnctctPhone.focus();
    }

    onSave = (event, id) => {        
        if (event.code != 'Enter' || !event.ctrlKey) return;

        this.obj = {};

        if (event.target.classList.contains('cnctct__name')) {
            this.obj.name = event.target.innerHTML;
        }
        if (event.target.classList.contains('cnctct__email')) {
            this.obj.email = event.target.innerHTML;
        }
        if (event.target.classList.contains('cnctct__address')) {
            this.obj.address = event.target.innerHTML;
        }
        if (event.target.classList.contains('cnctct__phone')) {
            this.obj.phone = event.target.innerHTML;
        }

        super.edit(id, obj);

        event.target.contentEditable = "false";
    }

    onRemove = (id) => {
        if (!id) return;

        this.remove(id);
        this.get();
    }

    onAdd = () => {
       
        this.nameElem = this.rootElem.querySelector('.contacts__input_name');
        this.emailElem = this.rootElem.querySelector('.contacts__input_email');
        this.addressElem = this.rootElem.querySelector('.contacts__input_address');
        this.phoneElem = this.rootElem.querySelector('.contacts__input_phone');

        if (!this.nameElem || !this.phoneElem && !this.emailElem && !this.addressElem) return;

        this.obj = {};

        if (this.nameElem.value.length > 0) this.obj.name = this.nameElem.value;
        if (this.emailElem.value.length > 0) this.obj.email = this.emailElem.value;
        if (this.addressElem.value.length > 0) this.obj.address = this.addressElem.value;
        if (this.phoneElem.value.length > 0) this.obj.phone = this.phoneElem.value;

        if (!this.obj.name || !this.obj.phone && !this.obj.email && !this.obj.address) return;
        console.log(this.obj)

        super.add(this.obj);

        this.nameElem.value = '';
        this.emailElem.value = '';
        this.addressElem.value = '';   
        this.phoneElem.value = '';     

        this.get();
    }     
 
} 

let contactsApp = new ContactsApp();
console.log(contactsApp)