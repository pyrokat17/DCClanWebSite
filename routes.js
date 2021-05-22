// express -- routes
const express = require("express");
const router = express.Router();
// XHR requests
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// enviroment varibles
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI, {
  useUnifiedTopology: true,
});
// pug
const pug = require("pug");
//update each members data
async function updateAllMemberData(tag, data) {
  try {
    await client.connect();
    const database = client.db("membersDB");
    const collection = database.collection("members");
    const filter = { _id: tag };
    const update = { $set: { data, lastupdated: new Date() } };
    const options = { upsert: true };
    const read = await collection.updateOne(filter, update, options);
    // 15:12:54
  } finally {
    await client.close();
  }
}
// update mongoDB with current members data
async function updateMembersData(data) {
  try {
    await client.connect();
    const database = client.db("clanMembers");
    const collection = database.collection("members");
    const filter = { _id: "clanmembers" };
    const update = { $set: { items: data.items, lastupdated: new Date() } };
    const options = { upsert: true };
    const read = await collection.updateOne(filter, update, options);
    // 15:12:54
  } finally {
    await client.close();
  }
}
// update mongoDB with current war data
async function updateCurrentWarData(data) {
  try {
    await client.connect();
    const database = client.db("war");
    const collection = database.collection("currentwar");
    const filter = { _id: "currentwar" };
    const update = {
      $set: {
        state: data.state,
        teamSize: data.teamSize,
        preparationStartTime: data.preparationStartTime,
        startTime: data.startTime,
        endTime: data.endTime,
        clan: data.clan,
        opponent: data.opponent,
        lastupdated: new Date(),
      },
    };
    const options = { upsert: true };
    const read = await collection.updateOne(filter, update, options);
  } finally {
    await client.close();
  }
}
// load webpages
router.get("/home", (req, res) => {
  res.render("home", { title: "Home" });
});
router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});
router.get("/clan", (req, res) => {
  res.render("members", { title: "Members" });
});
router.get("/rules", (req, res) => {
  res.render("rules", { title: "Rules" });
});
router.get("/war", (req, res) => {
  res.render("current-war", { title: "Current war" });
});
router.get("/join", (req, res) => {
  res.render("join", { title: "Join Today" });
});
router.get("/guides", (req, res) => {
  res.render("guides", { title: "Guides" });
});
router.get("/dragons-guide", (req, res) => {
  res.render("dragons-guide", { title: "Dragons Guide" });
});
router.get("/queen-walk-guide", (req, res) => {
  res.render("queen-walk-guide", { title: "Queen walk Guide" });
});
// access the members data
router.get("/members/api", (req, res) => {
  let compareDate = new Date();
  compareDate.setHours(compareDate.getHours() - 12);
  MongoClient.connect(
    process.env.MONGO_URI,
    { useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      const membersQuery = db
        .db("clanMembers")
        .collection("members")
        .findOne({ _id: "clanmembers" }, function (err, result) {
          if (err) throw err;
          let dbDate = new Date(Date.parse(result.lastupdated));
          if (dbDate < compareDate) {
            console.log("entered coc api call");

            let request = new XMLHttpRequest();
            request.open(
              "GET",
              "https://api.clashofclans.com/v1/clans/%2329L8YUUQ9/members"
            );
            request.setRequestHeader(
              "Authorization",
              "Bearer " + process.env.CLASH_API_TOKEN
            );
            request.onload = () => {
              try {
                console.log("http req");
                let data = JSON.parse(request.responseText);
                updateMembersData(data);
                res.send(JSON.stringify(data));
              } catch (e) {
                console.log(e, "could not load! :(");
              }
            };
            request.send();
          } else {
            res.send(JSON.stringify(result));
          }
        });
    }
  );
});
// access Current war data
router.get("/war/api/current", (req, res) => {
  let compareDate = new Date();
  compareDate.setMinutes(compareDate.getMinutes() - 15);
  MongoClient.connect(
    process.env.MONGO_URI,
    { useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      const membersQuery = db
        .db("war")
        .collection("currentwar")
        .findOne({ _id: "currentwar" }, function (err, result) {
          if (err) throw err;
          let dbDate = new Date(Date.parse(result.lastupdated));
          if (dbDate < compareDate) {
            console.log("enters xml");
            let request = new XMLHttpRequest();
            request.open(
              "GET",
              "https://api.clashofclans.com/v1/clans/%2329L8YUUQ9/currentwar"
            );
            request.setRequestHeader(
              "Authorization",
              "Bearer " + process.env.CLASH_WAR_TOKEN
            );
            request.onload = () => {
              try {
                console.log("http req");
                let data = JSON.parse(request.responseText);
                updateCurrentWarData(data);
                res.send(JSON.stringify(data));
              } catch (e) {
                console.log(e, "could not load! :(");
              }
            };
            request.send();
          } else {
            res.send(JSON.stringify(result));
          }
        });
    }
  );
});
/*
router.post('/members/api/full', (req, res) => {

    const memberTag = JSON.parse(req.body)
    //  const readData = JSON.parse(memberTag)
    console.log(memberTag)
    // res.send(JSON.stringify({ status: 'sent', items: memberTag }))
    
     let compareDate = new Date()
     compareDate.setHours(compareDate.getHours() - 20)
     MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, function (err, db) {
         if (err) throw err
         const membersQuery = db.db('memberDB').collection('members').findOne({ _id: memberTag }, function (err, result) {
             if (err) throw err
             let dbDate = new Date(Date.parse(result.lastupdated))
             if (dbDate < compareDate) {
                 console.log('enters xml')
                 let request = new XMLHttpRequest()
                 request.open('GET', 'https://api.clashofclans.com/v1/players/%23' + memberTag)
                 request.setRequestHeader('Authorization', 'Bearer ' + process.env.CLASH_WAR_TOKEN);
                 request.onload = () => {
                     try {
                         let data = JSON.parse(request.responseText)
                         updateAllMemberData(memberTag, data)
                         console.log(memberTag)
                         res.send(JSON.stringify(data))
 
                     } catch (e) {
                         console.log(e, "could not load! :(")
                     }
                 }
                 request.send()
             } else { res.send(JSON.stringify(result)) }
         })
     })
     
})
*/

module.exports = router;
