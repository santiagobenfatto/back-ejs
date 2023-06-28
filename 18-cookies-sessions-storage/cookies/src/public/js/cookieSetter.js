const form = document.getElementById('cookieForm')

form.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)

    fetch('/cookie', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json=> console.log(json))
})

const getCookie = () => {
    console.log(document.cookie)
}