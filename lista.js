function onAggiuntaJson(json){
    console.log(json);
    const films = document.querySelectorAll('.selected');
    for(film of films){
        if(film.dataset.id === json.id){
            const button = film.querySelector('button');
            if(json.aggiunto === true){
                button.textContent = 'Rimuovi dalla lista';
            }

            if(json.rimosso ===  true){
                button.textContent = "Aggiungi alla lista";
                film.classList.remove('selected');

            }
        }
        console.log(film);
    }
    
}

function aggiuntaInLista(event){
    event.stopPropagation();
    film = event.currentTarget.parentNode;
    film.classList.add('selected');
    const formData = new FormData();
    formData.append('id', film.dataset.id);
    formData.append('titolo', film.dataset.titolo);
    formData.append('type', film.dataset.type);
    formData.append('overview', film.dataset.overview);
    formData.append('release_date', film.dataset.release_date);
    formData.append('src', film.dataset.src);

    fetch("lista.php", {
        method: 'post',
        body : formData
    }).then(onResponse).then(onAggiuntaJson);
}

function onResponse(response){
    return response.json();
}