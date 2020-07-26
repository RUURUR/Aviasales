let formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
inputDateDepart = document.querySelector('.input__date-depart'),
cipestTicket = document.getElementById('cheapest-ticket'),
otherCheapTickets=document.getElementById('other-cheap-tickets');

const city = ['Москва', 'Санкт-Петербург', 'Керч', 'Махачкала', 'Смоленск', 'Туркменабад', 'Чарджов', 'Мухасранск', 'Стамбул', 'Константинополь', 'Лондон'];


inputCitiesFrom.addEventListener('input', ()=>{
    dropdownCitiesFrom.textContent = '';
  const filterCity = city.filter((item)=>{
   const fixItem = item.toLowerCase();
   return fixItem.includes(inputCitiesFrom.value.toLowerCase())
    
  })
 filterCity.forEach(item=>{
     const li = document.createElement('li');
     li.classList.add('dropdown__city');
     li.textContent=item
     dropdownCitiesFrom.append(li)
     console.log(li);
 })



})


const get = (name)=>{
console.log('Get-get :'+name);
}