
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
    if(!phones){
        const p = document.createElement('p');
        p.innerText = `Result Not Found</p>`;
        container.appendChild(p);
    }
    else {
        phones?.forEach(phone =>  {
        const div = document.createElement('div');
        div.classList.add('col');
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

loadPhones('phones');

