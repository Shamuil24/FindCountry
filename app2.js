document.addEventListener("DOMContentLoaded", () => {
    let currentUrlStr = window.location.href;
    let currentUrl = new URL(currentUrlStr);
    let common = currentUrl.searchParams.get("common");
    const countryContainerInfo = document.querySelector('.country-container-info')

    srchInputCountry(common)


    function getCountry(element) {
        countryContainerInfo.innerHTML = '';
        const { name: { common, nativeName }, population, region, capital, subregion, tld, currencies, languages, borders } = element[0]
        const fullName = `${common} ${population} ${region} ${capital}`

        const { flags: { png } } = element[0]
        const img = `${png}`
        countryContainerInfo.innerHTML +=
            `
            
        <div class = 'card'>
            <div class = 'img-container'>
                <img src="${png}" alt="img" class='mem-img'/></div>
                <div class = 'info-container'>    
                <h1 class='h2-container'>${common}</h1>
                <div class = 'p-container'>
                    <div class = 'first-column-p'>
                        <p><b>Native Name:</b> ${Object.values(nativeName)[0].official} </p>
                        <p><b>Population:</b> ${population.toLocaleString("en-US")}</p>
                        <p><b>Region:</b> ${region}</p>
                        <p><b>Sub Region:</b> ${subregion}</p>
                        <p><b>Capital:</b> ${capital}</p>
                    </div>
                    <div class = 'second-column-p'>
                        <p><b>Top Level Domain:</b> ${tld}</p>
                        <p><b>Currencies: </b> ${Object.values(currencies)[0].name} </p>
                        <p><b>Languages: </b> ${Object.values(languages).join(', ')} </p>
                    </div>
                </div>
                <div class="border-country">
                    <p class='border-ctr-p'><b>Border Countries:</b> </p>
                    <div class='border-ctr-btns'>

                    </div>
                </div>
            </div>
</div>
        `
        searchCountryByCode(borders)
    }

    async function srchInputCountry(name) {
        const strCountry = await fetch(`https://restcountries.com/v3.1/name/${name}`)
        const results = await strCountry.json()
        getCountry(results)
    }


    async function searchCountryByCode(border) {
        const borderBtn = document.querySelector('.border-ctr-btns')
        try { 
            border.forEach(async code => {
            const data = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
            const results = await data.json()

            const {
                name: {common}
            } = results[0]

            borderBtn.innerHTML +=
            `
            <a href="index2.html?common=${common}"><button data-id='${common}' class='bcb'>${common}</button></a>
            `
        });
            
        } catch (error) {
            console.log(error.massage)
        }
    }
})

let btn = document.querySelector(".header-button");
let link = document.querySelector("#theme-link");

btn.addEventListener("click", () => { ChangeTheme(); });

function ChangeTheme()
{
    let lightTheme = "style2.css";
    let darkTheme = "styledark2.css";

    let currTheme = link.getAttribute("href");
    let theme = "";

    if(currTheme == lightTheme)
    {
      
      btn.textContent = "Light Mode";
      currTheme = darkTheme;
      theme = "styledark2";
    }
    else
    {    
      btn.textContent = "Dark Mode";
      currTheme = lightTheme;
      theme = "style2";
    }

    link.setAttribute("href", currTheme);
/* 
    Save(theme); */
}
