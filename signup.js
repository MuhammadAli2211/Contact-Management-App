function signup() {

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || email === "" || password === "") {
        alert("Please fill all fields!");
        return false;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            alert("Email already exists!");
            return false;
        }
    }

    let newUser = {
        id: users.length + 1,
        username,
        email,
        password
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup Successful!");
    window.location.href = "Login.html";

    return false;
}
window.onload = function () {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        window.location.replace("Form.html");
    }

};
    
