const name=new URLSearchParams(window.location.search).get('name');
const flagImage= document.querySelector(".country-details img");
const countryNameH1=document.querySelector(".country-details h1");
const nativeName=document.querySelector(".native-name");
const population=document.querySelector(".population");
const region=document.querySelector(".region");
const subRegion=document.querySelector(".sub-region");
const capital=document.querySelector('.capital');
const topLevelDomain=document.querySelector(".top-level-domain")
const currency=document.querySelector(".currency");
const language=document.querySelector('.language');
const borderCountries=document.querySelector(".border-countries")


fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
.then((res)=>{
    return res.json();
})
.then((data)=>{
    console.log(data[0])
    flagImage.src=data[0].flags.svg;
    countryNameH1.innerHTML=data[0].name.common
    population.innerHTML=data[0].population
    region.innerHTML=data[0].region
    if(data[0].capital)
    capital.innerHTML=data[0].capital;
    if(data[0].subregion)
    subRegion.innerHTML=data[0].subregion
    currency.innerHTML=Object.keys(data[0].currencies

    )
    if(data[0].languages)
    language.innerHTML=Object.keys(data[0].languages).join(', ')
    topLevelDomain.innerHTML=data[0].tld.join(', ')
    const borders=data[0].borders;
    if(borders){
        
    borders.forEach(element => {
        fetch(`https://restcountries.com/v3.1/alpha/${element}`)
        .then((res)=>res.json())
        .then((data)=>{
            const borderCountryTag=document.createElement("a")
        borderCountryTag.innerHTML=data[0].name.common;
         borderCountryTag.href=`country.html?name=${data[0].name.common}`
        borderCountries.append(borderCountryTag)
       

        })
        const borderCountryTag=document.createElement("a")
        borderCountryTag.innerHTML=element; 
       
    });
    }
    if(data[0].name.nativeName){
        console.log(Object.keys(data[0].name.nativeName)[0])
        nativeName.innerHTML=Object.keys(data[0].name.nativeName)[0]
    }
    else{
        nativeName.innerHTML=data[0].name.common
    }
})

