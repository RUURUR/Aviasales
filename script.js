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

const city = ['Москва', 'Санкт-Петербург', 'Керч', 'Махачкала', 'Смоленск', 'Туркменабад', 'Чарджов', 'Мухасранск', 'Стамбул', 'Константинополь', 'Лондон'];



const citesApi='http://api.travelpayouts.com/data/ru/cities.json';
const proxy ='https://cors-anywhere.herokuapp.com/';
// get data 
//firlter
let citi=[];

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
       const fixItem = item.toLowerCase();
     return fixItem.includes(input.value.toLowerCase())
    })
    //create li elemend and show 
 filterCity.forEach(item=>{
    const li = document.createElement('li');
    li.classList.add('dropdown__city');
    li.textContent=item
   list.append(li)
    console.log(li);
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


 getDate(proxy + citesApi, (data)=>{


    const dataCiies =JSON.parse(data);
    citi =dataCiies.filter(item=>{
        return true;
    })
     console.log(citi);
 })