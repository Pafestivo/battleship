const shipsUrl = "https://641ff86d82bea25f6df7b4b9.mockapi.io/ships"
const hitsUrl = "https://641ff86d82bea25f6df7b4b9.mockapi.io/recievedHits"
const headers = {
  "Content-Type": "application/json"
}

function addShipToAPI(shipData) {
  const payload = JSON.stringify(shipData)

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

  fetch(shipsUrl, {
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

// handling the hits
function AddPlaceHolder() {
  const payload = JSON.stringify([])

  return fetch(hitsUrl, {
    method: "POST",
    headers,
    body: payload
  })
  .then(response => {
    if(!response.ok) {
      console.log("failed to add placeHolder")
    }
  })
  .catch(error => {
    console.log("Error: ", error)
  })
}

async function updateHitsApi(playerHits, AIhits) {
  const payload = JSON.stringify([playerHits, AIhits])
  await deleteLocations(1)

  return fetch(hitsUrl, {
    method: "POST",
    headers,
    body: payload
  })
  .then(response => {
    if(!response.ok) {
      console.log("failed to record hit")
    }
  })
  .catch(error => {
    console.log("Error: ", error)
  })
}

function getHits(callback) {

  return fetch(hitsUrl, {
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

function deleteLocations(itemID) {
  return fetch(`${hitsUrl}/${itemID}`, {
    method: "DELETE",
    headers
  })
  .then(response => {
    if (!response.ok) {
      console.log(response)
      throw new Error("Network response was not ok");
    }
  })
  .catch(error => {
    console.error("There was a problem deleting the items:", error);
  });
}

export { addShipToAPI, getShips, deleteShip, updateHitsApi, AddPlaceHolder, deleteLocations, getHits }