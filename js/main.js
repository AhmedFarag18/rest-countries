let i = 0;

let selected = document.querySelector(".select_box");
let selectBox = document.querySelector("#box");
let selectElements = document.querySelectorAll("#box li");
let selectedIcon = document.querySelector(".selected i.fas");
let selectedText = document.querySelector(".selected span");
let searchBox = document.getElementById("search");
let searchIcon = document.querySelector(".search_box .fa-search");

let cardCountry = document.querySelector(".countries");
let details = document.querySelector(".country-details");
let backBtn = document.querySelector(".btn_back");


/* -------------- Toggle Select Box of Regions  ------------------- */
selected.addEventListener("click", function() {
    if (!selectBox.classList.contains("show")) {
        selectedIcon.classList.remove("fa-caret-right");
        selectedIcon.classList.add("fa-caret-down");
        selectBox.classList.add("show");
    } else {
        selectedIcon.classList.add("fa-caret-right");
        selectedIcon.classList.remove("fa-caret-down");
        selectBox.classList.remove("show");
    }
});

/* -------------- Fetch All Countries  ------------------- */
function getAllCountries() {
    fetch(`https://restcountries.com/v2/all`)
        .then(response => response.json())
        .then(data => {
            getCountries(data);
        })
        .catch(err => {
            console.log(err);
        });
}
getAllCountries();
/* -------------- Get All Countries  ------------------- */
function getCountries(data) {
    for (i = 0; i < data.length; i++) {
        document.querySelector("#card").innerHTML +=
            `
            <div id="content${i+1}">
                <img src="${data[i].flags.png}" alt="${i+1}">
                <div class="info">
                    <h3 class="card-title">${data[i].name}</h3>
                    <p class="population">Population: <span>${data[i].population}</span></p>
                    <p class="region">Region: <span>${data[i].region}</span></p>
                    <p class="capital">Capital: <span>${data[i].capital}</span></p>
                </div>
            </div>
        `;
    }

    getDataSelectedItem(data);
}

function getDataSelectedItem(data) {
    let card = document.querySelectorAll(".card > div");
    card.forEach(cardItem => {
        cardItem.addEventListener("click", () => {
            cardCountry.classList.add("hidden");
            details.classList.remove("hidden");

            const currentItem = cardItem.querySelector("img");
            ItemIndex = (currentItem.getAttribute("alt")) - 1;
            getDetailsData(ItemIndex, data);
        });
    });

}

/* ------------- Selected Region to get countries  ----------------- */
selectElements.forEach(item => {
    item.addEventListener("click", () => {
        filterByRegion(item);
    })
});

/* ------------- filtering by region ----------------*/
function filterByRegion(item) {
    selectedText.innerHTML = `${item.textContent}`;
    getDataByRegion(item);
}

/* ----------- Get Data of Region Selected --------------- */
function getDataByRegion(item) {
    fetch(`https://restcountries.com/v2/region/${item.textContent.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector("#card").innerHTML = "";
            getCountries(data);
        }).catch(err => {
            console.log(err)
        })
}

/* ------------- when click search button ---------------- */
searchIcon.addEventListener("click", () => {
    searchByName(searchBox.value);
});

/* --------------- Search by Name of Country ----------------*/
function searchByName(name) {
    fetch(`https://restcountries.com/v2/name/${name}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                document.querySelector("#card").innerHTML = "";
                getCountries(data);
            } else {
                document.querySelector("#card").innerHTML = `<h1>No Country Match ${searchBox.value}</h1>`;
            }
        })
        .catch(err => {
            console.log(err);
        });
}

/* ---------- Get Data And Show Details Section ---------------- */
function getDetailsData(index, data) {
    document.querySelector(".country-data").innerHTML =
        `<div class="country-image">
                <img src="${data[index].flags.png}" alt="country Image">
            </div>
            <div class="country-text">
                <h4>${data[index].name}</h4>
                <div class="info">
                    <div class="left">
                        <p><span>Native Name: </span> ${data[index].nativeName}</p>
                        <p><span>population: </span>${data[index].population}</p>
                        <p><span>region: </span>${data[index].region}</p>
                        <p><span>sub region: </span>${data[index].subregion}</p>
                    </div>
                    <div class="right">
                        <p><span>top Level Domain: </span>${data[index].topLevelDomain}</p>
                        <p><span>currencies: </span>${data[index].currencies[0].name}</p>
                        <p class="languages">
                            <span>languages: </span>
                        </p>
                    </div>
                </div>
                <div class="borders" id="borders">Border Countries:  
                    
                </div>
            </div>`;

    getAllBorders(index, data);
    getAllLanguages(index, data);
    getDataSelectedBorder(data[index].alpha3Code);
}

/* ---------------  When Click The Back Button --------------- */
backBtn.addEventListener("click", () => {
    details.classList.add("hidden");
    cardCountry.classList.remove("hidden");
});

/* --------------- Get All Borders --------------- */
function getAllBorders(index, data) {
    let bordersLength = data[index].borders.length;
    let borders = document.getElementById("borders");

    for (let a = 0; a < bordersLength; a++) {
        borders.innerHTML += `<span>${data[index].borders[a]}</span>`
    }
}

/* --------------- Get All Languages --------------- */
function getAllLanguages(index, data) {
    let languagesLength = data[index].languages.length;
    let languages = document.querySelector(".languages");

    for (let m = 0; m < languagesLength; m++) {
        languages.innerHTML += data[index].languages[m].name + `${(m == languagesLength-1 ?"":", ")}`;
    }
}

/*--------------- Get Details data When click at Item---------------*/
function getDetailsOfBorder(data) {
    document.querySelector(".country-data").innerHTML =
        `<div class="country-image">
                <img src="${data.flags.png}" alt="country Image">
            </div>
            <div class="country-text">
                <h2>${data.name}</h2>
                <div class="info">
                    <div class="left">
                        <p><span>Native Name: </span> ${data.nativeName}</p>
                        <p><span>population: </span>${data.population}</p>
                        <p><span>region: </span>${data.region}</p>
                        <p><span>sub region: </span>${data.subregion}</p>
                    </div>
                    <div class="right">
                        <p><span>top Level Domain: </span>${data.topLevelDomain}</p>
                        <p><span>currencies: </span>${data.currencies[0].name}</p>
                        <p class="languages">
                            <span>languages: </span>
                        </p>
                    </div>
                </div>
                <div class="borders" id="borders">Border Countries:  
                    
                </div>
            </div>`;

    /* --------------- Get All Borders --------------- */
    let bordersLength = data.borders.length;
    let borders = document.getElementById("borders");
    for (let a = 0; a < bordersLength; a++) {
        borders.innerHTML += `<span>${data.borders[a]}</span>`
    }

    let languagesLength = data.languages.length;
    let languages = document.querySelector(".languages");
    for (let m = 0; m < languagesLength; m++) {
        languages.innerHTML += data.languages[m].name + `${(m == languagesLength-1 ?"":", ")}`;
    }

    getDataSelectedBorder(data.alpha3Code);

}

/*--------------- Get Details data When click at Item---------------*/
function searchByAlpha(alpha) {
    fetch(`https://restcountries.com/v2/alpha/${alpha}`)
        .then(response => response.json())
        .then(data => {

            getDetailsOfBorder(data);
        })
        .catch(err => {
            console.log(err);
        });
}

function getDataSelectedBorder(alpha3Code) {
    let BorderCountries = document.querySelectorAll(".borders span");
    BorderCountries.forEach(element => {
        element.addEventListener("click", () => {
            alpha3Code = element.textContent;
            searchByAlpha(alpha3Code);
        });
    })
}

/*------------ Toogle Theme - light and dark mode --------*/
let btnMode = document.querySelector(".mode");
let container = document.body;
let modeIcon = document.querySelector(".mode i");

function toggleTheme() {
    if (localStorage.getItem("countries-theme") !== null) {
        if (localStorage.getItem("countries-theme") === "dark") {
            container.classList.add("dark");
        } else {
            container.classList.remove("dark");
        }
    }
    updateIcon();
}
toggleTheme();

btnMode.addEventListener("click", function() {
    container.classList.toggle("dark");
    if (container.classList.contains("dark")) {
        localStorage.setItem("countries-theme", "dark");
    } else {
        localStorage.setItem("countries-theme", "light");
    }
    updateIcon();
});

function updateIcon() {
    if (container.classList.contains("dark")) {
        modeIcon.classList.add("fas");
        modeIcon.classList.remove("far");
    } else {
        modeIcon.classList.add("far");
        modeIcon.classList.remove("fas");
    }
}
