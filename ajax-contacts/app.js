$(function(){
    const INVALID_CLASS = 'invalid';
    const URL = 'http://fep-app.herokuapp.com/api/contacts';
    const PATTERNS = {
        emailInput: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phoneInput: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
    }
    const $contactForm = $('#contactForm');
    const $contactsList = $('#contactsList');
    const $contactIdInput = $('#idInput');
    const $contactNameInput = $('#nameInput');
    const $contactPhoneInput = $('#phoneInput');
    const $contactEmailInput = $('#emailInput');
    const $dialog = $('#dialog-form').dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            Create: submitContact,
            Cancel: function () {
                $dialog.dialog('close');
            }
        },
        close: resetContactForm
    });

    // const contactsListFooter = document.getElementById('contactsListFooter');
    // const contactFormRow = document.getElementById('contactFormRow');
    const contactTemplate = $('#contactTemplate').html();

    let contacts = [];
    init()
    function init(){
        $contactForm.on('submit', contactFormSubmit);
        // contactForm.addEventListener('submit', contactFormSubmit);
        $contactsList.on('click', 'button', onContactsListButtonClick);
        $('#addContactBtn').on('click', ()=> $dialog.dialog('open'));
        $($contactPhoneInput).add($contactEmailInput).on('input', validateInput)

        fetchContacts();
    }

    function validateInput(){
        const $el = $(this);
        const name = $el.attr('name');
        const value = $el.val();

        if (PATTERNS[name].test(value)){
            $el.removeClass(INVALID_CLASS);
        } else {
            $el.addClass(INVALID_CLASS);
        }
    }

    function fetchContacts(){
        return $.ajax(URL)
                .then(setContacts)
                .then(rendeContacts);
    }

    function setContacts(data){
        return contacts = data
    }

    function rendeContacts(data){
        $contactsList.html(data.map((contact) => {
            return contactTemplate
                .replace('{{id}}', contact.id)
                .replace('{{name}}', contact.name)
                .replace('{{phone}}', contact.phone)
                .replace('{{email}}', contact.email)
                .replace('{{class}}', contact.is_active? 'active': '')
        }).join('\n'));
    }

    function contactFormSubmit(e){
        e.preventDefault();

        submitContact();
    }

    function onContactsListButtonClick(){
        $el = $(this);
        switch($el.data('type')){
            case 'edit': editContact($el.closest('.contact-row').data('contactId'));
                break;
            case 'delete': removeContact($el.closest('.contact-row').data('contactId'))
                            .then(fetchContacts); 
                break;
        }
    }

    function editContact(id){
        const contact = contacts.find(c => c.id == id);

        $contactIdInput.val(contact.id);
        $contactNameInput.val(contact.name);
        $contactPhoneInput.val(contact.phone);
        $contactEmailInput.val(contact.email);

        $dialog.dialog('open')
   }

    function removeContact(id){
        return $.ajax(URL + '/' + id, {method: 'DELETE'});
    }

    function updateContact(contact){
        return $.ajax(URL + '/' + contact.id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(contact)
        });
    }

    function submitContact(){
        const $invalidItems = $contactForm.find(`.${INVALID_CLASS}`);

        if ($invalidItems.length){
            return alert('Please fix validation errors');
        }

        const contact = {
            name: $contactNameInput.val(),
            phone: $contactPhoneInput.val(),
            email: $contactEmailInput.val(),
            is_active: true
        }

        let savePromise;

        if ($contactIdInput.val()){
            contact.id = $contactIdInput.val();
            savePromise = updateContact(contact);
        } else {
            savePromise = addContact(contact);
        }

        savePromise
            .then(fetchContacts);

        // resetContactForm();
        $dialog.dialog('close')
    }

    function addContact(contact){
        return $.ajax(URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(contact)
        });
    }

    function resetContactForm(){
        $contactForm[0].reset();
    }
})
