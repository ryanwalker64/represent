const speakerContainer = document.querySelector('[data-container="speaker-container"]')
const hideInfoCheck = document.querySelector('[data-checkbox="hide"]')

hideInfoCheck.addEventListener('change', () => {
    const profilePhotos = document.querySelectorAll('.image-9')
    const profileNames = document.querySelectorAll('.heading-3')

    profilePhotos.forEach(el => {
        el.classList.toggle('hidden')
    })
})

let userBase

function fetchSpeakers() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
        
    };

fetch(`https://v1.nocodeapi.com/ryanwalker64/airtable/IwbPffmYucanXbbx?tableName=Speakers&fields=Preferred%20Name,Tagline,Image,Regions&view=WebsiteAPI`, requestOptions)
    .then(response => response.json())
    .then(result => {
        userBase = result.records
        console.log(userBase)
        createProfiles(userBase)
    })
    .catch(error => console.log('error', error));
}

function createProfiles(data) {
    const profileHtml = data.map(profile => {
        return `
        <a href="/speaker?sid=${profile.id}" class="w-inline-block">
            <div data-profile="photo" class="fix">
            <img src="${profile.fields.Image[0].thumbnails.large.url}" loading="lazy" alt="${profile.fields['Preferred Name']}" class="image-9"></div>
            <h3 class="heading-3" data-profile="name">${profile.fields['Preferred Name']}</h3>
            <div>${profile.fields['Tagline']}</div>
        </a>`
    }).join('')

    speakerContainer.innerHTML = profileHtml

    hideInfoCheck.addEventListener('change', () => {
        const profilePhotos = document.querySelectorAll('[data-profile="photo"]')
        const profileNames = document.querySelectorAll('[data-profile="name"]')
        hide(profileNames)
        hide(profilePhotos)
    })

}

function hide(els) {
    els.forEach(el => {
        el.classList.toggle('hidden')
    })
}


const locationFilter = document.querySelector('[data-filter="location"]')
const filters = document.querySelectorAll('[data-filter]')

filters.forEach((el)=>{
	let settings = {
        maxItems: null,
        plugins: ['remove_button']
    };
 	new TomSelect(el,settings);
})

function filterSpeakers() {
    const filters = ["Te Tai Tokerau / Northland", "Ōtākou / Otago"]
    let filtered = []

    filters.forEach(filter => {
        const results = filtered.push(userBase.filter(speaker => {
            return speaker.fields.Regions.includes(filter)}))
        filtered.push(...results)
    })


    // const results = userBase.filter(speaker => {
    //      return speaker.fields.Regions.includes("Te Tai Tokerau / Northland") ||
    //             speaker.fields.Regions.includes("Ōtākou / Otago")
    //     })
    console.log(filtered)
}

fetchSpeakers()

// add speakers to localstorage to save API loading

