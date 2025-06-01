// Documento Javascript per la sezione Chi Siamo

let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');


let teachers = [
    {name: 'Matteo', description: 'Docente Javascript', url: './Media/Teacher1.jpeg'},
    {name: 'Marco', description: 'Docente Frontend', url: './Media/Teacher2.jpeg'},
    {name: 'Nicola', description: 'Docente', url: './Media/Teacher3.jpeg'},
    {name: 'Davide', description: 'Docente Backend', url: './Media/Teacher4.jpeg'},
];


teachers.forEach( (docente)=> {

    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${docente.url})`;
    circle.appendChild(div);

} );



let moveDiv = document.querySelectorAll('.moved');

let check = false;

let flipCard = document.querySelector('.flip-card');

// Al click del pulsante +, si aprono a cerchio tanti cerchietti in base a quanti docenti ci sono nell'array di partenza
opener.addEventListener('click', ()=> {

    if (check == false) {
        opener.style.transform = 'rotate(45deg)';
    
        moveDiv.forEach( (moved, i)=> {
            let angolo = (360 * i) / moveDiv.length;
            moved.style.transform = `rotate(${angolo}deg) translate(150px) rotate(-${angolo}deg)`;
        } );
        
        check = true;
    }
    else {
        check = false;
        opener.style.transform = 'rotate(0deg)';
        moveDiv.forEach( (moved, i)=> {
            moved.style.transform = `rotate(0deg) translate(0px)`;
        } );
        
        flipCard.classList.add('d-none');
    }

} );



let innerFace = document.querySelector('.innerFace');
let cardName = document.querySelector('#cardName');
let cardDescription = document.querySelector('#cardDescription');

// Al click sulla foto di ogni docente, apre un menù con tutte le sue informazioni
moveDiv.forEach( (moved, i)=> {

    moved.addEventListener('click', ()=> {
        flipCard.classList.remove('d-none');
        let docente = teachers[i];
        innerFace.style.backgroundImage = `url(${docente.url})`;
        cardName.innerHTML = docente.name;
        cardDescription.innerHTML = docente.description;
    } );

} );