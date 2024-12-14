var signupName = document.querySelector("#signupName");
var signupEmail = document.querySelector("#signupEmail");
var signupPassword = document.querySelector("#signupPassword");
var signupButton = document.querySelector("#signupButton");
var signinEmail = document.querySelector("#signinEmail");
var signinPassword = document.querySelector("#signinPassword");
var signinButton = document.querySelector("#signinButton");
var logoutButton = document.querySelector("#logoutButton");
var signupArr = [];

if (localStorage.getItem("signupArr") != null) {
  signupArr = JSON.parse(localStorage.getItem("signupArr"));
}

var regex = {
  signupName: {
    value: /^[a-z0-9_-]{3,15}$/,
    isvalid: false,
  },
  signupEmail: {
    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    isvalid: false,
  },
  signupPassword: {
    value: /^(?=.*[0-9]).{8,}$/,
    isvalid: false,
  },
};



var userName = localStorage.getItem("userName");
if (userName) {
  var cartona = `welcome ${userName}`;
  document.querySelector("#userName").innerHTML = cartona;
}

function emailExist() {
  for (var i = 0; i < signupArr.length; i++) {
    if (signupArr[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return false;
    }
  }
}

function signUp() {
  if (
    regex.signupName.isvalid &&
    regex.signupEmail.isvalid &&
    regex.signupPassword.isvalid &&
    signupName.value &&
    signupEmail.value &&
    signupPassword.value
  ) {
    var info = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };
    if (emailExist() == false) {
      document.getElementById("exist").innerHTML =
        '<span class="text-danger m-3">email already exists</span>';
    } else {
      document.getElementById("exist").innerHTML =
        '<span class="text-success m-3">Success</span>';
      signupArr.push(info);
      updateLocalStorage();
      location.href = "home.html";
      localStorage.setItem("userName", info.name);
      clear();
      signupName.classList.remove("is-valid");
      signupEmail.classList.remove("is-valid");
      signupPassword.classList.remove("is-valid");
    }
  } else {
    document.querySelector("#exist").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
  }
}
signupButton?.addEventListener("click", signUp);

function clear() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
}

function updateLocalStorage() {
  localStorage.setItem("signupArr", JSON.stringify(signupArr));
}

function validateSignupInputs(element) {
  console.log(element);
  console.log(regex[element.id].value);
  if (regex[element.id].value.test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    regex[element.id].isvalid = true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
    regex[element.id].isvalid = false;
  }
}
signupName?.addEventListener("input", function () {
  validateSignupInputs(this);
});
signupEmail?.addEventListener("input", function () {
  validateSignupInputs(this);
});
signupPassword?.addEventListener("input", function () {
  validateSignupInputs(this);
});

function isLoginEmpty() {
  if (signinEmail.value == "" || signinPassword.value == "") {
    return false;
  } else {
    return true;
  }
}

function login() {
  if (isLoginEmpty() == false) {
    document.getElementById("inCorrect").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }
  var loginInfo = {
    signinEmail: signinEmail.value,
    signinPassword: signinPassword.value,
  };
  for (var i = 0; i < signupArr.length; i++) {
    if (
      signupArr[i].email.toLowerCase() == loginInfo.signinEmail.toLowerCase() &&
      signupArr[i].password.toLowerCase() ==
        loginInfo.signinPassword.toLowerCase()
    ) {
      localStorage.setItem("userName", signupArr[i].name);
      location.href = "home.html";
      clear();
    } else {
      document.getElementById("inCorrect").innerHTML =
        '<span class="p-2 text-danger">incorrect email or password</span>';
    }
  }
}
signinButton?.addEventListener("click", login);

function logOut() {
  localStorage.removeItem("userName");
  window.location.href = "index.html";
}
logoutButton?.addEventListener("click", logOut);
