// ! Calling multiple APIs at a time

let display=document.querySelector('#displayBlock')
let input=document.querySelector('#ipInput')
input.addEventListener('keyup',e=>{
    let val=e.target.value
    if(e.key==='Enter'){
        getLocationByIp(val)
    }
})

let getLocationByIp= async(ipAddress)=>{
    await fetch(`https://ipinfo.io/${ipAddress}/json?token=9019c2341ae6c3`)
        .then(response => response.json())
        .then(data => {
            let lat=data?.loc?.split(',')?.[0]
            let long=data?.loc?.split(',')?.[1]
            let city=data?.city
            let para=document.createElement('p')
            para.innerHTML=city + ' by IP Info Api 1st always'
            display.appendChild(para)
            weatherApiFunc(lat,long)
            locationIqFunc(lat,long)
            bigDataGeoFunc(lat,long)
            console.log(data)
        })
        .catch(error => {
            console.error('Error', error)
        })
}

let weatherApiFunc= async(lat,long)=>{
    const API_KEY='6c67ac8bbcd200cc4e2cd96824e9cc1f'
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let city=data?.name
        let para=document.createElement('p')
        para.innerHTML=city + ' by Weather Api called 2nd'
        display.appendChild(para)
    })
    .catch(error => {
        console.error('Error', error)
    })
}

let locationIqFunc= async(lat,long)=>{
    const API_KEY='pk.ae15c9e018141dcd1da556d56c0c638e'
    await fetch(`https://us1.locationiq.com/v1/reverse?key=${API_KEY}&lat=${lat}&lon=${long}&format=json`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let city=data?.address?.city
        let para=document.createElement('p')
        para.innerHTML=city + ' by Loc IQ Api called 3rd'
        display.appendChild(para)
    })
    .catch(error => {
        console.error('Error', error)
    })
}

let bigDataGeoFunc= async(lat,long)=>{
    await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let city=data?.city
        let para=document.createElement('p')
        para.innerHTML=city + ' by RevGeo Api called 4th'
        display.appendChild(para)
    })
    .catch(error => {
        console.error('Error', error)
    })
}


