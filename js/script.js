// Phone Search
const loadPhones = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data))
}

const loadPhoneDetail = () => {
    const searchText = document.getElementById('search-field').value;
    loadPhones(searchText);
    document.getElementById('search-field').value = '';

}

const displayPhones = phones => {
    const container = document.getElementById('phones');
    container.textContent = '';
    if(phones.length == 0 ){
        const p = document.createElement('p');
        p.innerHTML = `<p class="text-center">Result Not Found</p>`;
        container.appendChild(p);   
    }
    else{
        phones?.forEach(phone =>  {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="flex flex-col items-center border-2 p-8 bg-gray-100 shadow-lg w-80">
                <img src="${phone.image}" alt="" srcset="">
                <h3 class="mt-5">Name: ${phone.phone_name}</h3>
                <h4 class="my-3">Brand Name: ${phone.brand}</h4>
                <button class="border-2 rounded-full bg-sky-300 w-32" onclick="loadMoreDetails('${phone.slug}')"><a href="#${phone.slug}">See Details</a></button>
            </div>
        `;
        container.appendChild(div);
        });
    }
    
}

// Phone More Details
const loadMoreDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMoreDetails(data.data));
}

const displayMoreDetails = phoneDetails => {
    const detailsDiv = document.getElementById('phone_details');
            detailsDiv.innerHTML = `
            <div class="border-2 p-8 bg-gray-100 shadow-lg">
            <div class="flex justify-center">
            <img src="${phoneDetails.image}" alt="" srcset="">
            </div>
                    <p><span class="font-medium">Model:</span> ${phoneDetails.name}</p>
                    <p><span class="font-medium">Brand:</span> ${phoneDetails.brand}</p>
                    <p><span class="font-medium">Release Date:</span> ${phoneDetails.releaseDate}</p>
                    <p class="font-medium text-center">Main Features</p>
                    <p><span class="font-medium">Storage:</span> ${phoneDetails.mainFeatures.storage}</p>
                    <p><span class="font-medium">Display Size:</span> ${phoneDetails.mainFeatures.displaySize}</p>
                    <p><span class="font-medium">Chipset:</span> ${phoneDetails.mainFeatures.chipset}</p>
                    <p><span class="font-medium">Memory:</span> ${phoneDetails.mainFeatures.memory}</p>
                    <p><span class="font-medium">Sensors:</span> ${phoneDetails.mainFeatures.sensors}</p>
                    <p class="font-medium text-center">Others</p>
                    <p><span class="font-medium">WLAN:</span> ${phoneDetails.others.WLAN ? phoneDetails.others.WLAN: ''}</p>
                    <p><span class="font-medium">Bluetooth:</span> ${phoneDetails.others.Bluetooth ? phoneDetails.others.Bluetooth: ''}</p>
                    <p><span class="font-medium">GPS:</span> ${phoneDetails.others.GPS ? phoneDetails.others.GPS: ''}</p>
                    <p><span class="font-medium">NFC:</span> ${phoneDetails.others.NFC ? phoneDetails.others.NFC: ''}</p>
                    <p><span class="font-medium">Radio:</span> ${phoneDetails.others.Radio ? phoneDetails.others.Radio: ''}</p>
                    <p><span class="font-medium">USB:</span> ${phoneDetails.others.USB ? phoneDetails.others.USB: ''}</p>
                </div>
            `;

}