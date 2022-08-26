
let userID = "recDESJunABa1GfHN"
let userData

function loadProfile() {
    fetchSpeaker(getUserId())

}

function getUserId()  {
    const pageURL = window.location.href
    const idStartIndex = (pageURL.search("sid") + 4)
    return [...pageURL].slice(idStartIndex, idStartIndex + 17).join('')
}



function fetchSpeaker(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
        
    };

fetch(`https://v1.nocodeapi.com/ryanwalker64/airtable/IwbPffmYucanXbbx/record?tableName=Speakers&id=${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        userData = result
        console.log(userData)
        createProfile(userData)
    })
    .catch(error => console.log('error', error));
}

function createProfile(data) {
    const name = document.querySelector('[data-speaker="name"]')
    const pronouns = document.querySelector('[data-speaker="pronouns"]')
    const tagline = document.querySelector('[data-speaker="tagline"]')
    const tagContainer = document.querySelector('[data-speaker="tag-container"]')
    const locationContainer = document.querySelector('[data-speaker="location-container"]')
    const travel = document.querySelector('[data-speaker="willing-travel"]')
    const speakerFee = document.querySelector('[data-speaker="speaker-fee"]')
    const photo = document.querySelector('[data-speaker="photo"]')
    const bio = document.querySelector('[data-speaker="bio"]')
    const contactBtn = document.querySelector('[data-speaker="contact-btn"]')
    const industriesContainer = document.querySelector('[data-speaker="industries-container"]')
    // const linksContainer = document.querySelector('[data-speaker="links-container"') to add
    
    document.title = `${data.fields['Preferred Name']} | Represent`
    name.textContent = data.fields['Preferred Name']
    // pronouns.textContent = data.fields['Preferred Name(s)']
    tagline.textContent = data.fields['Tagline']
    tagContainer.innerHTML = data.fields['Topics'].map(topic => {return `<div class="text-block-12">${topic}</div>`}).join('')
    locationContainer.innerHTML = data.fields['Regions'].map(location => {return `<div>${location}</div>`})
    photo.src = data.fields['Image'][0].thumbnails.large.url
    bio.textContent = data.fields['Long Bio']
    contactBtn.textContent = `Contact ${data.fields['Preferred Name(s)']}`
    industriesContainer.insertAdjacentHTML("beforeend", data.fields['Industries'].map(industry => {return `<li>${industry}</li>`}).join(''))
    // pronouns.insertAdjacentHTML("beforeend",data.fields[''].map(pronoun => {return `<div>${pronoun}</div>`}))

    travel ? travel.textContent = 'Willing to travel' : travel.textContent = ''
    // if (speakerFee) { travel.textContent = 'Willing to travel'}

}
// change title of page


loadProfile()