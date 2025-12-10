document.addEventListener('DOMContentLoaded' , ()=>{
  

  const cityInput = document.getElementById('city-input');
   const whetherBtn= document.getElementById('get-whether-btn');
   const whetherInfo= document.getElementById('whether-info');
   const citynameDisplay = document.getElementById('city-name');
   const tempretureDisplay= document.getElementById('tempreture');
   const descriptionDisplay =document.getElementById('description');
   const errorMessage  =document.getElementById('error-message');

   const API_KEY = '7c502558ed6a8cee278b9c95bdc69cff' //env variable

   whetherBtn.addEventListener('click',async()=>{

      const city = cityInput.value.trim();
      if(!city) return;
      

      //  remember two things
      // 1 server may  throw an error
      // 2 server or database is always  in  another continent

      try {

         const weatherData = await fetchWeatherData(city)

         displayWeatherData(weatherData)
         
      } catch (error) {

         showEror()
         
      }

      cityInput.value = "";





   })

   async function  fetchWeatherData(city){
      // get the data

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      console.log(typeof response);
      console.log(response);

      if(!response.ok){

         throw new Error("City not found");
         
      }

      const data = await response.json();
      return data


   }

   function displayWeatherData(data){

      // display
      console.log(data);
      const {name ,main,weather} = data
      citynameDisplay.textContent = name

      // unlock the display
      whetherInfo.classList.remove('hidden');
      errorMessage.classList.add('hidden');
      tempretureDisplay.textContent =`Tempreture : ${main.temp}`;
      descriptionDisplay.textContent =`whether : ${weather[0].description}`;
      

   }

   function showEror(){

      // display error message

      whetherInfo.classList.add('hidden');
      errorMessage.classList.remove('hidden');


   }

})