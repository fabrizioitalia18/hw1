function rimuoviDalProfilo(event){
    const film = event.currentTarget.parentNode;
    film.remove();
}

function onStampaListaJson(json){
    console.log(json);
    const movies = json.movies;
    const series = json.series;

    if(movies.length === 0){
        const text1 = document.createElement('p');
        text1.textContent = 'Inizia a riempire di film la tua lista!';
        lista_film.appendChild(text1);
    }
    if(series.length === 0){
        const text2 = document.createElement('p');
        text2.textContent = 'Inizia a riempire di serie tv la tua lista!';
        lista_serie.appendChild(text2);
    }

    for(elem in movies){
        const movie = movies[elem];
        const id = movie.id;
        const img = movie.img;
        const overview = movie.overview;
        const release_date = movie.release_date;
        const type = movie.tipo;
        const titolo = movie.titolo;

        const div = document.createElement('div');
        div.classList.add('film');
        div.classList.add('film_dim');

        div.dataset.id = id;
        div.dataset.titolo = titolo;
        div.dataset.overview = overview;
        div.dataset.release_date = release_date;
        div.dataset.type = type;
        div.dataset.src = img;
        
        const new_img = document.createElement('img'); 
        new_img.src = img;

        const new_button = document.createElement('button');

        if(movie.presente === true){
            new_button.textContent = 'Rimuovi dalla lista'
        }else{
            new_button.textContent = 'Aggiungi alla lista'
        }

        new_button.addEventListener('click', aggiuntaInLista);
        new_button.addEventListener('click', rimuoviDalProfilo);

        div.appendChild(new_img);
        div.appendChild(new_button);

        div.addEventListener('click', film_view);

        lista_film.appendChild(div);

    }

    for(elem in series){
        const serie = series[elem];
        const id = serie.id;
        const img = serie.img;
        const overview = serie.overview;
        const release_date = serie.release_date;
        const type = serie.tipo;
        const titolo = serie.titolo;

        const div = document.createElement('div');
        div.classList.add('film');
        div.classList.add('film_dim');

        div.dataset.id = id;
        div.dataset.titolo = titolo;
        div.dataset.overview = overview;
        div.dataset.release_date = release_date;
        div.dataset.type = type;
        div.dataset.src = img;
        
        const new_img = document.createElement('img'); 
        new_img.src = img;

        const new_button = document.createElement('button');

        if(serie.presente === true){
            new_button.textContent = 'Rimuovi dalla lista'
        }else{
            new_button.textContent = 'Aggiungi alla lista'
        }

        new_button.addEventListener('click', aggiuntaInLista);
        new_button.addEventListener('click', rimuoviDalProfilo);

        div.appendChild(new_img);
        div.appendChild(new_button);

        div.addEventListener('click', film_view);

        lista_serie.appendChild(div);

    }
}


function removeModalDati(event){
    document.body.classList.remove('no-scroll');
    overlay_dati.classList.add('hidden');
    const info = overlay_dati.querySelector('.info_dati');
    info.remove();
    const link = document.querySelector('nav .hidden');
    link.classList.remove('hidden');
}


function onDatiJson(json){

    console.log(json)
    const dati = json;

    overlay_dati.classList.remove('hidden');
    document.body.classList.add('no-scroll');
    link_dati.classList.add('hidden');

    const div = document.querySelector('.modal_dati');

    const img = overlay_dati.querySelector('img');
    img.src = dati.img;
    

    const info = document.createElement('div');
    info.classList.add('info_dati');

    const nome = document.createElement('p');
    nome.textContent = "Nome: " + dati.nome;

    const cognome = document.createElement('p');
    cognome.textContent = "Cognome: " + dati.cognome;

    const username = document.createElement('p');
    username.textContent = "Username: " + dati.username;

    const email = document.createElement('p');
    email.textContent = "Email: " + dati.email;

    const genere = document.createElement('p');
    if(dati.genere === 'm'){
        genere.textContent = "Genere: maschio";
    }else{
        if(dati.genere === 'f'){
            genere.textContent = "Genere: femmina";
        }
        else{
            genere.textContent = "Genere: altro";
        }
    }

    info.appendChild(nome);
    info.appendChild(cognome);
    info.appendChild(username);
    info.appendChild(email);
    info.appendChild(genere);

    div.appendChild(info);

}

function dati(event){
    event.preventDefault();

    fetch('dati_personali.php').then(onResponse).then(onDatiJson);
}

function prevent(event){
    event.stopPropagation();
}

function checkUpload(event) {
    const upload_original = document.getElementById('upload_original');
    const o_size = upload_original.files[0].size;
    const mb_size = o_size / 1000000;
    const ext = upload_original.files[0].name.split('.').pop();

    if (o_size >= 7000000) {
        document.querySelector('.fileupload span').textContent = "Le dimensioni del file superano 7 MB";
        document.querySelector('.fileupload').classList.add('error');
        upload_original.dataset.errore = 'true';
    } else if (!['jpeg', 'jpg', 'png', 'gif'].includes(ext))  {
        document.querySelector('.fileupload span').textContent = "Le estensioni consentite sono .jpeg, .jpg, .png e .gif";
        document.querySelector('.fileupload').classList.add('error');
        upload_original.dataset.errore = 'true';
    } else {
        document.querySelector('.fileupload').classList.remove('error');
        document.querySelector('.fileupload span').textContent = "";
        upload_original.dataset.errore = 'false';
        console.log("ok upload")
    }
}

function clickSelectFile(event) {
    if(upload_original.dataset.errore==='true'){
        link_dati.classList.add('error');
        event.preventDefault();
    }
}

function onResponse(response){
    return response.json();
}

fetch("stampa_lista.php").then(onResponse).then(onStampaListaJson);

const lista_film = document.querySelector('#lista_film');
const lista_serie = document.querySelector('#lista_serie');

const link_dati = document.querySelector("#dati_personali");
link_dati.addEventListener('click', dati);

const overlay_dati = document.querySelector('#overlay_dati');
overlay_dati.addEventListener('click', removeModalDati)

const scegli_foto = document.querySelector("#overlay_dati input");
scegli_foto.addEventListener('click', prevent);

document.forms["img_upload"].addEventListener('submit', clickSelectFile);
document.getElementById('upload_original').addEventListener('change', checkUpload);