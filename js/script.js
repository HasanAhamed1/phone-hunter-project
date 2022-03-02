// const toggleSpinner = displayStyle => {
//     document.getElementById('spinner').style.display = displayStyle;
// }
// const toggleSearchResult = displayStyle => {
//     document.getElementById('phones').style.display = displayStyle;
// }


const loadPhoneDetail = () => {
    const searchText = document.getElementById('search-field').value;
    // toggleSpinner('block');
    // toggleSearchResult('none');
    loadPhones(searchText);
    document.getElementById('search-field').value = '';
}

const loadPhones = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data))
}

const displayPhones = phones => {
    const container = document.getElementById('phone_view');
    container.textContent = '';
    if(!phones){
        const p = document.createElement('p');
        p.innerHTML = `<p>No Result Found</p>`;
        container.appendChild(p);
    }
    else{
        phones?.forEach(phone =>  {
            const div = document.createElement('div');
            
            div.innerHTML = `
            <div class="flex flex-col items-center border-2 p-8 bg-gray-100 shadow-lg w-80">
                <img src="${phone.image}" alt="" srcset="">
                <h3 class="mt-5">Name: ${phone.phone_name}</h3>
                <h4 class="my-3">Brand Name: ${phone.brand}</h4>
                <button class="border-2 rounded-full bg-sky-300 w-32" onclick="loadMoreDetails('${phone.slug}')">See Details</button>
            </div>
        `;
            container.appendChild(div);
        });
    }
}

//loadPhones('phones');

const loadMoreDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMoreDetails(data.data));
}

const displayMoreDetails = phoneDetails => {
    const detailsDiv = document.getElementById('phone_details');
            detailsDiv.innerHTML = `
            <div class="border-2 p-8 bg-gray-100 shadow-lg w-auto">
            <div class="flex justify-center">
            <img src="${phoneDetails.image}" alt="" srcset="">
            </div>
                    <p class="mt-5">Model: ${phoneDetails.name}</p>
                    <p class="mt-5">Brand: ${phoneDetails.brand}</p>
                    <p>Release Date: ${phoneDetails.releaseDate}</p>
                    <p>Main Features:</p>
                    <p class="mt-5">Storage: ${phoneDetails.mainFeatures.storage}</p>
                    <p class="mt-5">Display Size: ${phoneDetails.mainFeatures.displaySize}</p>
                    <p class="mt-5">Chipset: ${phoneDetails.mainFeatures.chipset}</p>
                    <p class="mt-5">Memory: ${phoneDetails.mainFeatures.memory}</p>
                    <p class="mt-5">Sensors: ${phoneDetails.mainFeatures.sensors}</p>
                    <p>Others</p>
                    <p class="mt-5">WLAN: ${phoneDetails.others.WLAN ? phoneDetails.others.WLAN: ''}</p>
                    <p class="mt-5">Bluetooth: ${phoneDetails.others.Bluetooth ? phoneDetails.others.Bluetooth: ''}</p>
                    <p class="mt-5">GPS: ${phoneDetails.others.GPS ? phoneDetails.others.GPS: ''}</p>
                    <p class="mt-5">NFC: ${phoneDetails.others.NFC ? phoneDetails.others.NFC: ''}</p>
                    <p class="mt-5">Radio: ${phoneDetails.others.Radio ? phoneDetails.others.Radio: ''}</p>
                    <p class="mt-5">USB: ${phoneDetails.others.USB ? phoneDetails.others.USB: ''}</p>
                </div>
            `;

}