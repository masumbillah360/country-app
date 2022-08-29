// const loadData = ()=>{
//     fetch('https://restcountries.com/v3.1/all')
//     .then(res=>res.json())
//     .then(data => getData(data));
// }


// const getData = (data) =>{
//     const countryContainer = document.getElementById('container');
//     data.forEach(country=>{
//         const countryArticle = document.createElement('article');
//         countryArticle.classList.add('col-6','col-md-4','col-lg-3')
//         countryArticle.innerHTML = `
//         <div class="card">
//             <img style="height:130px;" src="${country.flags.png}" class="card-img-top" alt="...">
//             <div class="card-body text-center">
//                 <h4 class="card-title fw-bold">${country.name.common}</h4>
//                 <p class="card-text"></p>
//                 <button onclick='${showCountry(country.cca2)}' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
//                     See Details
//                 </button>
//             </div>
//         </div>
//         ` 
//         countryContainer.appendChild(countryArticle)
//     });
// }
// const showCountry = (code) => {
//     // https://restcountries.com/v3.1/alpha/{code}
//     const url = `https://restcountries.com/v3.1/alpha/${code}`
//     // console.log('get country detail', code)
//     fetch(url)
//     .then(res => res.json())
//     .then(data => showCountryData(data[0]))
// }


// const showCountryData =(countryDetail) =>{
//     const countryDetailContainer = document.getElementById('show-country-container');
    
//         // console.log(country)
//         countryDetailContainer.innerHTML = `
//             <h1>${countryDetail}</h1>
//         `
// }
// loadData();
const loadCountries = () =>{
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => displayCountries(data));
}

const displayCountries = countries =>{
    // for(const country of countries){
    //     console.log(country);
    // }
    const countriesContainer = document.getElementById('container');
    countries.forEach(country => {
        const countryDiv = document.createElement('article');
        countryDiv.classList.add('col-6','col-md-4','col-lg-3')
        // console.log(country);
        countryDiv.innerHTML = `
        <div class="card">
            <img style="height:130px;" src="${country.flags.png}" class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h4 class="card-title fw-bold">${country.name.common}</h4>
                <p class="card-text"></p>
                <button onclick="loadCountryDetail('${country.cca2}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">SeeDetails</button>
            </div>
        </div>
        `
        countriesContainer.appendChild(countryDiv);
    })
}

const loadCountryDetail = (code) => {
    const url = `https://restcountries.com/v3.1/alpha/${code}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCountryDetail(data[0]))
}

const displayCountryDetail = country =>{
    const countryDetail = document.getElementById('show-country-container');
    const currencies = country.currencies;
    const getCurrencies = currencies[Object.keys(currencies)[0]];
    const languages = country.languages;
    // const lang = languages[Object.keys(...languages)];
    countryDetail.innerHTML = `
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${country.name.common}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
        <img src="${country.flags.png}">

        <h4 class="fw-bold">Name : ${country.name.common}</h4>
        <p class = "fw-bold">Name : ${country.name.official}</p>
        <p><span>Code : ${country.cca2} <-> Capital : ${country.capital}</span></p>
        <p><span>Area : ${country.area}Square Km \t Currencies : ${getCurrencies.name} ${getCurrencies.symbol}</span></p>
        <p>Population : ${country.population} \t Region: ${country.continents[0]}</p>
        <p>Language : ${Object.values(languages)}</p>

        </div>
    `
}
loadCountries();