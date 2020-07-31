// созд массивб поиск по массиву клик по дропдовн
//Data getData



let formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
inputDateDepart = document.querySelector('.input__date-depart'),
cipestTicket = document.getElementById('cheapest-ticket'),
otherCheapTickets=document.getElementById('other-cheap-tickets'),
cheapestTicket=document.querySelector('#cheapest-ticket'),
CheapTickets=document.getElementById('other-cheap-tickets');


// let city = ['Москва', 'Санкт-Петербург', 'Керч', 'Махачкала', 'Смоленск', 'Туркменабад', 'Чарджов', 'Мухасранск', 'Стамбул', 'Константинополь', 'Лондон'];
let city=[]


const API_KEY='fb844ccadfe1284ee8204a02b66fa38b';
const citesApi='http://api.travelpayouts.com/data/ru/cities.json';
const proxy ='https://cors-anywhere.herokuapp.com/';
const calendar='http://min-prices.aviasales.ru/calendar_preload';
const MAXCOUNT = 10;
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
            return fixItem.startsWith(input.value.toLowerCase())
          }
          //  return fixItem.includes(input.value.toLowerCase())
    
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
    city.sort(function(a, b){
        if(a.name > b.name){
            return 1;
        }
        if(a.name < b.name){
            return -1;
        }
        // if a ==b
        return 0;
    })
    console.log(city);
})


const getTime=(time)=>{
  return   new Date(time).toLocaleDateString('ru',{
      year:'numeric',
      month:'long',
      day:'numeric',
      hour:'2-digit',
      minute:'2-digit'

  })
}
const getNameCity  =(code)=>{
    const objCity=city.find(item=>item.code === code);
    return objCity.name
}

const getLinkAvia=(data)=>{
    let link='https://www.aviasales.ru/search/'
    //https://www.aviasales.ru/search/SVX2905KGD1
   
    link+=data.origin;
    const date  =new Date(data.depart_date);
   const day =date.getDate();
   link+=day<10?'0'+day:day;
   const month= date.getMonth()+1;
   link+=month<10?'0'+month:month;
   link+=data.destination;
   link+=1;
   return link;
   console.log('link', link);
}

const getChanges = (n) =>{
if(n){
return n===1?'С одной Пересаткой':'С двумя Пересатками';
}else{
    return 'Без пересадок';
}
}

const createCard = (data)=>{
const  ticket =document.createElement('article');
ticket.classList.add('ticket');
let deep=''
if(data){
    deep=`<h3 class="agent">${data.gate}</h3>
    <div class="ticket__wrapper">
        <div class="left-side">
            <a href="${getLinkAvia(data)}" target='_blank' class="button button__buy">Купить
                за ${data.value}₽</a>
        </div>
        <div class="right-side">
            <div class="block-left">
                <div class="city__from">Вылет из города
                    <span class="city__name">${getNameCity(data.origin)}</span>
                </div>
                <div class="date">${getTime(data.depart_date)}</div>
            </div>
    
            <div class="block-right">
                <div class="changes">${getChanges(data.number_of_changes)}</div>
                <div class="city__to">Город назначения:
                    <span class="city__name">${getNameCity(data.destination)}</span>
                </div>
            </div>
        </div>
    </div>`;
}else{
    deep='<h3>Infortunatly this date dont have ticket</h3>'
}
ticket.insertAdjacentHTML('afterbegin', deep)
return ticket
}
//console.log(ticket);



const renderCheapDay = (day)=>{
    const ticket = createCard(day[0]) 
  cheapestTicket.append(ticket)
   

}
const renderCheapYear = (year)=>{
    year.sort(function(a, b){
        if(a.value > b.value){
            return 1;
        }
        if(a.value < b.value){
            return -1;
        }
        // if a ==b
        return 0;
    })

    for(let i= 0; i<year.length && i<MAXCOUNT; i++){
        const ticket = createCard(year[i]);
        otherCheapTickets.append(ticket)
    }
    console.log(year);
}

// after get data call back render chep
const renderCheap=(data, date)=>{

    const cheapTiketYear =JSON.parse(data).best_prices;
    
    const cheapTicketDay = cheapTiketYear.filter((item)=>{
        return item.depart_date === date;
    })
    
    renderCheapDay(cheapTicketDay);
    renderCheapYear(cheapTiketYear);
    
    }


formSearch.addEventListener('submit', event=>{
    event.preventDefault();
    cheapestTicket.innerHTML='<h2>The cheapest ticket for the selected date</h2>';
    otherCheapTickets.innerHTML='<h2>Cheapest tickets for other dates</h2>';
    let formData={
        from:city.find((item)=> inputCitiesFrom.value ===item.name),
        to:city.find((item)=> inputCitiesTo.value ===item.name),
        when:inputDateDepart.value,
    }
if(formData.from && formData.to){
    const requestData = '?depart_date='+formData.when+'&origin='+formData.from.code+'&destination='+formData.to.code+'&one_way=true';
    getDate(proxy+calendar+requestData, (response)=>{
    renderCheap(response, formData.when);
    })
}else{
    alert('writ correct city')
}




})



//get all city from 
//  getDate(proxy + calendar+ '?depart_date=2020-05-25&origin=SVX&destination=KGD&one_way=true&token='+API_KEY, (data)=>{


//     city =JSON.parse(data).filter((item)=>{
//         return item.name;
//     })
  

//  })