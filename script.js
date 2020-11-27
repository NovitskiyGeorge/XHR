document.querySelector('.btn-add').addEventListener('click', _add);
let itemList = [];

const LOADING_CLASS = 'items-wrapper--loading';
const WRAPPER_ITEMS_CLASS = 'items-wrapper';

function add(toAdd, callBack) {
  let xhr = new XMLHttpRequest(); // new HttpRequest instance 
  xhr.open("PUT", 'http://localhost:3000/item');
  xhr.setRequestHeader("Content-Type", "application/json");
  document.querySelector('.' + WRAPPER_ITEMS_CLASS).classList.add(LOADING_CLASS);
  xhr.send(JSON.stringify({
    title: toAdd
  }))
  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
      let response = JSON.parse(xhr.response);
      callBack(response)
      itemList = [];
      itemList.push(response);
      addItemsFromServer(itemList);
    }
  };
}

function remove(toRemove, callBack) {

  let xhr = new XMLHttpRequest(); // new HttpRequest instance 
  xhr.open("DELETE", 'http://localhost:3000/item');
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({
    id: toRemove
  }))
  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
      let response = JSON.parse(xhr.response);
      callBack(response)
    }
  };
}

function get(callBack) {
  // debugger
  let xhr = new XMLHttpRequest(); // new HttpRequest instance 
  xhr.open("GET", 'http://localhost:3000/item');
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send()
  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
      let response = JSON.parse(xhr.response);
      callBack(response)
    }
  };
}

function onSuccessAdd(items) {
  
  document.querySelector('.' + WRAPPER_ITEMS_CLASS).classList.remove(LOADING_CLASS);

}

function _add() {
  // debugger
  let title = document.querySelector('#input-title').value;
  add(title, onSuccessAdd);
}

function addItemsFromServer(itemList) { /// itemList = ['esdfdeswf', 'wefewfewf']
  itemList.forEach(function(element){    
    addNewElementToWrapper(element.title, element.id);
  });
}

function main() {
  subscribeOnRemoveButtons();
  get(addItemsFromServer);
}


function subscribeOnRemoveButtons() {
  document.querySelector('.items-wrapper').addEventListener('click', function(event) {
  

    if (event.target.classList.contains('item__remove')) {
      const itemElement = event.target.parentNode;
      const text = itemElement.querySelector('.item__title').innerText;
      const id = itemElement.id;
      console.log(id);
      remove(+id, onSuccessAdd);
      itemElement.remove();
    }
  })
}

function getItemByText(text) {
  const itemElement = document.createElement('div');
  itemElement.classList.add('item');

  const htmlString = `<div class="item__title">
                          ${text}
                        </div>
                        <div class="item__remove">
                          x
                        </div>
                      `;
  itemElement.innerHTML = htmlString;
  return itemElement;
}

function addNewElementToWrapper(text, id) {
  let newItem = getItemByText(text);
  newItem.id = id;
  document.querySelector('.items-wrapper').appendChild(newItem);
}

main();