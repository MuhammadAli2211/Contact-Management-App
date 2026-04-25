let editIndex = null;
let submitBtn = document.querySelector("button[type='submit']");

function saveContact() {

    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let bio = document.getElementById("bio").value;
    let image = document.getElementById("image").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let contact = document.getElementById("contact").value;

    let gender = "";
    let radios = document.getElementsByName("gender");

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            gender = radios[i].value;
        }
    }
    let newContact = {
        firstName,
        lastName,
        email,
        bio,
        image,
        age,
        address,
        contact,
        gender
    };

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    
    
    if (editIndex === null) {
        
        contacts.push(newContact);
    } 
    else {
        contacts[editIndex] = newContact;
        editIndex = null;
        submitBtn.innerText = "Save ";
    }


    localStorage.setItem("contacts", JSON.stringify(contacts));

    displayContacts();
    document.querySelector("form").reset();

    return false;
}

function displayContacts() {

    let container = document.getElementById("output");

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    let html = "";

    contacts.forEach((data, index) => {

            html += `
            <div class="user-card">
                <div><b>Name:</b> ${data.firstName} ${data.lastName}</div>
                <div><b>Email:</b> ${data.email}</div>
                <div><b>Bio:</b> ${data.bio}</div>
                <img src="${data.image}" class="profile-img">
                <div><b>Age:</b> ${data.age}</div>
                <div><b>Address:</b> ${data.address}</div>
                <div><b>Contact:</b> ${data.contact}</div>
                <div><b>Gender:</b> ${data.gender}</div>    
                <button type="button" class="edit-btn" onclick="editContact(${index})">Edit</button>
                <button type="button" class="delete-btn" onclick="deleteContact(${index})">Delete</button>

            </div>`;
        });

        container.innerHTML = html;
    }


     function deleteContact(index) {

        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

        contacts.splice(index, 1);

        localStorage.setItem("contacts", JSON.stringify(contacts));

        displayContacts();

        alert("Contact deleted successfully!");
    }

function editContact(index) {

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let data = contacts[index];


    document.getElementById("fname").value = data.firstName;
    document.getElementById("lname").value = data.lastName;
    document.getElementById("email").value = data.email;
    document.getElementById("bio").value = data.bio;
    document.getElementById("image").value = data.image;
    document.getElementById("age").value = data.age;
    document.getElementById("address").value = data.address;
    document.getElementById("contact").value = data.contact;


    let gender = "";
    let radios = document.getElementsByName("gender");
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].value === data.gender) {
            radios[i].checked = true;
        }
    }

    editIndex = index;

    document.querySelector("button[type='submit']").innerText = "Update Contact";
}
function logout() {
    window.location.href = "index.html";
}

window.onload = displayContacts;
