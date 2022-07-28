const pkId = document.querySelector('#pk-id');
const pkName = document.querySelector('#pk-name');
const pkType = document.querySelector('#pk-type');
const pkFigure = document.querySelector('#pk-figure');
const pkForm = document.querySelector('#pk-form');
const search = document.querySelector('#search');
const buttons = document.querySelectorAll('.button');
var startId = 1;

const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (response.status == 200) {
        return await response.json();
    }
}

const render = async (s) => {
    pkId.innerHTML = '';
    pkName.innerHTML = 'searching...';
    const data = await fetchPokemon(s);
    if (data) {
        pkId.innerHTML = data.id;
        pkName.innerHTML = data.name;
        pkType.innerHTML = data.types[0].type.name;
        pkFigure.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        startId = data.id;
    } else {
        pkId.innerHTML = '';
        pkName.innerHTML = 'Not Found';
        pkFigure.src = 'https://images.emojiterra.com/google/android-11/512px/2754.png';
    }
}

pkForm.addEventListener ('submit', (e) => {
    e.preventDefault();
    render(search.value.toLowerCase());
    search.value = '';
});

buttons.forEach(button => button.addEventListener('click', () => {
    if (button.id == 'btn-back') {
        if (startId > 1)
            startId--;
    } else if (button.id == 'btn-next') {
        startId++;
    }
    render(startId);
}));

render(startId);