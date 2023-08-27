// function declaration
const loadData = async (searchText='iphone') => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();

    // console.log(data.data);
    displayPhone(data.data);
}

function displayPhone(data) {
    // console.log(data);
    const container = document.getElementById('phone-container');
    container.innerHTML = "";
    data.forEach(element => {
        console.log(element);
        const card = document.createElement('div');
        card.classList = "card bg-base-100 shadow-xl";

        card.innerHTML = `
        <figure><img src="${element.image}" alt="Phones" /></figure>
        <div class="flex flex-col items-center p-6">
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
    const searchText = document.getElementById('searchText').value;

    loadData(searchText);


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