const fields = document.querySelectorAll("[required]");


//Verifica campo campo vazio 
let inputs = document.querySelectorAll('input');
let buttonSend = document.getElementById('button-register');

let inputValidator = {
    "name1": false,
    "email": false,
    "phone": false,
    "password": false,
    "birthday": false,
    "checkbox-terms": false
    }

    inputs.forEach((input) => {
    input.addEventListener('input', () => {
    let name = event.target.getAttribute('name');
    if(event.target.value.length > 0){
        inputValidator[name] = true;
    }else {
        inputValidator[name] = false;
    };

    let allTrue = Object.keys(inputValidator).every((item) => {
        return inputValidator[item] === true
    });

    if(allTrue) {
        buttonSend.disabled = false;
    } else {
        buttonSend.disabled = true;
    }
  })
})

function ValidateField(field) {
    //verifica se existe erro
    function verifyErrors(){
    let foundError = false;

    for(let error in field.validity){
        // se não for customError
        //então verificar se tem erro
        if(field.validity[error] && !field.validity.valid){
            foundError = error
        }
    }
    return foundError;
}
    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Full name Invalid"
            },
            email: {
                valueMissing: "Required E-mail",
                typeMismatch: "E-mail Invalid"
            },
            date: {
                valueMissing: "Age Invalid"
            },
            tel: {
                valueMissing: "Phone Invalid"
            },
            password: {
                valueMissing: "Invalid password. Enter numbers only"
            },
            checkbox: {
                valueMissing: "You must accept the terms",
                }
        }
        return messages[field.type][typeError]
    }

function setCustomMessage(message){
const spanError = field.parentNode.querySelector("span.error")

    if(message){
        spanError.classList.add("active")
        spanError.innerHTML = message
    } else {
        spanError.classList.remove("active")
        spanError.innerHTML = ""
    }
}
return function(){
    const error = verifyErrors()
    
    if(error){
        const message = customMessage(error)
        field.style.borderColor = "red"
        setCustomMessage(message)
    }else{
        field.style.borderColor = ""
        setCustomMessage()
    }
    }
}

function customValidation(event) {

    const field = event.target
    const validation = ValidateField(field)

    validation()
}
for( field of fields){
    field.addEventListener("invalid", event =>{
        //Eliminar o bubble
        event.preventDefault()
        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}

//validação campo senha
function validatePassword(){
    let password = $("#password").val();
    let nameFormat = /^[0-9]{6,9}/i;
    if(!password.match(nameFormat)){
        $("#password").val("")
    }
    
}

//validação Campo nome
function validateName(){
    let name = $("#name1").val();
    let nameFormat = /^[a-zA-Z\s]{4,}$/i;
    //alert(password);
    if(!name.match(nameFormat)) {
        $("#name1").val("")
    }
    
}

//Mascara Phone
function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,""); 
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");
    return v;
}
function id( el ){
	return document.getElementById( el );
}
window.onload = function(){
	id('phone').onkeyup = function(){
		mascara( this, mtel );
	}
}
  
    //oculta/mostra formulario
    let buttonRegister = document.getElementById("button-register");
    buttonRegister.addEventListener("click", function(){

    let container = document.getElementById("container-form");
    let containerB = document.getElementById("container-success");

    if(container.style.display === "block" || containerB.style.display === "none") {
        containerB.style.display = "block"
        container.style.display = "none"

    }else{
        containerB.style.display = "none";
        container.style.display = "block";
    }
    });


    document.querySelector("form")
    .addEventListener("submit", event => {
        console.log("Enviar o formulario")

        //não vai enviar o form
        event.preventDefault()
})