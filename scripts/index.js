// function declaration
const loadData = async (searchText='iphone', isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    
    // console.log(data.data);
    displayPhone(data.data, isShowAll);
}

function displayPhone(data, isShowAll) {
    // console.log(data);
    const fullData = data;
    if (!isShowAll){
        data = data.slice(0, 12);
    }
    // get the container
    const container = document.getElementById('phone-container');
    // clear the field
    container.innerHTML = "";
    // show all button is visible if search result is more than 12
    if (fullData.length > 12 && !isShowAll) {
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
            <button class="btn btn-primary" onclick="showDetails('${element.slug}')">Show Details</button>
          </div>
        </div> 
        `;

        container.appendChild(card);
    });



}

function searchHandler(isShowAll) {
    toggleLoadingSpinner(true);
    const searchText = document.getElementById('searchText').value;
    loadData(searchText, isShowAll);
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
// show all button function
const showAll = () => {
    searchHandler(true);
}
// Modal data load function
async function showDetails(id) {
    // console.log(id);
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    // console.log(data);
    // show data in modal
    showModal(data.data);
}

const showModal = (data) => {
    console.log(data);
    console.log(data.mainFeatures.storage);
    // use daisyUI to call modal using id
    my_modal.showModal()
    // get the modal container
    const modal = document.getElementById('modalBox');
    modal.classList = "card  shadow-xl";
    modal.innerHTML = `
        <figure><img src="${data.image}" alt="phone"></figure>
        <div class="card-body">
            <h2 class="card-title text-5xl">${data.name}</h2>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <p><span class="font-bold">Storage: </span >${data.mainFeatures.storage}</p>
            <div class="modal-action">  
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-secondary">Close</button>
            </div>
        </div>
    `;
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