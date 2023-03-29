const shipsUrl = "https://battleship-backend-gjrc.onrender.com/ships"
const playerHitsUrl = "https://battleship-backend-gjrc.onrender.com/playerHits"
const AIHitsUrl = "https://battleship-backend-gjrc.onrender.com/AIHits"
const headers = {
  "Content-Type": "application/json"
}

function addShipToAPI(id, shipData) {
  const payload = JSON.stringify({
    id,
    ...shipData
  })

  fetch(shipsUrl, {
    method: "POST",
    headers,
    body: payload
  })
  .then(response => {
    if(!response.ok) {
      console.log("Failed to add ship.")
    }
  })
  .catch(error => {
    console.log("Error: ", error)
  })
}

function getShips(callback) {

  return fetch(shipsUrl, {
    method: "GET",
    headers
  })
  .then(response => response.json())
  .then(data => {
    callback(data)
  })
  .catch(error => {
    console.log("Error: ", error)
  })
}

function deleteShip(itemID) {
  return fetch(`${shipsUrl}/${itemID}`, {
    method: "DELETE",
    headers
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  })
  .catch(error => {
    console.error("There was a problem deleting the items:", error);
  });
}

function playerPlaceHolder() {
  const payload = JSON.stringify({
    id: 1,
    placeHolder: []})

  return fetch(playerHitsUrl, {
    method: "POST",
    headers,
    body: payload
  })
  .then(response => {
    if(!response.ok) {
      console.log("Failed to put placeHolder", response)
    }
  })
  .catch(error => {
    console.log("Error: ", error)
  })
}

function AIPlaceHolder() {
  const payload = JSON.stringify({
    id: 1,
    placeHolder: []})

  return fetch(AIHitsUrl, {
    method: "POST",
    headers,
    body: payload
  })
  .then(response => {
    if(!response.ok) {
      console.log("Failed to put placeHolder", response)
    }
  })
  .catch(error => {
    console.log("Error: ", error)
  })
}

async function updatePlayerHitsAPI(id, hitsArray) {
  const payload = JSON.stringify(hitsArray)

  return fetch(`${playerHitsUrl}/${id}`, {
    method: "PUT",
    headers,
    body: payload
  })
  .then(response => {
    if(!response.ok) {
      console.log("failed to record hit", response)
    }
  })
  .catch(error => {
    console.log("Error: ", error)
  })
}

async function updateAIHitsAPI(id, hitsArray) {
  const payload = JSON.stringify(hitsArray)

  return fetch(`${AIHitsUrl}/${id}`, {
    method: "PUT",
    headers,
    body: payload
  })
  .then(response => {
    if(!response.ok) {
      console.log("failed to record hit", response)
    }
  })
  .catch(error => {
    console.log("Error: ", error)
  })
}

function getPlayerHits(callback) {

  return fetch(playerHitsUrl, {
    method: "GET",
    headers
  })
  .then(response => response.json())
  .then(data => {
    callback(data)
  })
  .catch(error => {
    console.log("Error: ", error)
  })
}

function getAIHits(callback) {

  return fetch(AIHitsUrl, {
    method: "GET",
    headers
  })
  .then(response => response.json())
  .then(data => {
    callback(data)
  })
  .catch(error => {
    console.log("Error: ", error)
  })
}

function deletePlayerHits(id) {
  return fetch(`${playerHitsUrl}/${id}`, {
    method: "DELETE",
    headers
  })
  .then(response => {
    if (!response.ok) {
      if(response.status === 404) console.log('No item to delete')
      else console.log("Network response was not ok", response)
    }
  })
  .catch(error => {
    console.error("There was a problem deleting the items:", error)
  });
}

function deleteAIHits(id) {
  return fetch(`${AIHitsUrl}/${id}`, {
    method: "DELETE",
    headers
  })
  .then(response => {
    if (!response.ok) {
      if(response.status === 404) console.log('No item to delete')
      else console.log("Network response was not ok", response)
    }
  })
  .catch(error => {
    console.error("There was a problem deleting the items:", error)
  });
}

export { addShipToAPI, getShips, deleteShip, updatePlayerHitsAPI, updateAIHitsAPI, deletePlayerHits, getPlayerHits, getAIHits, deleteAIHits, playerPlaceHolder, AIPlaceHolder }