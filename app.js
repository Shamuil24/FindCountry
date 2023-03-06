const countryContainer = document.querySelector('.country-container')
const srchInput = document.querySelector('#input-id')
const selectFilter = document.querySelector('#select-id')


fetch(`https://restcountries.com/v3.1/all`)
  .then(response => response.json())
  .then(data => 
            getCountry(data)  
        )

function getCountry(ctr) {
    countryContainer.innerHTML = '';
    ctr.forEach((element) => {
        const {name:{common}, population, region, capital} = element
        const fullName = `${common} ${population} ${region} ${capital}`

        const {flags: {png}} = element
        const img = `${png}`
        countryContainer.innerHTML +=
        `
        
        <div class = 'card'>
        <img src="${png}" alt="img" class='mem-img'/>
        <a href="index2.html?common=${common}"><h2 class='card-h2'>${common}</h2> </a>
        <div class='card-text'>
        <p><b>Population:</b> ${population.toLocaleString("en-US")}</p>
        <p><b>Region:</b> ${region}</p>
        <p><b>Capital:</b> ${capital}</p>
        </div>
    </div>
    `
    }); 
}

srchInput.addEventListener('input', (e) => {
    e.preventDefault();
    const inputValue = srchInput.value;
    srchInputCountry(inputValue)  
});

async function srchInputCountry(name) {
    const strCountry = await fetch(`https://restcountries.com/v3.1/name/${name}`)
    const results = await strCountry.json()
    getCountry(results)
}

selectFilter.addEventListener('change', (e) => {
    e.preventDefault();
    const selectValue = e.target.value;
    FilterSelectCountry(selectValue)  
});

async function FilterSelectCountry(region) {
    const filterClickCountry = await fetch(`https://restcountries.com/v3.1/region/${region}`)
    const result = await filterClickCountry.json()
    getCountry(result)
}

let btn = document.querySelector(".header-button");
let link = document.querySelector("#theme-link");

btn.addEventListener("click", () => { ChangeTheme(); });

function ChangeTheme()
{
    let lightTheme = "style.css";
    let darkTheme = "styledark.css";

    let currTheme = link.getAttribute("href");
    let theme = "";

    if(currTheme == lightTheme)
    {
      btn.textContent = "Light Mode";
      currTheme = darkTheme;
      theme = "styledark";
    }
    else
    {    
    btn.textContent = "Light Mode";
      currTheme = lightTheme;
      theme = "style";
    }

    link.setAttribute("href", currTheme);

    Save(theme);
}
