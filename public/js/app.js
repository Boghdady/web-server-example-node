console.log('Client side javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})







const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const paragraphOne = document.querySelector('#p1')
const paragraphTwo = document.querySelector('#p2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    paragraphOne.textContent = '..... loading'
    paragraphTwo.textContent = ''
        fetch('http://127.0.0.1:3000/weather?address='+encodeURIComponent(location)+'').then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    paragraphOne.textContent = 'Error'
                    paragraphTwo.textContent = data.error
                } else {
                    paragraphOne.textContent = data.forecast.summary
                    paragraphTwo.textContent = data.location
                    console.log(data.forecast)
                    console.log(data.location)
                }
            })
        })


})