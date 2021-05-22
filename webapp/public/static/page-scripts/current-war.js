// call local json data
function callData() {
    const request = new XMLHttpRequest();
    request.open("GET", "/war/api/current");
    request.onload = () => {
        try {
            const json = JSON.parse(request.responseText);
            updateData(json);
        } catch (e) {
            console.log(e, "we have an error");
        }
    };
    request.send();
}

// const for table data of home team
const homeClan = document.getElementById("home-clan");
const homeSize = document.getElementById("home-size");
const homeAttacks = document.getElementById("home-attacks");
const homeStars = document.getElementById("home-stars");
const homeDestruction = document.getElementById("home-destruction");
// const for table data of opponent team
const opponentClan = document.getElementById("opponent-clan");
const opponentSize = document.getElementById("opponent-size");
const opponentAttacks = document.getElementById("opponent-attacks");
const opponentStars = document.getElementById("opponent-stars");
const opponentDestruction = document.getElementById("opponent-destruction");
// sort members tags names and positions to place on tables
let clanMembersIndex = [];
let opponentMembersIndex = [];
// getting base table elements
const attacksTableBody = document.getElementById("attacks-tbody");
const opponentAttacksTableBody = document.getElementById(
    "attacks-tbody-opponent"
);
const nonAttackTableBody = document.getElementById("non-attackers-clan");
const opponentNonAttackTableBody = document.getElementById(
    "non-attackers-opponent"
);

//function to update overview of war status then call other function to display current attacks
function updateData(json) {
    if (json.state === "notInWar") {
        document.getElementById("h-attacks").textContent = "Currently not in war";
        return;
    } else {
        //home team
        homeClan.innerText = json.clan.name;
        homeSize.innerText = json.teamSize;
        homeAttacks.innerText = json.clan.attacks;
        homeStars.innerText = json.clan.stars;

        homeDestruction.innerText = json.clan.destructionPercentage + "%";
        // opponent team
        opponentClan.innerText = json.opponent.name;
        opponentSize.innerText = json.teamSize;
        opponentAttacks.innerText = json.opponent.attacks;
        opponentStars.innerText = json.opponent.stars;
        opponentDestruction.innerText = json.opponent.destructionPercentage + "%";

        createIndex(json);
        updateAttacks(json);
        pendingAttack(json);
    }
}

function createIndex(json) {
    json.clan.members.map((item) => {
        clanMembersIndex.push([item.name, item.tag, item.mapPosition]);
    });

    json.opponent.members.map((item) => {
        opponentMembersIndex.push([item.name, item.tag, item.mapPosition]);
    });
}

function updateAttacks(json) {
    for (let i = 0; i < json.clan.members.length; i++) {
        if (json.clan.members[i].hasOwnProperty("attacks")) {
            for (let c = 0; c < json.clan.members[i].attacks.length; c++) {
                let index = json.clan.members[i].attacks[c].defenderTag;
                let tr = document.createElement("tr");
                let tdNum = document.createElement("td");
                let tdAttacker = document.createElement("td");
                let tdDestruction = document.createElement("td");
                let tdStars = document.createElement("td");
                let tdDefender = document.createElement("td");
                let tdDefenderNum = document.createElement("td");
                for (let k = 0; k < opponentMembersIndex.length; k++) {
                    if (opponentMembersIndex[k][1] === index) {
                        tdDefender.innerText = opponentMembersIndex[k][0];
                        tdDefenderNum.innerText = opponentMembersIndex[k][2];
                    }
                }
                tdNum.innerText = json.clan.members[i].mapPosition;
                tdAttacker.innerText = json.clan.members[i].name;
                tdDestruction.innerText =
                    json.clan.members[i].attacks[c].destructionPercentage + "%";
                // star images
                const zeroStar = document.createElement("img");
                zeroStar.src = "static/images/zero-star-battle.png";
                const oneStar = document.createElement("img");
                oneStar.src = "static/images/one-star-battle.png";
                const twoStar = document.createElement("img");
                twoStar.src = "static/images/two-star-battle.png";
                const threeStar = document.createElement("img");
                threeStar.src = "static/images/three-star-battle.png";
                let starsEarned = json.clan.members[i].attacks[c].stars;
                if (starsEarned === 0) {
                    tdStars.appendChild(zeroStar);
                } else if (starsEarned === 1) {
                    tdStars.appendChild(oneStar);
                } else if (starsEarned === 2) {
                    tdStars.appendChild(twoStar);
                } else if (starsEarned === 3) {
                    tdStars.appendChild(threeStar);
                }
                tr.appendChild(tdNum);
                tr.appendChild(tdAttacker);
                tr.appendChild(tdDestruction);
                tr.appendChild(tdStars);
                tr.appendChild(tdDefender);
                tr.appendChild(tdDefenderNum);
                attacksTableBody.appendChild(tr);
            }
        }
    }
    // opponents section to update table
    for (let i = 0; i < json.opponent.members.length; i++) {
        if (json.opponent.members[i].hasOwnProperty("attacks")) {
            for (let c = 0; c < json.opponent.members[i].attacks.length; c++) {
                let index = json.opponent.members[i].attacks[c].defenderTag;
                let tr = document.createElement("tr");
                let tdNum = document.createElement("td");
                let tdAttacker = document.createElement("td");
                let tdDestruction = document.createElement("td");
                let tdStars = document.createElement("td");
                let tdDefender = document.createElement("td");
                let tdDefenderNum = document.createElement("td");
                for (let k = 0; k < clanMembersIndex.length; k++) {
                    if (clanMembersIndex[k][1] === index) {
                        tdDefender.innerText = clanMembersIndex[k][0];
                        tdDefenderNum.innerText = clanMembersIndex[k][2];
                    }
                }
                tdNum.innerText = json.opponent.members[i].mapPosition;
                tdAttacker.innerText = json.opponent.members[i].name;
                tdDestruction.innerText =
                    json.opponent.members[i].attacks[c].destructionPercentage + "%";
                // star images
                const zeroStar = document.createElement("img");
                zeroStar.src = "static/images/zero-star-battle.png";
                const oneStar = document.createElement("img");
                oneStar.src = "static/images/one-star-battle.png";
                const twoStar = document.createElement("img");
                twoStar.src = "static/images/two-star-battle.png";
                const threeStar = document.createElement("img");
                threeStar.src = "static/images/three-star-battle.png";
                let starsEarned = json.opponent.members[i].attacks[c].stars;
                if (starsEarned === 0) {
                    tdStars.appendChild(zeroStar);
                } else if (starsEarned === 1) {
                    tdStars.appendChild(oneStar);
                } else if (starsEarned === 2) {
                    tdStars.appendChild(twoStar);
                } else if (starsEarned === 3) {
                    tdStars.appendChild(threeStar);
                }
                tr.appendChild(tdNum);
                tr.appendChild(tdAttacker);
                tr.appendChild(tdDestruction);
                tr.appendChild(tdStars);
                tr.appendChild(tdDefender);
                tr.appendChild(tdDefenderNum);
                opponentAttacksTableBody.appendChild(tr);
            }
        }
    }
}

function pendingAttack(json) {
    let nonAttack = [
        [],
        []
    ];
    let opponentNonAttack = [
        [],
        []
    ];

    for (let i = 0; i < json.clan.members.length; i++) {
        if (!json.clan.members[i].hasOwnProperty("attacks")) {
            nonAttack[0].push(json.clan.members[i]);
        } else if (json.clan.members[i].attacks.length === 2) {
            nonAttack[1].push(json.clan.members[i]);
        }
    }
    for (let z = 0; z < json.opponent.members.length; z++) {
        if (!json.opponent.members[z].hasOwnProperty("attacks")) {
            opponentNonAttack[0].push(json.opponent.members[z]);
        } else if (json.opponent.members[z].attacks.length === 2) {
            opponentNonAttack[1].push(json.opponent.members[z]);
        }
    }
    for (let a = 0; a < nonAttack.length; a++) {
        for (let b = 0; b < nonAttack[a].length; b++) {
            const tr = document.createElement("tr");
            const tdName = document.createElement("td");
            const tdTag = document.createElement("td");
            const tdAttacksLeft = document.createElement("td");

            tdName.innerText = nonAttack[a][b].name;
            tdTag.innerText = nonAttack[a][b].tag;
            if (a == 1) {
                tdAttacksLeft.innerText = 2;
            } else {
                tdAttacksLeft.innerText = 1;
            }

            tr.appendChild(tdName);
            tr.appendChild(tdTag);
            tr.appendChild(tdAttacksLeft);
            nonAttackTableBody.appendChild(tr);
        }
    }
    for (let a = 0; a < nonAttack.length; a++) {
        for (let b = 0; b < nonAttack[a].length; b++) {
            const tr = document.createElement("tr");
            const tdName = document.createElement("td");
            const tdTag = document.createElement("td");
            const tdAttacksLeft = document.createElement("td");

            tdName.innerText = opponentNonAttack[a][b].name;
            tdTag.innerText = opponentNonAttack[a][b].tag;
            if (a == 1) {
                tdAttacksLeft.innerText = 2;
            } else {
                tdAttacksLeft.innerText = 1;
            }

            tr.appendChild(tdName);
            tr.appendChild(tdTag);
            tr.appendChild(tdAttacksLeft);
            opponentNonAttackTableBody.appendChild(tr);
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    callData();
});