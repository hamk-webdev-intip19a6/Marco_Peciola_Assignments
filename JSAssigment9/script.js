
let formValues = document.forms.formID;
let output = document.getElementById("output");


function validatePass() {

    var firstPass = document.forms["mainForm"]["passWord1"].value;
    var secondPass = document.forms["mainForm"]["passWord2"].value;
    var patt = new RegExp(/\w/);
    if (firstPass != secondPass) {
        alert("Passwords must match");
    }
    else if (firstPass.length < 8 || firstPass.length > 30) {
        alert("Password must be between 8-30 letters")
    }
    else if (patt.test(firstPass) == false) {
        console.log(firstPass)
        console.log(patt.test(firstPass))
        alert("Password can't contain special characters")
    }

}
const formElem = document.querySelector('form');

formElem.addEventListener('submit', (e) => {
    // on form submission, prevent default
    e.preventDefault();
   
    // construct a FormData object, which fires the formdata event
    new FormData(formElem);
  });

formElem.addEventListener('formdata', (e) => {
    let lista = []
    var str;
    // Get the form data from the event object
    let data = e.formData;
    for (var value of data.values()) {
        if (value !== null && value !== ''){
            lista.push(value+ "<br />");
        }
      
    }

    for (var i = 0;i<lista.length;i++){
        str += lista[i]+"";
    }
    
    output.innerHTML = str;

    
});
