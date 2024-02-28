import React, { useState, useEffect } from 'react';

import axios from 'axios';

//Ionicons
import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch } from 'react-icons/io';
//Bootstrap Icons
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind } from 'react-icons/bs'
//purescript-react-icons
import { TbTemperatureCelsius } from 'react-icons/tb'
//IcoMoon
import { ImSpinner8 } from 'react-icons/im'

// API KEY OpenWeather
const APIkey = '301090ef474ac02442ac92a41d254b43';


const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Curitiba');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    if (inputValue !== '') {
      setLocation(inputValue);
    }

    const input = document.querySelector('input');

    //if input value if empty
    if (input.value === '') {
      //set animate to true
      setAnimate(true);
      //after 500ms set animate to false
      setTimeout(() => {
        setAnimate(false)
      }, 500);
    }

    //clear input
    input.value = '';

    e.preventDefault();
  }


  //fetch the data
  //requisição à API do OpenWeatherMap para obter os dados do clima da localização especificada
  useEffect(() => {
    //set loading to true
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=pt_br&appid=${APIkey}`;

    //Realiza uma requisição GET para a URL construída utilizando o Axios. Quando a resposta for recebida com sucesso, os dados da resposta são extraídos e armazenados no estado data 
    axios.get(url).then(res => {
      //set the data after 1500ms
      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, 1500);
    }).catch(err => {
      setLoading(false);
      setErrorMsg(err);
    })
  }, [location])

  //error message
  useEffect(() =>{
    const timer = setTimeout(() => {
      setErrorMsg('')
    }, 2000);
    //clear timer
    return () => clearTimeout(timer);
  }, [errorMsg])

  //if data is false show the loader
  if (!data) {
    return (
      <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center text-white'>
        <div>
          <ImSpinner8 className='text-5xl animate-spin' />
        </div>
      </div>
    )
  }

  console.log(data)
  //set the icon according to the weather
  let icon;

  
  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy  className='text-[#ffffff]'/>;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill  className='text-[#ffffff]'/>;
      break;
    case 'Rain':
      icon = <IoMdRainy  className='text-[#3899fb]'/>;
      break;
    case 'Clear':
      icon = <IoMdSunny  className='text-[#dff445]'/>;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill  className='text-[#3899fb]'/>;
      break;
    case 'Snow':
      icon = <IoMdSnow className='text-[#f3f3f3]'/>;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm className='text-[#3899fb]'/>;
      break;
  }

  //date object
  const date = new Date();

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex gap-4 flex-col items-center justify-center px-4 lg:px-0'>
      {errorMsg && <div className='w-full max-w-[450px] text-center text-white absolute p-2 top-10 capitalize rounded-md'>{`${errorMsg.response.data.message}`}</div>}
      {/* form */}
      <form
        className={`
        ${animate ? 'animate-shake' : 'animate-none'} 
        'h-16 bg-black/30 w-full max-w-[450px] rounded-full mb-8'`}
      >
        <div className='h-full flex items-center justify-between p-2'>
          <input
            onChange={(e) => handleInput(e)}
            className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-sm font-light pl-6 h-full'
            type='text'
            placeholder='Cidade ou País' />
          <button
            onClick={(e) => handleSubmit(e)}
            className='bg-sky-500 hover:bg-sky-600 w-20 h-12 rounded-full flex justify-center items-center transition'>
            <IoMdSearch className='text-2xl text-white' />
          </button>
        </div>
      </form>
      {/* card */}
      <div className='w-full max-w-[450px] min-h-[584px] bg-black/20 text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        {
          loading ? (
            <div className='w-full h-full flex justify-center items-center'>
              <ImSpinner8 className='text-white text-5xl animate-spin'/>
            </div>
          ) : (
            <div>
              {/* card top */}
              <div className='flex items-center justify-center gap-x-5'>
                <div className='text-[87px]'>{icon}</div>
                <div>
                  <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
                  <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
                </div>
              </div>
              {/* card body */}
              <div className='my-20'>
                <div className='flex justify-center items-center'>
                  {/* temp*/}
                  <div className='text-9xl leading-none'>{parseInt(data.main.temp)}</div>
                  {/* celsius icon*/}
                  <div className='text-4xl'>
                    <TbTemperatureCelsius />
                  </div>
                </div>
                {/* weather description */}
                <div className='capitalize text-center'>
                  {data.weather[0].description}
                </div>
              </div>
              {/* card bottom */}
              <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
                <div className='flex justify-between'>
                  <div className='flex items-center gap-x-2'>
                    {/* icon */}
                    <div className='text-[20px]'>
                      <BsEye />
                    </div>
                    <div>
                      Visibilidade <span className='ml-2'>{data.visibility / 1000} km</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    {/* icon */}
                    <div className='text-[20px]'>
                      <BsThermometer />
                    </div>
                    <div className='flex'>
                      Sensação
                      <div className='flex ml-2'>
                        {parseInt(data.main.feels_like)}
                        <TbTemperatureCelsius />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <div className='flex items-center gap-x-2'>
                    {/* icon */}
                    <div className='text-[20px]'>
                      <BsWater />
                    </div>
                    <div>
                      Umidade <span className='ml-2'>{data.main.humidity} %</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    {/* icon */}
                    <div className='text-[20px]'>
                      <BsWind />
                    </div>
                    <div className='flex'>
                      Vento
                      <div className='flex ml-2'>
                        {data.wind.speed} m/s

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
};

export default App;
