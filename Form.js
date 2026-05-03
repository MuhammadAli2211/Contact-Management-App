let editIndex = null;
let submitBtn = document.querySelector("button[type='submit']");

function saveContact() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "Login.html";
        return false;
    }

    let firstName = document.getElementById("fname").value.trim();
    let lastName = document.getElementById("lname").value.trim();
    let email = document.getElementById("email").value.trim();
    let bio = document.getElementById("bio").value.trim();
    let image = document.getElementById("image").value.trim();
    let age = document.getElementById("age").value.trim();
    let address = document.getElementById("address").value.trim();
    let contact = document.getElementById("contact").value.trim();

    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        age === ""
    ) {
        alert("Please fill required fields!");
        return false;
    }

    let gender = "";

    let radios = document.getElementsByName("gender");

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            gender = radios[i].value;
        }
    }

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    let newContact = {
        id: Date.now(),
        userEmail: currentUser.email,
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


    // SAVE
    if (editIndex === null) {

        contacts.push(newContact);

    } else {

        // Security: sirf apna data edit ho
        if (contacts[editIndex].userEmail === currentUser.email) {

            newContact.id = contacts[editIndex].id;
            contacts[editIndex] = newContact;
        }

        editIndex = null;
        submitBtn.innerText = "Save Contact";
    }

    localStorage.setItem("contacts", JSON.stringify(contacts));

    document.querySelector("form").reset();

    displayContacts();

    return false;
}


function displayContacts() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    let container = document.getElementById("output");

    let html = "";

    for (let i = 0; i < contacts.length; i++) {

        let data = contacts[i];

        if (data.userEmail === currentUser.email) {

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

                <button type="button" class="edit-btn" onclick="editContact(${i})">Edit</button>

                <button type="button" class="delete-btn" onclick="deleteContact(${i})">Delete</button>

            </div>`;
        }
    }

    container.innerHTML = html;
}



function deleteContact(index) {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    if (contacts[index].userEmail === currentUser.email) {

        contacts.splice(index, 1);

        localStorage.setItem("contacts", JSON.stringify(contacts));

        displayContacts();

        alert("Deleted Successfully!");
    }
}



function editContact(index) {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    let data = contacts[index];

    if (data.userEmail !== currentUser.email) {
        return;
    }

    document.getElementById("fname").value = data.firstName;
    document.getElementById("lname").value = data.lastName;
    document.getElementById("email").value = data.email;
    document.getElementById("bio").value = data.bio;
    document.getElementById("image").value = data.image;
    document.getElementById("age").value = data.age;
    document.getElementById("address").value = data.address;
    document.getElementById("contact").value = data.contact;

    let radios = document.getElementsByName("gender");

    for (let i = 0; i < radios.length; i++) {

        radios[i].checked = false;

        if (radios[i].value === data.gender) {
            radios[i].checked = true;
        }
    }

    editIndex = index;

    submitBtn.innerText = "Update Contact";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function logout() {
    localStorage.removeItem("currentUser");
    window.location.replace("Login.html");
}


window.onload = function () {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.replace("Login.html");
        return;
    }

    displayContacts();
};
