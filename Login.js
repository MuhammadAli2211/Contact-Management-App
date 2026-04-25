function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let foundUser = null;

    for (let i = 0; i < users.length; i++) {

        if (users[i].email === email && users[i].password === password) {
            foundUser = users[i];
            break;
        }
    }

    if (foundUser) {
        alert("Login Successful!");


        window.location.href = "Form.html";
    } else {
        alert("Invalid Email or Password!");
    }

    return false;
}
