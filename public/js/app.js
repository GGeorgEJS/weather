// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })




const weatherForm = document.querySelector('form');
let searchElement = document.querySelector('input');
const messageOne = document.querySelector('.messageOne')
const messageTwo = document.querySelector('.messageTwo')
const messageThree = document.querySelector('.messageThree')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'loading...'
    fetch(`/weather?address=${searchElement.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = `${data.forcast.summary}. Cite: ${data.location} - temperature: ${data.forcast.temperature} - rain chance: ${data.forcast.rainChance} `
            }


        })

    })

})