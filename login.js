const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");

const formBody = JSON.parse(localStorage.getItem("form_body"));
// if (formBody) {
//   // email.value = formBody.email;
//   // username.value = formBody.username;
// }

function showerror(input, message) {
  // this can also be used=  const formcontrol = document.querySelector(".form_control");
  const formcontrol = input.parentElement;
  formcontrol.className = "form-control error";
  const small = formcontrol.querySelector("small");
  small.innerText = message;
}
//show success
function showsuccess(input) {
  // this can also be used=  const formcontrol = document.querySelector(".form_control");
  const formcontrol = input.parentElement;
  formcontrol.className = "form-control success";
}

function checkUser(input) {
  if (username.value !== formBody.username) {
    showerror(input, "username is incorret");
    return false;
  } else {
    showsuccess(input);
    return true;
  }
}

function checkPassword(input) {
  if (password.value !== formBody.password) {
    showerror(input, "password is incorret");
    return false;
  } else {
    showsuccess(input);
    return true;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkUser(username);
  checkPassword(password);

  if (username.value !== "" && password.value !== "") {
    if (checkUser(username) && checkPassword(password)) {
      setTimeout(() => {
        window.location.href = "../web/home.html";
      }, 2000);
    }
  }
});
