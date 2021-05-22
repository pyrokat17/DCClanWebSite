// var for table
const tableBody = document.querySelector("#table-whole > tbody");
const thPlayer = document.getElementById("th-player");
const thRole = document.getElementById("th-role");
const thTag = document.getElementById("th-tag");
const thExpLevel = document.getElementById("th-exp-level");
const thLeague = document.getElementById("th-league");
// var for appending more data to each members row
const memberRow = document.querySelectorAll("tr");
// XML HTTP Request to Json data
async function xmlCall() {
  const request = new XMLHttpRequest();
  request.open("GET", "/members/api");
  request.onload = () => {
    try {
      const json = JSON.parse(request.responseText);
      populateTable(json);
    } catch (e) {
      console.warn(e, "could not load! :(");
    }
  };
  request.send();
}

// function to upload all clan member infomation
function populateTable(json) {
  // clears existing table data
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
  const newData = json;
  const newArray = [];
  const giveMeData = newData.items.map((data) => {
    newArray.push(data);
  });
  for (let i = 0; i < newArray.length; i++) {
    let playerName = newArray[i].name;
    let clanTag = newArray[i].tag;
    let clanExpLevel = newArray[i].expLevel;

    const tr = document.createElement("tr");
    const tdClanName = document.createElement("td");
    const tdButtonName = document.createElement("button");
    const tdClanTag = document.createElement("td");
    const tdClanExpLevel = document.createElement("td");
    const tdClanTrophies = document.createElement("td");
    const tdClanVersusTrophies = document.createElement("td");
    const tdClanDonations = document.createElement("td");
    const tdClanDonationsReceived = document.createElement("td");

    tdButtonName.textContent = playerName;
    tdButtonName.setAttribute("id", clanTag);
    // tdButtonName.setAttribute("onclick", "handleMoreData(this.id)");
    tdClanTag.textContent = clanTag;
    tdClanExpLevel.textContent = clanExpLevel;
    tdClanTrophies.textContent = newArray[i].trophies;
    tdClanVersusTrophies.textContent = newArray[i].versusTrophies;
    tdClanDonations.textContent = newArray[i].donations;
    tdClanDonationsReceived.textContent = newArray[i].donationsReceived;

    tr.appendChild(tdClanName);
    tdClanName.appendChild(tdButtonName);
    tr.appendChild(tdClanTag);
    tr.appendChild(tdClanExpLevel);
    tr.appendChild(tdClanTrophies);
    tr.appendChild(tdClanVersusTrophies);
    tr.appendChild(tdClanDonations);
    tr.appendChild(tdClanDonationsReceived);
    tableBody.appendChild(tr);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  xmlCall();
});
/*
async function handleMoreData(domID) {
  // get row that was clicked
  let playersRow = document.getElementById(domID).parentElement.parentElement;
  console.log(playersRow, domID);

  const memberData = await moreMembersData(domID).then((result) => {
    let dataFile = result;
    console.log(dataFile);
    // create rows
    const rowHead = document.createElement("tr");
    const rowData = document.createElement("tr");
    //  create header for cells
    const thTHL = document.createElement("td");
    const thWS = document.createElement("td");
    const thAW = document.createElement("td");
    const thDW = document.createElement("td");
    const thL = document.createElement("td");
    const thGold = document.createElement("td");
    const thElixir = document.createElement("td");
    // create data for cells
    const tdTHL = document.createElement("td");
    const tdWS = document.createElement("td");
    const tdAW = document.createElement("td");
    const tdDW = document.createElement("td");
    const tdL = document.createElement("td");
    // img element for League cells
    const leagueImg = document.createElement("img");
    // --
    const tdGold = document.createElement("td");
    const tdElixir = document.createElement("td");
    // place text into cells
    thTHL.textContent = "TownHall Level";
    thWS.textContent = "War Stars";
    thAW.textContent = "Attack Wins";
    thDW.textContent = "Defence Wins";
    thL.textContent = "League";
    thGold.textContent = "Gold Collected";
    thElixir.textContent = "Elixir Collected";
    // place member data into cells
    tdTHL.textContent = dataFile.townHallLevel;
    tdWS.textContent = dataFile.warStars;
    tdAW.textContent = dataFile.attackWins;
    tdDW.textContent = dataFile.defenceWins;
    leagueImg.src = dataFile.clan.badgeUrls.small;
    tdL.appendChild(leagueImg);
    tdGold.textContent = dataFile.achievements[5].value;
    tdElixir.textContent = dataFile.achievements[6].value;

    //append head cells into the rows
    rowHead.appendChild(thTHL);
    rowHead.appendChild(thWS);
    rowHead.appendChild(thAW);
    rowHead.appendChild(thDW);
    rowHead.appendChild(thL);
    rowHead.appendChild(thGold);
    rowHead.appendChild(thElixir);
    // append member data cells into rows
    rowData.appendChild(tdTHL);
    rowData.appendChild(tdWS);
    rowData.appendChild(tdAW);
    rowData.appendChild(tdDW);
    rowData.appendChild(tdL);
    rowData.appendChild(tdGold);
    rowData.appendChild(tdElixir);
    //
    item.insertAdjacentElement("afterend", rowHead);
    rowHead.insertAdjacentElement("afterend", rowData);
  });
}

async function moreMembersData(tag) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application / json",
      "Content-Type": "application/json",
    },
    body: { member: tag },
  };
  const response = await fetch("/members/api/full", options);
  const json = await response.json();
  return json;
}
*/
