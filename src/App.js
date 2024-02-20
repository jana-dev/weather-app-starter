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

  //fetch the data
  //requisição à API do OpenWeatherMap para obter os dados do clima da localização especificada
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`;

    //Realiza uma requisição GET para a URL construída utilizando o Axios. Quando a resposta for recebida com sucesso, os dados da resposta são extraídos e armazenados no estado data 
    axios.get(url).then(res => {
      setData(res.data);
    })
  }, [location])

  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className='text-5xl animate-spin' />
        </div>
      </div>
    )
  }

  console.log(data)
  //set the icon according to the weather
  let icon;
  console.log(data.weather[0].main);

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy />;
      break;
    case 'Clear':
      icon = <IoMdSunny />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill />;
      break;
    case 'Snow':
      icon = <IoMdSnow />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;
  }

  //date object
  const date = new Date();

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
      {/* form */}
      <form>form</form>
      {/* card */}
      <div className='w-full max-w-[450px] min-h-[584px] bg-black/20 text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        <div>
          {/* card top */}
          <div className='flex items-center gap-x-5'>
            <div className='text-[87px]'>{icon}</div>
            <div>
              <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
              <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
            </div>
          </div>
          {/* card body */}
          <div className='my-20'>card body</div>
          {/* card bottom */}
          <div>card bottom</div>
        </div>
      </div>
    </div>
  )
};

export default App;
