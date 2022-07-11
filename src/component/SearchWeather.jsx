import React, { useState, useEffect } from 'react'

const SearchWeather = () => {

    let time = new Date().toLocaleTimeString();

    const [ctime, setCtime] = useState(time);
    const [search, setSearch] = useState("London");
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    let componentMounted = true;


    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=e9437d7a39f9e5e8534e8465ac0edc62`);
            if (componentMounted) {
                setData(await response.json());
                console.log(data);
            }

            return () => {
                componentMounted = false;
            }
        }
        fetchWeather();
    }, [search])

    let emoji = null;
    if (typeof data.main != "undefined") {
        if (data.weather[0].min == "Clouds") {
            emoji = "fa-cloud"
        } else if (data.weather[0].min == "Thunderstorm") {
            emoji = "fa-bolt"
        } else if (data.weather[0].min == "Drizzle") {
            emoji = "fa-cloud-rain"
        } else if (data.weather[0].min == "Rain") {
            emoji = "fa-cloud-shower-heavy"
        } else if (data.weather[0].min == "Snow") {
            emoji = "fa-snow-flake"
        } else {
            emoji = "fa-smog"
        }
    } else {
        return (
            <div>...loading</div>
        )
    }

    let temp = (data.main.temp - 273.15).toFixed(2);
    let temp_min = (data.main.temp_min - 273.15).toFixed(2);
    let temp_max = (data.main.temp_max - 273.15).toFixed(2);

    //date
    let d = new Date();

    let date = d.getDate();

    let year = d.getFullYear();
    //let month = d.getMonth();
    let month = d.toLocaleDateString("default", { month: 'long' });
    //let month = d.Intl.DateTimeFormat('en-US', { weekday: 'long'});
    //let day = d.toLocaleDateString("default", {day: 'long'});
    //let day = d.toLocaleString("default",{day:'short'});
    //let day = d.getDay();
    var daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var weekdayNum = d.getDay();
    var day = daysArray[weekdayNum];

    //time
    // let time = d.toLocaleString([],{
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     second: '2-digit'
    // }); 
    

    const UpdateTime = () => {
         time = new Date.toLocaleTimeString();
        setCtime(time);
    };
    setInterval(UpdateTime, 1000);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input);
    }

    return (
        <div className='background'>
            <div className="container-mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card text-white text-center border-0">
                            <img src={`https://source.unsplash.com/600x600/?${data.weather[0].main}`}
                                className="card-img" alt="image" />
                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4 mt-2 w-75 mx-auto">
                                        <input type="search"
                                            className="form-control"
                                            placeholder="Search City"
                                            aria-label="Search City"
                                            aria-describedby="basic-addon2"
                                            name="search"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="input-group-text" id="basic-addon2">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3">
                                    <h1 className="card-title">{data.name}</h1>
                                    <p className="card-text lead">
                                        {day}, {month} {date},{year}
                                        <br />
                                        {ctime}
                                    </p>
                                    <hr />
                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className='fw-bolder mb-5'>{temp} &deg;C </h1>
                                    <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                                    <p className="lead">{temp_min} &deg;C | {temp_max} &deg;C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchWeather;

