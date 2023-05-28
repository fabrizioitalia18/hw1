function verifica(event){

    if(form.name.value.length === 0 || form.lastname.value.length === 0 || form.email.value.length === 0 ||
        form.username.value.length === 0 || form.gender.checked === false || form.password.value.length === 0
        || form.confirm_password.value.length === 0 || form.agreement.checked === false)
    {
        const div = document.querySelector('#empty_fields');
        div.textContent = 'Riempire tutti i campi';
        div.classList.remove('hidden');
        div.classList.add('errore');

        event.preventDefault();       
    }

}


function checkName(event){
    const name = event.currentTarget;
    const errore = name.parentNode.parentNode.querySelector('div');
    if(name.value.length === 0){
        errore.classList.remove('hidden');
        errore.classList.add('errore');
        errore.textContent= "Campo obbligatorio";
    }else{
        errore.classList.remove('errore');
        errore.classList.add('hidden');
    }
}

function checkLastname(event){
    const lastname = event.currentTarget;
    const errore = lastname.parentNode.parentNode.querySelector('div');
    if(lastname.value.length === 0){
        errore.classList.remove('hidden');
        errore.classList.add('errore');
        errore.textContent = "Campo obbligatorio";
    }else{
        errore.classList.remove('errore');
        errore.classList.add('hidden');
    }
}

function onEmailJson(json){
    const email  = form.email;
    const errore = email.parentNode.parentNode.querySelector('div');
    if(json.exists===true){
        errore.classList.remove('hidden');
        errore.classList.add('errore');
        errore.textContent = "Email già in uso";
    }else{
        errore.classList.remove('errore');
        errore.classList.add('hidden');
    }
}

function onResponse(response){
    return response.json();
}

function checkEmail(event){
    const email = event.currentTarget;
    const errore = email.parentNode.parentNode.querySelector('div');
    if(email.value.length === 0){
        errore.classList.remove('hidden');
        errore.classList.add('errore');
        errore.textContent = "Campo obbligatorio";
    }else{
        errore.classList.remove('errore');
        errore.classList.add('hidden');
    }

    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(form.email.value).toLowerCase()))
    {
        errore.classList.remove('hidden');
        errore.classList.add('errore');
        errore.textContent = "Email non valida";
    }
    else{
        fetch("check_email.php?q="+encodeURIComponent(String(email.value).toLowerCase())).then(onResponse).then(onEmailJson);
    }
}

function onUsernameJson(json){
    const username  = form.username;
    const errore = username.parentNode.parentNode.querySelector('div');
    if(json.exists===true){
        errore.classList.remove('hidden');
        errore.classList.add('errore');
        errore.textContent = "Username già in uso";
    }else{
        errore.classList.remove('errore');
        errore.classList.add('hidden');
    }
}

function checkUsername(event){
    const username = event.currentTarget;
    const errore = username.parentNode.parentNode.querySelector('div');
    if(username.value.length === 0){
        errore.classList.remove('hidden');
        errore.classList.add('errore');
        errore.textContent = "Campo obbligatorio";
    }else{
        errore.classList.remove('errore');
        errore.classList.add('hidden');
    }
    
    if(!/^[a-zA-Z0-9_]{1,15}$/.test(username.value)){
        errore.classList.remove('hidden');
        errore.classList.add('errore');
        errore.textContent = "Username non valido";
    }
    else{
        fetch("check_username.php?q="+encodeURIComponent(String(username.value).toLowerCase())).then(onResponse).then(onUsernameJson);
    }
}

function checkPassword(event){
    const password = event.currentTarget;
    const errore = password.parentNode.parentNode.querySelector('div');
    if(password.value.length<8){
        errore.classList.remove('hidden');
        errore.classList.add('errore');
        errore.textContent = "La password è troppo corta";
    }
    else{
        
        errore.classList.remove('errore');
        errore.classList.add('hidden');

        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/.test(password.value)){
            errore.classList.remove('hidden');
            errore.classList.add('errore');
            errore.textContent = 'La password deve contenere almeno una lettera minuscola, una maiuscola e almeno un numero';
        }else{
            errore.classList.remove('errore');
            errore.classList.add('hidden');

            if(!/^(?=.*[^\da-zA-Z]).*$/.test(password.value)){
                errore.classList.remove('hidden');
                errore.classList.add('errore');
                errore.textContent = 'La password deve contenere almeno un carattere speciale';
            }else{
                errore.classList.remove('errore');
                errore.classList.add('hidden');
            }
        }


    }
}

function checkConfirmPassword(event){
    const confirm_password = event.currentTarget;
    const errore = confirm_password.parentNode.parentNode.querySelector('div');
    if(confirm_password.value !== form.password.value){
        errore.classList.remove('hidden');
        errore.classList.add('errore');
        errore.textContent = "Le password non coincidono";
    }else{
        errore.classList.remove('errore');
        errore.classList.add('hidden');
    }
}


function vedi_password(event){
    const password = form.password;
    if(password.type === "password"){
        password.type = "text";
    }else{
        password.type = "password";
    }
}

function vedi_confirm_password(event){
    const password = form.confirm_password;
    if(password.type === "password"){
        password.type = "text";
    }else{
        password.type = "password";
    }
}


const form = document.forms["signup"]
form.addEventListener('submit', verifica)
const img_password = document.querySelector("#password label img");
const img_confirm_password = document.querySelector('#confirm_password label img')
img_password.addEventListener('click', vedi_password);
img_confirm_password.addEventListener('click', vedi_confirm_password);
form.name.addEventListener('blur', checkName)
form.lastname.addEventListener('blur', checkLastname)
form.email.addEventListener('blur', checkEmail)
form.username.addEventListener('blur', checkUsername)
form.password.addEventListener('blur', checkPassword)
form.confirm_password.addEventListener('blur', checkConfirmPassword)