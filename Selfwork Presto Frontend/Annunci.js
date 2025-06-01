// Documento Javascript per gli annunci

fetch('./Annunci.json').then( (response)=> response.json() ).then( (data)=> {

    let radioContainer = document.querySelector('#radioContainer');
    let cardContainer = document.querySelector('#cardContainer');


    // Oridina tutte le cards per ordine di prezzo
    data.sort( (a, b)=> a.price - b.price );



    // Funzione per creare un filtro radio button per ogni categoria
    function radioBtnCreazione() {

        let categorie = data.map( (annuncio)=> annuncio.category );

        // Restituzione di un array che contiene solo valori univoci, eliminando i doppioni
        let categoriaSingola = Array.from(new Set(categorie));


        categoriaSingola.forEach( (category)=> {

            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="categoria" id="${category}">
                    <label class="form-check-label" for="${category}">
                        ${category}
                    </label>
            `;

            radioContainer.appendChild(div);

        } );

    }

    radioBtnCreazione();



    // Funzione che tronca le stringhe troppo lunghe
    function troncaParole(string) {

        if (string.length > 15) {
            return string.split(' ')[0] + '...';
        }
        else {
            return string;
        }

    }



    // Funzione che mostra tutte le cards del file json
    function mostraCards(array) {

        cardContainer.innerHTML = ' ';        

        array.forEach( (annuncio, i)=> {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = `
                <img src="https://picsum.photos/${300 + i}" alt="random image" class="img-fluid card-image">
                <p class="h2" title="${annuncio.name}">${troncaParole(annuncio.name)}</p>
                <p class="h4">${troncaParole(annuncio.category)}</p>
                <p class="lead">${troncaParole(annuncio.price)}€</p>
            `;

            cardContainer.appendChild(div);

        } );

    }

    mostraCards(data);


    
    let radioButton = document.querySelectorAll('.form-check-input');

    // Funzione che, in base al radio button selezionato, flitra solo le cards relative alla categoria selezionata
    function filtroperCategoria(array) {

        let categoria = Array.from(radioButton).find( (button)=> button.checked ).id;

        if(categoria != 'allCategories') {
            let filtro = array.filter( (annuncio)=> annuncio.category == categoria );
            return filtro;
        }
        else {
            return array;
        }

    }



    radioButton.forEach( (button)=> {

        button.addEventListener('click', ()=> {
            setPrezzo(filtroperCategoria(data));
            filtroGlobale();
        } );

    } );



    let prezzoInput = document.querySelector('#prezzoInput');
    let priceValue = document.querySelector('#priceValue');

    // Funzione che serve per visualizzare solo le cards che corrispondono al range di prezzo selezionato
    function setPrezzo() {

        let prezzi = filtroperCategoria(data).map( (annuncio)=> Number(annuncio.price) );
        // Ordinamento in ordine crescente
        prezzi.sort( (a ,b)=> a - b );

        let maxPrezzo = Math.ceil(prezzi.pop());
        prezzoInput.max = maxPrezzo;
        prezzoInput.value = maxPrezzo;
        priceValue.innerHTML = maxPrezzo + '€';

    }

    setPrezzo(filtroperCategoria(data));




    // Funzione che visualizza solo le cards che rientrano nel range di prezzo impostato
    function filtroperPrezzo(array) {

        let filtro = array.filter( (annuncio)=> Number(annuncio.price) <= prezzoInput.value );
        return filtro;

    }

    prezzoInput.addEventListener('input', ()=> {
        priceValue.innerHTML = prezzoInput.value;
        filtroGlobale();
    } );




    let wordInput = document.querySelector('#wordInput');


    // Funzione che visualizza solo le cards che hanno le stesse lettere scritte nel campo input text
    function filtroperParola(array) {

        let filtro = array.filter( (annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()) );
        return filtro;

    }

    wordInput.addEventListener('input', ()=> {
        filtroGlobale();
    } )




    // funzione che racchiude tutti i filtri concatenati == Categoria, Prezzo, Parola
    function filtroGlobale() {

        let filtroCategoria = filtroperCategoria(data); // array filtrato per categoria
        let filtroPrezzo = filtroperPrezzo(filtroCategoria); // array filtrato per categoria e prezzo
        let filtroParola = filtroperParola(filtroPrezzo); // array filtrato per categoria, prezzo e parola

        mostraCards(filtroParola);
    }

} );