function onBoxOfficeJson(json){
    console.log(json);

    const box_office = document.querySelector('#box_office');

    const risultati = json.items;
    console.log(risultati);
    let numero_risultati = risultati.length;
    if(numero_risultati>6){
        numero_risultati=6;
    }

    for(let i=0; i<numero_risultati; i++){
        const film = risultati[i];
        console.log(film);
        const titolo = film.title;
        console.log(titolo);
        const copertina = film.image;
        const incasso = film.weekend;
        const settimane = film.weeks;

        const main_section = document.createElement('section');
        main_section.classList.add('contenuti');

        const new_numeri=document.createElement('div');
        new_numeri.classList.add('numeri');
        new_numeri.textContent = i+1 + '.';

        const new_paragrafo = document.createElement('div');
        new_paragrafo.classList.add("paragrafo");

        const new_titolo = document.createElement('div');
        new_titolo.classList.add("titoli-paragrafi");
        new_titolo.textContent = titolo;

        const new_settimane = document.createElement('div');
        new_settimane.classList.add('settimane');
        new_settimane.textContent = "Settimane in sala: "+ settimane;

        const new_testo = document.createElement('div');
        new_testo.classList.add('testo');
        new_testo.textContent = "Il film nell'ultimo weekend ha incassato " + incasso;

        const new_img = document.createElement('img');
        new_img.src=copertina;

        new_paragrafo.appendChild(new_titolo);
        new_paragrafo.appendChild(new_settimane);
        new_paragrafo.appendChild(new_testo);
        new_paragrafo.appendChild(new_img);

        main_section.appendChild(new_numeri);
        main_section.appendChild(new_paragrafo);

        box_office.appendChild(main_section);
    }
    
}


function onTrendingJson(json){
    console.log(json);
    const container = document.querySelector("#trending");
    container.innerHTML= '';

    container.classList.remove('hidden');
    container.classList.add('trending');

    const risultati = json.results;
    let numero_risultati = risultati.length;
    if(numero_risultati>12){
        numero_risultati = 12;
    }

    
    const type = document.querySelector("#trending").dataset.type;

    for(let i=0; i<numero_risultati; i++){
        
        const elem = risultati[i];
        const img = elem.poster_path;
        const overview = elem.overview;
        const id = elem.id;
        let titolo;
        let release_date;  

        if(type === 'movie'){
            release_date = elem.release_date;
            titolo =  elem.title;
        }else{
            release_date = elem.first_air_date;
            titolo = elem.name;
        } 

        const div = document.createElement('div');
        div.classList.add('film');

        div.dataset.id = id;
        div.dataset.titolo = titolo;
        div.dataset.overview = overview;
        div.dataset.release_date = release_date;
        
        const new_img = document.createElement('img'); 
        if(img !== null){
            new_img.src = "https://image.tmdb.org/t/p/original" + img;
        }
        else{
            new_img.src = "images/immagine-non-disponibile.png"
        }
        
        div.dataset.src = new_img.src;

        if(type === 'tv'){
            div.dataset.type = 'tv'
        }else{
            div.dataset.type = 'movie'
        }
        

        const new_button = document.createElement('button');

        if(elem.presente === true){
            new_button.textContent = 'Rimuovi dalla lista'
        }else{
            new_button.textContent = 'Aggiungi alla lista'
        }
        
        new_button.addEventListener('click', aggiuntaInLista);

        div.appendChild(new_img);
        div.appendChild(new_button);

        div.addEventListener('click', film_view);

        container.appendChild(div);
        
        
        

    }
}

function onNewsJson(json){
    console.log(json)
    const container = document.querySelector("#news");
    const risultati = json.articles;

    for(article of risultati){
        const titolo = article.title;
        if(titolo===null){
            continue;
        }
        const link = article.url;
        const img = article.urlToImage;

        const news = document.createElement('div');
        news.classList.add('news')

        const new_a = document.createElement('a');
        new_a.href = link;
        if(article.title.length < 100){
            new_a.textContent = article.title;
        }else{
            new_a.textContent = article.title.substring(0,99) + '...';
        }

        new_a.target = '_blanck';
        
        const new_img = document.createElement('img');
        new_img.src = img;

        news.appendChild(new_a);
        if(img === null){
            const text = document.createElement('em');
            text.textContent = "Immagine non disponibile."
            news.appendChild(text)
            
        }else{
            news.appendChild(new_img);
        }


        container.appendChild(news);

    }

}


function show(event){
    event.preventDefault();
    const container = document.querySelector("#trending").dataset.type = event.currentTarget.dataset.type;
    fetch("trending.php?q=" + event.currentTarget.dataset.type).then(onResponse).then(onTrendingJson);
}

function onResponse(response){
    return response.json();
}

const show_movies = document.querySelector('a#movies')
show_movies.addEventListener('click', show);

const show_series = document.querySelector('a#series')
show_series.addEventListener('click', show);


fetch("rest_api_curl/box_office.php").then(onResponse).then(onBoxOfficeJson);
fetch("rest_api_curl/news.php").then(onResponse).then(onNewsJson);