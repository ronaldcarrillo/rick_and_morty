const URL = 'https://rickandmortyapi.com/api/character';
const block_content = document.querySelector('.block__content__data');
const modo = document.querySelector('#mode');
const root = document.documentElement;
let estado = false;
var paginas = 0;
modo.addEventListener('click',()=>{
    if(estado){
        root.style.setProperty('--color-flecha', '#fff');
        root.style.setProperty('--color-fondo', '#000');
        root.style.setProperty('--color-text', '#fff');
        estado = false;
    }else{
        root.style.setProperty('--color-flecha', '#000');
        root.style.setProperty('--color-fondo', '#fff');
        root.style.setProperty('--color-text', '#000');
        estado = true;
    }
})

fetch(URL)
.then(response =>{
    return response.json()
})
.then(data =>{
    const info = data.results;
    const cabecera = data.info
    paginas = cabecera.pages//Cabecera de la petición, contiene el número de páginas de la API.
    
    info.forEach(element => {
        
        block_content.innerHTML += `
        <div class="card">
            <div class="card__left">
                <h2>${element.name}</h2>
                <img src="${element.image}" alt="Rick Sanchez">
            </div>

            <div class="card__right">
                <p>Status: ${element.status}</p>
                <p>species: ${element.species}</p>
                <p>gender: ${element.gender}</p>
            </div>
        </div>
        `
    });
})
.catch(err =>{
    console.log(err)
})


/*BOTONES*/
const btn_izquierdo = document.getElementById('btn__left'); 
const btn_derecho = document.getElementById('btn__right');
const searchCh = document.getElementById('searchCh')
let numPage = 1

// PAGINACIÓN
function getInfo(numPage){
    fetch(`https://rickandmortyapi.com/api/character/?page=${numPage}`)
    .then(results=>{
        return results.json();
    })
    .then(data =>{
        block_content.innerHTML = '';
        const info = data.results;
        info.map(element =>{
            block_content.innerHTML += `
            <div class="card">
                <div class="card__left">
                    <h2>${element.name}</h2>
                    <img src="${element.image}" alt="Rick Sanchez">
                </div>

                <div class="card__right">
                    <p>Status: ${element.status}</p>
                    <p>species: ${element.species}</p>
                    <p>gender: ${element.gender}</p>
                </div>
            </div>
            `
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

/*BOTONES DE PAGINACIÓN */
btn_izquierdo.addEventListener('click',()=>{
    numPage--;
    if(numPage == 0)
        numPage = 1;

    getInfo(numPage);
    searchCh.scrollIntoView({behavior:'smooth'});
});

btn_derecho.addEventListener('click', ()=>{
    numPage++;
    if(numPage == (paginas+1))
        numPage = paginas

    getInfo(numPage);
    searchCh.scrollIntoView({behavior:'smooth'});
});

/*BUSCADOR*/
const btn__buscar = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')

btn__buscar.addEventListener('click', ()=>{
    fetch(URL)
    .then(response =>{
        return response.json();
    })
    .then(data =>{
        const info = data.results
        const word = searchInput.value.toLowerCase()
        console.log(word)
        const newArray = info.filter(item=>item.name.toLowerCase().includes(word))
        
        block_content.innerHTML = '';
        newArray.map(element=>{
            block_content.innerHTML += `
            <div class="card">
                <div class="card__left">
                    <h2>${element.name}</h2>
                    <img src="${element.image}" alt="Rick Sanchez">
                </div>

                <div class="card__right">
                    <p>Status: ${element.status}</p>
                    <p>species: ${element.species}</p>
                    <p>gender: ${element.gender}</p>
                </div>
            </div>
            `
        });
    })
    .catch(err =>{
        console.log(err)
    })
});
