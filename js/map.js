'use strict';

var random = function(min, max) {
	return (Math.random() * (max - min) + min).toFixed();
};

var title = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец",
	"Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик",
	"Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var type = ["flat", "house", "bungalo"];
var checkin = ["12:00", "13:00", "14:00"];
var checkout = ["12:00", "13:00", "14:00"];
var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

var arr = [];

for ( var i = 1; i <= 8; i++) {
	var obj = {
		"author": {
			"avatar": 'img/avatars/user0' + i + '.png'
		},

		"location":{
			"x":random(300, 900),
			"y":random(150, 500)
		},

		"offer": {
			"title":title.pop(),
			"address": function() {
				return location.x.toString()+', '+location.y.toString()
			},
			"price":random(1000, 1000000),
			"type":type[random(0,2)] ,
			"rooms":random(1, 5),
			"guests":random(1, 8),
			"checkin":checkin[random(0,2)],
			"checkout":checkout[random(0,2)],
			"features":features.filter(function(number, index){
				if (index>random(0, 5)) {
					return number;
				};
			}),
			"description":'',
			"photos":[]
		}

	};
	arr.push(obj);
}

var el = document.querySelector(".map--faded");
    el.classList.remove("map--faded");

var fragment = document.createDocumentFragment();

for (var i = 0; i < 8; i++){

	var elementButton = document.createElement("button");
		elementButton.className = "map__pin";
		elementButton.setAttribute("style", "left:" + arr[i].location.x + 'px' + "; top:" + arr[i].location.y + 'px');

	var img = document.createElement("img");
	    img.setAttribute("src", arr[i].author.avatar);
	    img.setAttribute("width", "40");
	    img.setAttribute("height", "40");
	    img.setAttribute("draggable","false");

	elementButton.appendChild(img);

	fragment.appendChild(elementButton);
}

var insertEl = document.querySelector(".map__pins");
    insertEl.appendChild(fragment);

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

for (i = 0; i < arr.length; i++) {
	var mapCard = mapCardTemplate.cloneNode(true);
		mapCard.querySelector('h3').textContent = arr[i].offer.title;
		mapCard.querySelector('small').textContent = arr[i].offer.address;
		mapCard.querySelector('.popup__price').textContent = arr[i].offer.price + '&#x20bd;/ночь';

	if (arr[i].offer.type === 'flat'){
		mapCard.querySelector('h4').textContent = 'Квартира';
	}else if (arr[i].offer.type === 'bungalo'){
		mapCard.querySelector('h4').textContent = 'Бунгало';
	}else {
		mapCard.querySelector('h4').textContent = 'Дом';
	}

	var feature = mapCard.querySelector('.popup__features');
	for(var j = 0; j < arr[0].offer.features.length; j++) {
		var newLi = document.createElement('li');
		newLi.className = 'feature feature--' + arr[0].offer.features[j];
		feature.appendChild(newLi);

	}
	var pTag = mapCard .querySelectorAll('p');

	pTag[1].textContent = arr[i].offer.rooms + 'для' + arr[i].offer.guests + 'гостей';
	pTag[2].textContent = 'Заезд после ' + arr[i].offer.checkin + ', выезд до' +
                             arr[i].offer.checkout;
	mapCard.querySelector('.popup__avatar').src = arr[i].author.avatar;
}

mapCardTemplate.insertAdjacentHTML('beforeend', '.map__filters-container');
