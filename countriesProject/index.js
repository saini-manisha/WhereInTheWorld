let countriesContainer = document.querySelector(".countries-container")
const filterByRegion=document.querySelector(".filter-by-region");
const searchInput=document.querySelector(".search-container input")
let allCountriesData;
fetch("https://restcountries.com/v3.1/all")
   .then((res) => res.json())
   .then((data) => {
      allCountriesData=data
     renderCountries(data)
   })


filterByRegion.addEventListener("change",(e)=>{  
   
   fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
   .then((res) => res.json())
   .then((data) => {
      renderCountries(data);
   })
})

function renderCountries(countries){
   countriesContainer.innerHTML='';
   countries.map((country)=>{
      const countryCard = document.createElement("a");
   countryCard.classList.add("country-card");
   countryCard.href=`/country.html?name=${country.name.common}`
   countryCard.innerHTML =`
   <img src=${country.flags.svg} alt=${country.name.common}>
             <div class="card-text">
          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population: </b>${country.population.toLocaleString('en-IN')} </p>
          <p><b>Region: </b>${country.region}</p>
          <p><b>Capital: </b>${country.capital?.[0]}</p>
         </div>
`;
   countriesContainer.append(countryCard);

   })
   


}


searchInput.addEventListener("input",(e)=>{
   
   const filterCountry=allCountriesData.filter((country)=>{
      return country.name.common.toLowerCase().includes((e.target.value.toLowerCase()))
   });
   
  renderCountries(filterCountry)
  if(e.target.value==""){
   renderCountries(allCountriesData)
  }
})