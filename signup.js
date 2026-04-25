function signup() {

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (username === "" || email === "" || password === "") {
        alert("Please fill all fields!");
        return false;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let newUser = {
        id: users.length + 1,
        username: username,
        email: email,
        password: password
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));


    window.location.href = "Login.html";

    return false;
}
