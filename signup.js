const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const verification = document.getElementById("verification");

// const formBody = JSON.parse(localStorage.getItem("form_input"));

// if (formBody) {
//   email.value = formBody.email;
//   username.value = formBody.username;
// }

//show input error
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

//check email
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
//check password match
function checkPaswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showerror(input2, "password does not match");
    return false;
  } else {
    return true;
  }
}

//event listeners
// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   if (username.value === "") {
//     showerror(username, "username is required");
//   } else {
//     showsuccess(username);
//   }

//   if (email.value === "") {
//     showerror(email, "email is required");
//   } else if (!isvalidemail(email.value)) {
//     showerror(email, "email is invalid");
//   } else {
//     showsuccess(email);
//   }

//   if (password.value === "") {
//     showerror(password, "password is required");
//   } else {
//     showsuccess(password);
//   }

//   if (password2.value === "") {
//     showerror(password2, "verify password");
//   } else {
//     showsuccess(password2);
//   }
// });

//check required fields
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
//check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showerror(
      input,
      `${getFieldname(input)} must be at least ${min} characters`
    );
    return false;
  } else if (input.value.length > max) {
    showerror(
      input,
      `${getFieldname(input)} must be less than ${max} characters`
    );
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

//event liteners
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
    if (checkPaswordMatch(password, verification)) {
      const body = {
        username: username.value,
        email: email.value,
        password: password.value,
        verification: verification.value,
      };

      localStorage.setItem("form_input", JSON.stringify(body));
    }
  }
});
