
async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

let allSenators = []
let simpleSenators = []
let republicans = []
let democrats = []

const theData = getAPIData('senators.json').then(data => {
    allSenators = data.results[0].members
    simpleSenators = makeSimpleMap(allSenators)
    republicans = filterSenators(simpleSenators, "R")
    democrats = filterSenators(simpleSenators, "D")
    populateDOM(simpleSenators)
})

//map example
function makeSimpleMap(allOfThem) {
    let results = allOfThem.map(senator => {
        return{
            id: senator.id,
            name: `${senator.first_name} ${senator.last_name}`,
            party: senator.party,
            age: `Age: ${calculate_age(new Date(senator.date_of_birth))}`,
            rank: senator.state_rank,
            gender: senator.gender,
        }
    })
    return results
}

//filter example
function filterSenators(simpleList, partyAffiliation) {
    return simpleList.filter(senator => senator.party === partyAffiliation)
}

//reduce example
const testArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]

const testReduce = testArray.reduce((acc, num) => {
    return acc + num
}, 0)

const container = document.querySelector('.container')

function populateDOM(senator_array) {
    senator_array.forEach(senator => {
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        let cardImage = document.createElement('div')
        cardImage.setAttribute('class', 'card-image')
        let figure = document.createElement('figure')
        figure.setAttribute('class', 'image')
        let figureImage = document.createElement('img')
        figureImage.src = `https://www.congress.gov/img/member/${senator.id.toLowerCase()}_200.jpg`
        figureImage.alt = 'Placeholder image'

        figure.appendChild(figureImage)
        cardImage.appendChild(figure)
        card.appendChild(cardImage)
        card.appendChild(cardContent(senator))
        container.appendChild(card)
    })
}

function cardContent(senator) {
    let cardContent = document.createElement('div')
    cardContent.setAttribute('class', 'card-content')
    let media = document.createElement('div')
    media.setAttribute('class', 'media')
    let mediaLeft = document.createElement('div')
    mediaLeft.setAttribute('class', 'media-left')
    let figure = document.createElement('figure')
    figure.setAttribute('class', 'figImage')
    let image = document.createElement('img')
    if(senator.party === "R") {
        image.src = `/images/elephant.png`
    }
    if(senator.party === "D") {
        image.src = `/images/donkey.jpg`
    }
    if(senator.party === "ID") {
        image.src = `/images/ID.png`
    }
    image.alt = 'This picture indicates the senator\'s party'
    let mediaContent = document.createElement('div')
    mediaContent.setAttribute('class', 'media-content')
    let titleP = document.createElement('p')
    titleP.setAttribute('class', 'title is-6')
    titleP.textContent = senator.name
    let subtitleP = document.createElement('p')
    subtitleP.setAttribute('class', 'subtitle is-6')
    subtitleP.textContent = senator.rank

    let contentDiv = document.createElement('div')
    contentDiv.setAttribute('class', 'content')
    contentDiv.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
    let contentBreak = document.createElement('br')
    let ageP = document.createElement('p')
    ageP.textContent = senator.age


    mediaContent.appendChild(titleP)
    mediaContent.appendChild(subtitleP)
    figure.appendChild(image)
    mediaLeft.appendChild(figure)
    media.appendChild(mediaLeft)
    media.appendChild(mediaContent)

    contentDiv.appendChild(contentBreak)
    contentDiv.appendChild(ageP)
    cardContent.appendChild(media)
    cardContent.appendChild(contentDiv)
    return cardContent
}

function calculate_age(dob) {
    let diff_ms = Date.now() - dob.getTime()
    let age_dt = new Date(diff_ms)

    return Math.abs(age_dt.getUTCFullYear() - 1970)
}


