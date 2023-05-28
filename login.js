function verifica(event){

    if(form.username.value.length === 0 || form.password.value.length === 0){
        const div = document.querySelector('div');
        div.textContent = 'Username e password richiesti';
        div.classList.remove('hidden');
        div.classList.add('errore');

        event.preventDefault();
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



const form = document.forms['login'];
form.addEventListener('submit', verifica);
const img_password = document.querySelector("label img");
img_password.addEventListener('click', vedi_password);