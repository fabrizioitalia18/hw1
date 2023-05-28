function onSearchJson(json){
    console.log(json);
    const container = document.querySelector("#vetrina");
    container.innerHTML = '';

    container.classList.remove('hidden');
    container.classList.add('search');

    const risultati = json.results;
    let numero_risultati = risultati.length;
    if(numero_risultati === 0){
        const new_h1 = document.createElement('h1');
        new_h1.textContent = 'Ci dispiace, la tua ricerca non ha portato ad alcun risultato.';
        vetrina.appendChild(new_h1);
    }
    if(numero_risultati>12){
        numero_risultati = 12;
    }

    const type = document.querySelector('select').value;

    for(let i=0; i<numero_risultati; i++){
        
        const movie = risultati[i];
        const img = movie.poster_path;
        const overview = movie.overview;
        const id = movie.id;
        let titolo;
        let release_date;

        if(type === 'movie'){
            release_date = movie.release_date;
            titolo =  movie.title;
        }else{
            release_date = movie.first_air_date;
            titolo = movie.name;
        }



        const film = document.createElement('div');
        film.classList.add('film');
        film.classList.add('film_search');
        film.dataset.type = type;
        film.dataset.id = id;
        film.dataset.titolo = titolo;
        film.dataset.overview = overview;
        film.dataset.release_date = release_date;
        
        const new_img = document.createElement('img'); 
        if(img !== null){
            new_img.src = "https://image.tmdb.org/t/p/original" + img;
        }
        else{
            new_img.src = "images/immagine-non-disponibile.png"
        }
        
        film.dataset.src = new_img.src;


        const new_button = document.createElement('button');
        if(movie.presente === true){
            new_button.textContent = 'Rimuovi dalla lista'
        }else{
            new_button.textContent = 'Aggiungi alla lista'
        }
        
        new_button.addEventListener('click', aggiuntaInLista);
        
        film.appendChild(new_img);
        film.appendChild(new_button)

        film.addEventListener('click', film_view);

        container.appendChild(film);
        
        

    }
    
}



function search(event){
    event.preventDefault();

    const ricerca = encodeURIComponent(document.querySelector('#search_film').value);
    const type = document.querySelector('select').value;

    fetch("ricerca.php?q=" + ricerca + "&type=" + type).then(onResponse).then(onSearchJson);
    

}

function onResponse(response){
    return response.json();
}

const form = document.querySelector('form');
form.addEventListener('submit', search);