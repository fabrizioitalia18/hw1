function onProvidersJson(json){
    const link = document.querySelector(".modal_film a");
    if(link.dataset.clicked==='false'){
        const providers = document.querySelector('ul');
        providers.innerHTML='';
        providers.classList.remove('hidden');
        if(json === null || json === undefined){
            const li = document.createElement('li');
            li.textContent = 'Al momento non disponibile';
            providers.appendChild(li);
            link.dataset.clicked = 'true';
            link.textContent = 'Nascondi';
        }else{
            const results = json.flatrate
            if(results === null || results === undefined){
                const li = document.createElement('li');
                li.textContent = 'Al momento non disponibile';
                providers.appendChild(li);
                link.dataset.clicked = 'true';
                link.textContent = 'Nascondi';
            }else{
                let num_results = results.length;
                if(num_results>4){
                    num_results = 4;
                }

                console.log(results);
                for(let i = 0; i<num_results; i++){

                    const li = document.createElement('li');
                    const img = document.createElement('img');
                    img.src = "https://image.tmdb.org/t/p/original" + results[i].logo_path;

                    const div = document.createElement('div');
                    div.textContent = results[i].provider_name;

                    li.appendChild(img);
                    li.appendChild(div);

                    providers.appendChild(li);
                    link.dataset.clicked = 'true';
                    link.textContent = 'Nascondi';
                }
            }
        }   
    }else{
        link.dataset.clicked = 'false';
        link.textContent = 'Dove vedere:';
        const providers = document.querySelector(".modal_film ul");
        providers.classList.add('hidden');
    }
    
}

function providers(event){
    event.preventDefault();
    event.stopPropagation();

    const film_id = document.querySelector('.modal_film').dataset.id;
    const type = document.querySelector('.modal_film').dataset.type;

    fetch("rest_api_curl/providers.php?q=" + film_id + "&type=" + type).then(onResponse).then(onProvidersJson);
}

function removeModal(event){
    document.body.classList.remove('no-scroll');
    overlay.classList.add('hidden');
    overlay.innerHTML= '';
    const film = document.querySelector('#' + overlay.dataset.container + ' .hidden');
    film.classList.remove('hidden');
    film.classList.add('film');
    overlay.dataset.container = '';
}

function film_view(event){
    const film = event.currentTarget;
    overlay.dataset.container = film.parentNode.id;
    if(!film.classList.contains('hidden')){
        overlay.classList.remove('hidden');
        document.body.classList.add('no-scroll');
        film.classList.remove('film');
        film.classList.add('hidden');

        const div = document.createElement('div');
        div.classList.add('modal_film')

        const img = document.createElement('img');
        img.src = film.dataset.src;
        const info = document.createElement('div');
        info.classList.add('info');

        const titolo = document.createElement('h1');
        titolo.textContent = film.dataset.titolo;

        const overview = document.createElement('p');
        if(film.dataset.overview.length<500){
            overview.textContent = film.dataset.overview;
        }else{
            overview.textContent = film.dataset.overview.substring(0,499) + '...';
        }

        const release_date = document.createElement('p');
        release_date.textContent = 'Data d\'uscita: ' + film.dataset.release_date;  

        const new_a = document.createElement('a');
        new_a.href = '#';
        new_a.textContent = 'Dove vedere:'
        new_a.dataset.clicked = 'false';
        new_a.addEventListener('click', providers);
        const new_providers = document.createElement('ul');

        div.dataset.id = film.dataset.id;
        div.dataset.type = film.dataset.type;
        
        info.appendChild(titolo);
        info.appendChild(overview);
        info.appendChild(release_date);
        info.appendChild(new_a);
        info.appendChild(new_providers);

        div.appendChild(img);
        div.appendChild(info);

        overlay.appendChild(div);
    }
}

function onResponse(response){
    return response.json();
}

const overlay = document.querySelector('#overlay');
overlay.addEventListener('click', removeModal);