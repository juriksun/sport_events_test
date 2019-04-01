"use strict";

window.onload = () => {
    setFormSubmit();
    getAllPhones();
};

let formStatus = 'new';

// declare the submit functional new delite
let setFormSubmit = () => {
    let form = document.getElementsByClassName('user_form')[0];

    form.onsubmit = (e) => {
        e.preventDefault();

        let full_name = form.elements['full_name'].value;
        let phone = form.elements['phone'].value
        
        if(formStatus === "new"){
            fetch('php/add_phone.php', {
                method: 'POST',
                body: JSON.stringify({
                    "full_name": full_name,
                    "phone": phone
                })
            })
            .then(data =>{
                try{
                    return data.json();
                } catch(e){
                    return data.text();
                }
            })
            .then(data => {
                console.log(data);
                if(data.status){
                    alert(`The new phone of ${full_name} was added.`);
                    // run get all phones and update the the phones list
                } else {
                    alert('error. the phone was not deleted. please try again.');
                }
            })
            .catch(err => {
                alert('error. the phone was not deleted. please try again.' + err);
            });
        }
    };
};

// get all phones form db
let getAllPhones = () => {

    fetch('php/get_all_phones.php')
    .then(data =>{
        try{
            return data.json();
        } catch(e){
            return data.text();
        }
    })
    .then(data => {
        console.log(data);
        if(data.status){
            console.log(data.phones);
            listAllPhones(data.phones);
        } else {
            
        }
    })
    .catch(err => {
        alert('error. the phone was not deleted. please try again.' + err);
    });

    
};

// add to dome all phones from db
let listAllPhones = (phones) => {
    let bookContent = document.getElementsByClassName('book_content')[0];

    for (let i = 0; i < phones.length; i++){
        let phoneElement = `
            <div class="phone_element" onclick="clickOnPhoneElement(${JSON.stringify(phones[i])})">
                <div class="name_list">${phones[i].full_name}</div>
                <div class="phone_list">${phones[i].phone}</div>
            </div>
        `;
        bookContent.insertAdjacentHTML('beforeend', phoneElement);
    }
};

// choose the phone and add it to form
let clickOnPhoneElement = (el) => {
    let form = document.getElementsByClassName('user_form')[0];
    form.elements["full_name"].value = el.full_name;
    form.elements["phone"].value = el.phone;
    chengeFormStatus();
}

// chenge the form status and lable
let chengeFormStatus = () => {
    formStatus = "edit";
    document.getElementsByClassName('form_status')[0].innerHTML = "Edit User";
};














