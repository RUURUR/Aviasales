let formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
inputDateDepart = document.querySelector('.input__date-depart'),
cipestTicket = document.getElementById('cheapest-ticket'),
otherCheapTickets=document.getElementById('other-cheap-tickets');


let city=[];


let citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json';
//console.log(citiesApi);
let proxy = 'https://cors-anywhere.herokuapp.com/';
let myApikey ='d97aaac7efd1569f741c8b456dba9360';
let calendar = 'http://min-prices.aviasales.ru/calendar_preload';
let getData = (url, callback)=>{
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('readystatechange', ()=>{
        if(request.readyState !== 4) return;
       // console.log(request.readyState);
        if(request.status ===200){
           callback(request.response)
        }
        else{
            console.error(request.status);
        }
    });
    request.send();
}


let showCity =  function(input, list){
    list.textContent='';
if(input.value === '') return;
    let filterCity =  city.filter(function(item){
        if(item.name){
            let fixItem= item.name.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
        }
  
 });
    filterCity.forEach((item)=>{
        let li  = document.createElement('li');
        li.classList.add('dropdown__city');
        li.textContent = item.name;
        dropdownCitiesFrom.append(li);
    })
};


let renderCheapDay=(cheapTicket)=>{
    console.log(cheapTicket);
    let ticket=creatCart(cheapTicket[0]);
}
let renderCheapYear=(cheapTickets)=>{
    cheapTickets.sort((a, b)=>{
        if(a.value > b.value){
            return 1;
        }
       if(a.value < b.value){
             return -1;
        }
        return 0;
    })
    console.log(cheapTickets);
}

let renderChep= (data, date)=>{
    let cheapTicket = JSON.parse(data).best_prices;
    console.log('CheepTicketYear', cheapTicket);
    let cheapTicketDay  = cheapTicket.filter((item)=>{
           return item.depart_date ===date;
    })
    renderCheapDay(cheapTicket);
    renderCheapYear(cheapTicketDay);

}
//creat cart
let creatCart = (data)=>{
    let ticket = document.createElement('article');
    ticket.classList.add('ticket');
    let  deep = '';
    ticket.insertAdjacentHTML('afterbegin', deep);
    if(data){
        deep = `
        <h3 class="agent">Aviakassa</h3>
<div class="ticket__wrapper">
	<div class="left-side">
		<a href="https://www.aviasales.ru/search/SVX2905KGD1" class="button button__buy">Купить
			за 19700₽</a>
	</div>
	<div class="right-side">
		<div class="block-left">
			<div class="city__from">Вылет из города
				<span class="city__name">Екатеринбург</span>
			</div>
			<div class="date">29 мая 2020 г.</div>
		</div>

		<div class="block-right">
			<div class="changes">Без пересадок</div>
			<div class="city__to">Город назначения:
				<span class="city__name">Калининград</span>
			</div>
		</div>
	</div>
</div>
        `;
    }
    else{
        deep = '<h3>Infortunatly wy didnt have ticket</h3>'
    }

}
///select
//second input
let selectCity =(event, input, list)=>{
    let target = event.target;
    if(target.tagName.toLowerCase() ==='li'){
        input.value=target.textContent;
        list.textContent = '';
    }
  };


 //first 
 inputCitiesFrom.addEventListener('input', ()=>{
    showCity(inputCitiesFrom, dropdownCitiesFrom)
});

inputCitiesTo.addEventListener('input', ()=>{
    showCity(inputCitiesTo, dropdownCitiesTo);
})

dropdownCitiesFrom.addEventListener('click', (event)=>{
selectCity(event, inputCitiesFrom, dropdownCitiesFrom)

});

dropdownCitiesTo.addEventListener('click', (event)=>{
    selectCity(event, inputCitiesTo, dropdownCitiesTo);
});
formSearch.addEventListener('submit', (event)=>{
event.preventDefault();
//console.log(event);
let cityFrom = city.find((item)=>{
    return inputCitiesFrom.value === item.name;
})
let cityTo = city.find((item)=>{
    return inputCitiesTo.value === item.name;
})


let formData = {
    from: cityFrom.code,
    to:cityTo.code,
    when:inputDateDepart.value
}
 let requestData = '?depart_date='+formData.when+
 '&origin='+formData.from+
 '&destination='+formData.to+
 '&one_way=true&token='+myApikey;
 console.log(requestData);
 getData(calendar+requestData, (data)=>{
   renderChep(data, formData.when);
})
})



//вызовы функции


getData(proxy+citiesApi, (data)=>{
    city = JSON.parse(data).filter(item =>item.name);
    city.sort((a, b)=>{
        if(a.value > b.value){
            return 1;
        }
       if(a.value < b.value){
             return -1;
        }
        return 0;
    })
    console.log(city);

});