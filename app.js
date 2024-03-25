const username = document.getElementById("username");
const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const verification = document.getElementById("verification");

const formBody = JSON.parse(localStorage.getItem("form_body"));

function showerror(input, message) {
  const formcontrol = input.parentElement;
  formcontrol.className = "form-control error";
  const small = formcontrol.querySelector("small");
  small.innerText = message;
}

function showsuccess(input) {
  const formcontrol = input.parentElement;
  formcontrol.className = "form-control success";
}

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showsuccess(input);
    return true;
  } else {
    showerror(input, "email is not valid");
    return false;
  }
}
function checkPaswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showerror(input2, "password does not match");
    return false;
  } else {
    return true;
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showerror(input, `${getFieldname(input)} is required`);
      return false;
    } else {
      showsuccess(input);
      return true;
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showerror(input, `${getFieldname(input)} must be at least ${min}`);
    return false;
  } else if (input.value.length > max) {
    showerror(input, `${getFieldname(input)} cannot be more than ${max}`);
    return false;
  } else {
    showsuccess(input);
    return true;
  }
}
//get fieldname
function getFieldname(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, verification]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 15);
  checkEmail(email);
  checkPaswordMatch(password, verification);

  if (
    username.value !== "" &&
    password.value !== "" &&
    email.value !== "" &&
    verification.value !== ""
  ) {
    if (
      checkLength(username, 3, 15) &&
      checkLength(password, 6, 15) &&
      checkEmail(email) &&
      checkPaswordMatch(password, verification)
    ) {
      const body = {
        username: username.value,
        email: email.value,
        password: password.value,
        verification: verification.value,
      };

      localStorage.setItem("form_body", JSON.stringify(body));
      window.location.href = "./login.html";
    }
  }
});
