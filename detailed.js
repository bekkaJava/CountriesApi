const holder = document.querySelector(".holder");
const container = document.querySelector('.coutry-container');

console.log(container);

console.log(new URL(window.location).searchParams.get('name'));
const countries = [];
const getData = async function () {
    try {
        const apiUrl = "https://restcountries.com/v3.1/all";
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('something went wrong');
        }
        const data = await response.json();



        renderCountry(data);
    } catch (e) {
        console.error(e);
    }
}


const renderCountry = function (arr) {

    container.innerHTML = "";

    const urlParam = new URL(window.location).searchParams.get('name');

    const country = arr.filter(item => item.name.common === urlParam);
    const elem = country[0];

    const flagPath = elem.flags.png;
    const countryName = elem.name.common;
    const population = elem.population.toLocaleString();
    const region = elem.region;
    const capital = elem.capital;


    const card = `<div class="card">
        <img src="${flagPath}" alt="">
    </div>

        <div class="content">
        <h2>${countryName}</h2>
        <p>Population: ${population}</p>
        <p>Region: ${region} </p>
        <p>Capital: ${capital} </p>


    </div>`;

    const borderCountries = elem.borders;

    for(item of borderCountries) {

        console.log(item);
    }

    const brs = document.createElement('div');

    const ul = document.createElement('ul');

    brs.appendChild(ul);
    for(item of borderCountries) {

        

        const li = document.createElement('li');
        li.textContent = item;

        ul.appendChild(li);

    }


    container.innerHTML += card;

}


getData();