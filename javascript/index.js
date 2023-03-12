const callingInput = () => {
    const inputField = document.getElementById('searchField');
    const inputValue = inputField.value;
    if (inputValue == '') {
        inputField.value = "Can't find empty value";
        document.getElementById('searchField').addEventListener('click', function () {
            inputField.value = '';
        })
    }
    else {
        const errorDiv = document.getElementById('error');

        const loader = document.getElementById('spinner');
        loader.style.display = 'block'
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputValue}`)
            .then(response => response.json())
            .then(data => {
                display(data.player);

                loader.style.display = 'none'
                inputField.value = '';
            })
            .catch(error => errorhandeling(error))
        errorDiv.innerText = '';

    }
}
function errorhandeling() {
    const loader = document.getElementById('spinner');
    // loader.style.display = 'block';
    const errorDiv = document.getElementById('error');
    // errorDiv.style.display.color = 'red'
    errorDiv.innerHTML = `<h3 class="error-h3">Result not found</h3>`;
    loader.style.display = 'none';
    const inputField = document.getElementById('searchField');
    document.getElementById('searchField').addEventListener('click', function () {
        inputField.value = '';
        // errorDiv.style.display.color = 'none'

    })
}
const display = (players) => {
    const displayDiv = document.getElementById('display-div');
    displayDiv.textContent = '';
    // console.log(players);
    players.forEach(player => {
        console.log(player.strPlayer)
        if (player.strPlayer != -1) {
            const div = document.createElement('div');
            div.classList.add('style-div')
            div.innerHTML = `
                <div class="player-div" onclick="playerInfo(${player.idPlayer})">
                    <p class="player-name">Name : ${player.strPlayer}</p>
                    <img class="player-img" width="200px" height="200px" src="${player.strThumb}">
                </div>
                `;
            displayDiv.appendChild(div);
        }
        else {
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = `
                <div class="player-error">
                    <p>Player name is not available</p>
                </div>
            `;
            displayDiv.appendChild(errorDiv);
        }
    })
}
const playerInfo = (id) => {
    // console.log(id)
    const displayDiv = document.getElementById('display-div');
    const loader = document.getElementById('spinner');
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
    // console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayDiv.textContent = '';
            loader.style.display = 'block';
            localStorage.setItem('key', JSON.stringify(data.players[0]));
            window.location.href = 'player-details.html';
        })
}
