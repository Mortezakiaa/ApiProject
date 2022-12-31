// 'https://api.openweathermap.org/data/2.5/weather?q=ahvaz&appid=aba3442e55f7a5b85891683ac36bdca3&units=metric'
// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`

let form = document.querySelector("form");
let apikey = 'aba3442e55f7a5b85891683ac36bdca3';
let output = document.getElementById("output");
let span = document.querySelector("#show-err");
form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    let input = document.querySelector("input");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apikey}&units=metric`;
    fetch(url)
    .then((res)=>{return res.json()})
    .then((data)=>{
        let {main,name,sys,weather} = data;   
        const iconapi = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`; 
        let datares = 
        `<div class='d-flex flex-column gap-3 bg-light rounded-3 p-3 wid'>
            <h3 class='lead fs-1'>${name} ${sys.country}</h3>
            <div>
                <span class='text'>${Math.round(main.temp)}</span>
            </div>
            <img src='${iconapi}' alt='weathericon'>
            <span class='fs-2 text-muted'>${weather[0].description}</span>
        </div>`;
        output.innerHTML += datares;
        input.value = "";
        span.innerText = "";
    }).catch(()=>{
        span.innerText = "please enter valid city";
        input.value = "";
    })
})