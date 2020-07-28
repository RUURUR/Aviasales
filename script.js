// созд массивб поиск по массиву клик по дропдовн
//Data getData



let formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
inputDateDepart = document.querySelector('.input__date-depart'),
cipestTicket = document.getElementById('cheapest-ticket'),
otherCheapTickets=document.getElementById('other-cheap-tickets');

// let city = ['Москва', 'Санкт-Петербург', 'Керч', 'Махачкала', 'Смоленск', 'Туркменабад', 'Чарджов', 'Мухасранск', 'Стамбул', 'Константинополь', 'Лондон'];
let city=[]


const API_KEY='fb844ccadfe1284ee8204a02b66fa38b';
const citesApi='http://api.travelpayouts.com/data/ru/cities.json';
const proxy ='https://cors-anywhere.herokuapp.com/';
const calendar='http://min-prices.aviasales.ru/calendar_preload';
// get data 
//firlter


const getDate = (url, callBack)=>{
    const request  = new XMLHttpRequest();
    request.open('GET', url);


    request.addEventListener('readystatechange', ()=>{
        if(request.readyState !== 4)return
        if(request.status ===200){
            callBack(request.response);
        }else{
            console.log('Error'+request.status);
        }
        
    })
    request.send();
}



//searth from arr 
const showCity= (input, list)=>{
   list.textContent = '';
    if(input.value){
        const filterCity = city.filter((item)=>{
          if(item.name){
            const fixItem = item.name.toLowerCase();
            return fixItem.includes(input.value.toLowerCase())
          }
    
    })
    //create li elemend and show 
 filterCity.forEach(item=>{
    const li = document.createElement('li');
    li.classList.add('dropdown__city');
    li.textContent=item.name
   list.append(li)
   
})
}
}
inputCitiesFrom.addEventListener('input', ()=>{
    showCity(inputCitiesFrom, dropdownCitiesFrom);
})
  
inputCitiesTo.addEventListener('input', ()=>{
    showCity(inputCitiesTo, dropdownCitiesTo);
})    



const selectCity = (event, input, list)=>{
    const target= event.target;
    if(target.tagName =='LI'){
        input.value=target.textContent;
       list.textContent='';
}}


dropdownCitiesFrom.addEventListener('click', event =>{
    selectCity(event, inputCitiesFrom, dropdownCitiesFrom)
})
dropdownCitiesTo.addEventListener('click', event =>{
    selectCity(event, inputCitiesTo, dropdownCitiesTo)
 } )

getDate(proxy+citesApi, (data)=>{
    city = JSON.parse(data).filter(item=> item.name)
    console.log(city);
})




formSearch.addEventListener('submit', event=>{
    event.preventDefault();
    const formData={
        form:city.find((item)=> inputCitiesFrom.value ===item.name).code,
        to:city.find((item)=> inputCitiesTo.value ===item.name).code,
        when:inputDateDepart.value
    }
    console.log(formData);
})



//get all city from 
//  getDate(proxy + calendar+ '?depart_date=2020-05-25&origin=SVX&destination=KGD&one_way=true&token='+API_KEY, (data)=>{


//     city =JSON.parse(data).filter((item)=>{
//         return item.name;
//     })
  

//  })