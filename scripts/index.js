// function declaration
const loadData = async (searchText='iphone') => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    
    // console.log(data.data);
    displayPhone(data.data);
}

function displayPhone(data) {
    // console.log(data);
    const fullData = data;
    data = data.slice(0, 12);
    // get the container
    const container = document.getElementById('phone-container');
    // clear the field
    container.innerHTML = "";
    // show all button is visible if search result is more than 12
    if (fullData.length > 12) {
        document.getElementById('btn-sa').classList.remove('hidden');
    }
    else {
        document.getElementById('btn-sa').classList.add('hidden');
    }


    // display cards
    data.forEach(element => {
        // console.log(element);
        const card = document.createElement('div');
        card.classList = "card bg-base-100 shadow-xl";

        card.innerHTML = `
        <figure><img src="${element.image}" alt="Phones" /></figure>
        <div class="card-body flex flex-col items-center p-6">
          <h2 class="card-title">${element.phone_name}</h2>
          <p class="text-center mt-5">There are many variations of passages of available, but the majority have suffered</p>
          <h3 class="font-bold mt-2">$999</h3>
          <div class="card-actions justify-center mt-4">
            <button class="btn btn-primary">Show Details</button>
          </div>
        </div> 
        `;

        container.appendChild(card);
    });



}

function searchHandler() {
    toggleLoadingSpinner(true);
    const searchText = document.getElementById('searchText').value;
    loadData(searchText);
    toggleLoadingSpinner(false);
}

const toggleLoadingSpinner = (isLoading) => {
    const spinner = document.getElementById('loadingSpinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}

// call functions
loadData();

// bind enter key with search button
const searchInput = document.getElementById('searchText');

searchInput.addEventListener("keyup", event => {
    // if enter(13) is triggered
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('btn-search').click();
    }
})