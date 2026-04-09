// Date
const currentDate = new Date();
document.getElementById("date").textContent = currentDate.toLocaleDateString();

// DOB date range
const today = new Date();
const maxDate = today.toISOString().split("T")[0];
const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
    .toISOString().split("T")[0];
document.getElementById("dob").setAttribute("max", maxDate);
document.getElementById("dob").setAttribute("min", minDate);


// Slider
function updateHealth(value) {
    document.getElementById("healthValue").textContent = value;
}


// Password live validation
document.getElementById("password").addEventListener("input", function () {
    let pass = this.value;
    let userid = document.getElementById("userid").value;
    const strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_+=\/><.,`~])[^"]{8,30}$/;
    let msg = document.getElementById("passwordError");

    if (!strongPass.test(pass)) {
        msg.textContent = "Password must be 8-30 chars with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character. No double quotes.";
    } else if (pass.toLowerCase().includes(userid.toLowerCase()) && userid.length > 0) {
        msg.textContent = "Password cannot contain your User ID.";
    } else {
        msg.textContent = "";
    }
});

// Confirm password live validation
document.getElementById("repassword").addEventListener("input", function () {
    let pass = document.getElementById("password").value;
    let repass = this.value;
    let msg = document.getElementById("repasswordError");

    if (pass !== repass) {
        msg.textContent = "Passwords do not match.";
    } else {
        msg.textContent = "";
    }
});


// Status helper
function status(ok) {
    return ok
        ? '<span style="color:green; font-weight:bold;">pass</span>'
        : '<span style="color:red; font-weight:bold;">ERROR</span>';
}


// Review Form
function reviewForm() {
    let fname = document.getElementById("fname").value;
    let mi = document.getElementById("mi").value;
    let lname = document.getElementById("lname").value;

    let dob = document.getElementById("dob").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    let address1 = document.getElementById("address1").value;
    let address2 = document.getElementById("address2").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zip = document.getElementById("zip").value;

    let symptoms = document.getElementById("desc").value.trim(); 
    let userid = document.getElementById("userid").value;
    let health = document.getElementById("health").value;

    // Allergies
    let allergyList = [];
    if (document.getElementById("none").checked) {
        allergyList = ["None"];
    } else {
        if (document.getElementById("allergy1").checked) allergyList.push("Peanuts");
        if (document.getElementById("allergy2").checked) allergyList.push("Shellfish");
        if (document.getElementById("allergy3").checked) allergyList.push("Pollen");
        if (document.getElementById("otherallergy").checked) allergyList.push("Other");
    }
    let allergies = allergyList.length > 0 ? allergyList.join(", ") : "None selected";

    // Radios
    let genderRadio = document.querySelector('input[name="gender"]:checked');
    let gender = genderRadio ? genderRadio.value : "";

    let vaccineRadio = document.querySelector('input[name="vaccine"]:checked');
    let vaccine = vaccineRadio ? vaccineRadio.value : "";

    let insuranceRadio = document.querySelector('input[name="insurance"]:checked');
    let insurance = insuranceRadio ? insuranceRadio.value : "";

    // Validation checks
    let nameOk = fname.trim() !== "" && lname.trim() !== "";
    let dobOk = dob !== "" && dob <= maxDate && dob >= minDate;
    let emailOk = email.includes("@") && email.includes(".");
    let phoneOk = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone);
    let addressOk = address1.trim().length >= 2 && city.trim().length >= 2 && state !== "" && /^\d{5}(-\d{4})?$/.test(zip);
    let genderOk = gender !== "";
    let vaccineOk = vaccine !== "";
    let insuranceOk = insurance !== "";
    let useridOk = /^[A-Za-z][A-Za-z0-9_-]{4,29}$/.test(userid);

    // Populate review
    document.getElementById("reviewName").innerHTML = fname + " " + (mi ? mi + " " : "") + lname;
    document.getElementById("reviewNameStatus").innerHTML = status(nameOk);

    document.getElementById("reviewDob").innerHTML = dob || "Missing";
    document.getElementById("reviewDobStatus").innerHTML = status(dobOk);

    document.getElementById("reviewEmail").innerHTML = email || "Missing";
    document.getElementById("reviewEmailStatus").innerHTML = status(emailOk);

    document.getElementById("reviewPhone").innerHTML = phone || "Missing";
    document.getElementById("reviewPhoneStatus").innerHTML = status(phoneOk);

    document.getElementById("reviewAddress").innerHTML =
        (address1 || "Missing") + "<br>" +
        (address2 ? address2 + "<br>" : "") +
        (city || "Missing") + ", " + (state || "Missing") + " " + (zip || "Missing");
    document.getElementById("reviewAddressStatus").innerHTML = status(addressOk);

    document.getElementById("reviewAllergies").innerHTML = allergies;

    document.getElementById("reviewGender").innerHTML = gender || "Not selected";
    document.getElementById("reviewGenderStatus").innerHTML = status(genderOk);

    document.getElementById("reviewVaccine").innerHTML = vaccine || "Not selected";
    document.getElementById("reviewVaccineStatus").innerHTML = status(vaccineOk);

    document.getElementById("reviewInsurance").innerHTML = insurance || "Not selected";
    document.getElementById("reviewInsuranceStatus").innerHTML = status(insuranceOk);

    document.getElementById("reviewHealth").innerHTML = health + " / 10";

    document.getElementById("reviewSymptoms").innerHTML = symptoms || "None";

    // User ID with specific error message
    let useridMsg = "";
    if (!userid) {
        useridMsg = "ERROR: Missing";
    } else if (!/^[A-Za-z]/.test(userid)) {
        useridMsg = "ERROR: Must start with a letter";
    } else if (userid.length < 5) {
        useridMsg = "ERROR: Must be at least 5 characters";
    } else if (/[^A-Za-z0-9_-]/.test(userid)) {
        useridMsg = "ERROR: Only letters, numbers, underscores, and dashes allowed";
    }

    document.getElementById("reviewUser").innerHTML = userid || "Missing";
    document.getElementById("reviewUserStatus").innerHTML = useridOk
        ? '<span style="color:green; font-weight:bold;">pass</span>'
        : '<span style="color:red; font-weight:bold;">' + useridMsg + '</span>';

    // Scroll to review area
    document.getElementById("reviewArea").scrollIntoView({ behavior: "smooth" });
}


// Submit validation
function checkPasswords() {
    let pass = document.getElementById("password").value;
    let repass = document.getElementById("repassword").value;
    let userid = document.getElementById("userid").value;

    const strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_+=\/><.,`~])[^"]{8,30}$/;

    if (!strongPass.test(pass)) {
        alert("Password must be 8-30 chars with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character. No double quotes allowed.");
        return false;
    }
    if (pass.toLowerCase().includes(userid.toLowerCase())) {
        alert("Password cannot contain your User ID.");
        return false;
    }
    if (pass !== repass) {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}
