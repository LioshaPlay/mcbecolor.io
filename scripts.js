const container = document.getElementById('container');

async function getBrewery() {
  const breweryResponse = await fetch(`https://api.openbrewerydb.org/breweries/${getRandomNumber(1,8000)}`);
  const breweryData = await breweryResponse.json();
  
  renderDataToDOM(breweryData);
}

function getRandomNumber(min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function renderDataToDOM(data) {
  const postElement = document.createElement('div');
  postElement.classList.add('brewery-item');
  postElement.innerHTML = `
    <h2 class="brewery"><span>${data.name}</span></h2>
    <p class="type"><strong>type:</strong> ${data.brewery_type} | <span class="location"><strong>location:</strong> ${data.city}, ${data.state}</p>
  `;
  container.appendChild(postElement);
};

//fetch more brewery data
getBrewery()
  .then(data => console.log(data))
  .catch(error => console.log(error.message));
getBrewery();
getBrewery();

//add inifinite scrolling
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  console.log({scrollTop, scrollHeight, clientHeight});
  
  if(clientHeight + scrollTop >= scrollHeight - 10) {
    setTimeout(getBrewery, 700);
  }
})
