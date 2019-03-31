const addContactBtn = document.getElementById('addContactBtn');
const contactsList = document.getElementById('contactsList');
const contactNameInput = document.getElementById('nameInput');
const contactPhoneInput = document.getElementById('phoneInput');
const contactAgeInput = document.getElementById('ageInput');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;

addContactBtn.addEventListener('click', onAddContactBtnClick);
contactsList.addEventListener('click', onContactsListClick);
addContact({name: 'Alex', phone:'111'});

function onAddContactBtnClick(){
    submitContact();
}

function onContactsListClick(event){
    if (event.target.tagName === 'BUTTON'){
        removeContact(event.target.attributes['contact-id'].value);
    }
}

function removeContact(contactId){
    const el = document.getElementById('contact' + contactId);
    el && el.remove();
}

function submitContact(){
    const contact = {
        name: contactNameInput.value,
        phone: contactPhoneInput.value,
        age: contactAgeInput.value,
    }
    addContact(contact);
    resetContactForm();
}

function addContact(contact){
    contact.id = Date.now();

    const contactTr = document.createElement('tr');
    contactTr.id = 'contact' + contact.id;

    contactTr.innerHTML = contactTemplate
                .replace('{{name}}', contact.name)
                .replace('{{phone}}', contact.phone)
                .replace('{{age}}', contact.age || '-')
                .replace('{{id}}', contact.id)

    contactsList.appendChild(contactTr);

}

function resetContactForm(){
    contactNameInput.value = '';
    contactPhoneInput.value = '';
    contactAgeInput.value = '';
}
