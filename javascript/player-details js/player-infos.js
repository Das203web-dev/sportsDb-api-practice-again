const loader = document.getElementById('spinner');
loader.style.display = 'block'
const gettingItem = JSON.parse(localStorage.getItem('key'));
console.log(gettingItem.strFacebook);
const detailsDiv = document.getElementById('playerDetail-div');
const playerDisplayDiv = document.createElement('div');
playerDisplayDiv.innerHTML = `
    <div class="card mx-auto p-2" style="width: 18rem;" >
        <img src="${gettingItem.strThumb}" class="card-img-top">
        <div class="card-body">
            <h3 class="card-title">Name : ${gettingItem.strPlayer}</h3>
            <p class="card-text">Description : ${gettingItem.strDescriptionEN.slice(0, 100)}</p>
            <p>Gender : ${gettingItem.strGender}</p>
            <p>Profession : ${gettingItem.strSport}</p>
            ${gettingItem.strFacebook && !gettingItem.strFacebook.startsWith('http')
        ? `<a href="http://${gettingItem.strFacebook}" target="_blank" class="btn btn-primary">Facebook</a>` : ''
    }
        </div >
    </div >
    `;
detailsDiv.appendChild(playerDisplayDiv);
