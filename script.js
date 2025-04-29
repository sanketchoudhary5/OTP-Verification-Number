document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".row input");
  const button = document.querySelector("button");
  const mobile = document.getElementById("mobile");
  const expire = document.querySelector(".expire");
  const requestBtn = document.getElementById("request");

  let OTP = "";
  let expireInterval;

  // Function to generate OTP
  function generateOTP() {
    OTP = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit OTP
    alert("Your OTP is: " + OTP);

    // OTP Expiry Countdown
    clearInterval(expireInterval);
    expire.innerText = 30;
    expireInterval = setInterval(function () {
      let timeLeft = parseInt(expire.innerText);
      if (timeLeft === 1) {
        clearInterval(expireInterval);
        alert("OTP has expired! Generating a new one...");
        generateOTP();
      } else {
        expire.innerText = timeLeft - 1;
      }
    }, 1000);
  }

  // Function to clear OTP inputs
  function clearOTPs() {
    inputs.forEach((input, index) => {
      input.value = "";
      if (index === 0) {
        input.removeAttribute("disabled");
      } else {
        input.setAttribute("disabled", true);
      }
    });
    clearInterval(expireInterval);
    expire.innerText = "0";
    button.classList.remove("active");
  }

  // OTP Input handling
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      if (input.value.length > 1) {
        input.value = input.value.slice(0, 1); // Restrict input to one digit
      }

      if (input.value !== "" && index < inputs.length - 1) {
        inputs[index + 1].removeAttribute("disabled");
        inputs[index + 1].focus();
      }

      let enteredOTP = "";
      inputs.forEach((inp) => {
        enteredOTP += inp.value;
      });

      if (enteredOTP.length === 4) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace") {
        input.value = "";
        if (index > 0) {
          inputs[index - 1].focus();
        }
      }
    });
  });

  // Request user mobile number on page load
  window.addEventListener("load", function () {
    let phoneNumber = prompt("Please Enter Your Mobile Number To Verify Your Account");
    if (phoneNumber) {
      mobile.innerText = phoneNumber;
      setTimeout(generateOTP, 500); // Generate OTP after entering number
      inputs[0].removeAttribute("disabled"); // Enable first input
    }
  });

  // OTP verification
  button.addEventListener("click", function () {
    let enteredOTP = "";
    inputs.forEach((input) => {
      enteredOTP += input.value;
    });

    if (enteredOTP === OTP) {
      alert("✅ Your Account Has Been Verified Successfully!");
      clearOTPs();
    } else {
      alert("❌ Invalid OTP! Please Try Again.");
      inputs.forEach((input) => (input.value = "")); // Clear inputs
      inputs[0].focus(); // Set focus back to first input
    }
  });

  // Re-generate OTP on clicking "Request Again!"
  requestBtn.addEventListener("click", function () {
    clearOTPs();
    generateOTP();
  });
});
