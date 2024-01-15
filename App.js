const contentContainer = document.querySelector('.content-container');
const loadingContainer = document.querySelector('.loading-container');

const countries = [];
let countryArray = [];

loadingContainer.innerHTML += `<h1 class="loading-text">Loading...</h1>`;
async function fetchData() {

    try {
        const apiUrl = "https://restcountries.com/v3.1/all";
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('something went wrong');
        }
        const data = await response.json();


        countries.push(data);

        loadingContainer.style.display = 'none';

        countryArray = countries[0];

        console.log(data);

        init(countryArray);

    } catch (e) {
        console.error(e);
    }
}


fetchData();

function init(array) {


    contentContainer.innerHTML = "";
    array.forEach((elem) => {

        const flagPath = elem.flags.png;
        const countryName = elem.name.common;
        const population = elem.population.toLocaleString();
        const region = elem.region;
        const capital = elem.capital;

        const card = `<a class="card" href="./detailed.html?name=${elem.name.common}">
        <div >
        <div class="image-container">
            <img src="${flagPath}" alt="">
        </div>
        
        <div class="content">
            <h2>${countryName}</h2>
            <p>Population: ${population}</p>
            <p>Region: ${region} </p>
            <p>Capital: ${capital} </p>
           
        </div>
        
        </div>
        </a>`

        contentContainer.innerHTML += card;

    })

    let cards = document.querySelectorAll(".card");
    console.log(cards);

}



const userInput = document.getElementById("input-text");

userInput.addEventListener('input', (event) => {


    let input = event.target.value.toLowerCase().trim();

    const filteredArr = countryArray
        .filter((item) => item.name.common
          .toLowerCase()
            .includes(input));

    init(filteredArr);


})


