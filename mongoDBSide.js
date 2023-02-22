const { MongoClient } = require('mongodb');
const uri = "mongodb://127.0.0.1/ethomas";
const mangoClient = new MongoClient(uri, { useUnifiedTopology: true });


const express = require('express');
const path = require('path');
const app = express();
const port = 44266;
app.use("/", express.static(path.join(__dirname)));


app.listen(port, function(error){
    if(error) throw error
    console.log(`Server created Successfully on port ${port}`);
})



async function compRequest(client, req, res) {
    let postt = req.body;
    let searchTerms = {compName:postt['compName']}
    let results = await mangoClient.db().collection('competitions').find(searchTerms).toArray();
    res.json(results);
};

async function compDDRequest(client, req, res) {
    let postt = req.body;
    let searchTerms = {compID: parseInt(postt['compID'])}

    let results = await mangoClient.db().collection('competitions').find(searchTerms).toArray();
    console.log(JSON.stringify(results));
    res.json(results);
};

async function climberRequest(client, req, res) {
    let countryDict = {"Argentina": "ARG","Austraila": "AUS","Austria": "AUT","Belarus": "BLR","Belgium": "BEL","Brazil": "BRA","Bulgaria": "BUL","Cambodia": "CAM","Canada": "CAN","Chile": "CHI","China": "CHN","Croatia": "CRO","Czech Republic": "CZE","Denmark": "DEN","Ecuador": "ECU","Estonia": "EST","Finland": "FIN","France": "FRA","Georgia": "GEO","Germany": "GER","Great Britain": "GBR","Greece": "GRE","Guatemala": "GUA","Hong Kong": "HKG","Hungary": "HUN","India": "IND","Indonesia": "INA","Iran": "IRI","Ireland": "IRL","Israel": "ISR","Italy": "ITA","Japan": "JPN","Kazakhstan": "KAZ","Kyrgyzstan": "KGZ","Latvia": "LAT","Lithuania": "LTU","Luxembourg": "LUX","Macau": "MAC","Malaysia": "MAS","Mexico": "MEX","Mongolia": "MGL","Nepal": "NEP","Netherlands": "NED","New Zealand": "NZL","North Macedonia": "MKD","Norway": "NOR","Pakistan": "PAK","Peru": "PER","Philippines": "PHI","Poland": "POL","Portugal": "POR","Romania": "ROU","Russia": "RUS","Serbia": "SRB","Singapore": "SGP","Slovakia": "SVK","Slovenia": "SLO","South Africa": "RSA","South Korea": "KOR","Spain": "ESP","Sri Lanka": "LKA","Sweden": "SWE","Switzerland": "SUI","Taiwan": "TPE","Thailand": "THA","Turkey": "TUR","Ukraine": "UKR","United States of America": "USA","Uzbekistan": "UZB","Venezuela": "VEN",}
    let postt = req.body;
    let fNameVar = postt['firstName']
    let lNameVar = postt['lastName']
    let countryVar = ''
    if (postt['cliCountry'] != '' && typeof postt['cliCountry'] !== 'undefined'){
        countryVar = countryDict[postt['cliCountry']]}

    var fNameRegEx = new RegExp(fNameVar, "i");
    var lNameRegEx = new RegExp(lNameVar, "i");
    var countryRegEx = new RegExp(countryVar);

    let searchTerms = {firstName: {$regex:fNameRegEx}, lastName: {$regex:lNameRegEx}, cliCountry:{$regex:countryRegEx}}

    let results = await mangoClient.db().collection('climbers').find(searchTerms).toArray();
    console.log(JSON.stringify(results));
    res.json(results);
};


async function climberDDRequest(client, req, res) {
    let postt = req.body;
    let searchTerms = {climberID: parseInt(postt['climberID'])}

    let results = await mangoClient.db().collection('climbers').find(searchTerms).toArray();
    console.log(JSON.stringify(results));
    res.json(results);
};


async function resultsRequest(client, req, res) {
    let countryDict = {"Argentina": "ARG","Austraila": "AUS","Austria": "AUT","Belarus": "BLR","Belgium": "BEL","Brazil": "BRA","Bulgaria": "BUL","Cambodia": "CAM","Canada": "CAN","Chile": "CHI","China": "CHN","Croatia": "CRO","Czech Republic": "CZE","Denmark": "DEN","Ecuador": "ECU","Estonia": "EST","Finland": "FIN","France": "FRA","Georgia": "GEO","Germany": "GER","Great Britain": "GBR","Greece": "GRE","Guatemala": "GUA","Hong Kong": "HKG","Hungary": "HUN","India": "IND","Indonesia": "INA","Iran": "IRI","Ireland": "IRL","Israel": "ISR","Italy": "ITA","Japan": "JPN","Kazakhstan": "KAZ","Kyrgyzstan": "KGZ","Latvia": "LAT","Lithuania": "LTU","Luxembourg": "LUX","Macau": "MAC","Malaysia": "MAS","Mexico": "MEX","Mongolia": "MGL","Nepal": "NEP","Netherlands": "NED","New Zealand": "NZL","North Macedonia": "MKD","Norway": "NOR","Pakistan": "PAK","Peru": "PER","Philippines": "PHI","Poland": "POL","Portugal": "POR","Romania": "ROU","Russia": "RUS","Serbia": "SRB","Singapore": "SGP","Slovakia": "SVK","Slovenia": "SLO","South Africa": "RSA","South Korea": "KOR","Spain": "ESP","Sri Lanka": "LKA","Sweden": "SWE","Switzerland": "SUI","Taiwan": "TPE","Thailand": "THA","Turkey": "TUR","Ukraine": "UKR","United States of America": "USA","Uzbekistan": "UZB","Venezuela": "VEN",}
    let postt = req.body;

    let rankVar = postt['rank']
    let countryVar = ''
    if (postt['compCountry'] != '' && typeof postt['compCountry'] !== 'undefined'){
        countryVar = countryDict[postt['compCountry']]}

    var countryRegEx = new RegExp(countryVar);
    
    let searchTerms = ''
    if (rankVar != ''){
        searchTerms =  {rank: parseInt(rankVar), compCountry:{$regex:countryRegEx}}
    } else{
        searchTerms = {compCountry:{$regex:countryRegEx}}
    }

    let results = await mangoClient.db().collection('results').find(searchTerms).toArray();
    console.log(JSON.stringify(results));
    res.json(results);
};


async function resultsCompDDRequest(client, req, res) {
    let postt = req.body;
    let searchTerms = {compID: parseInt(postt['compID'])}

    let results = await mangoClient.db().collection('competitions').find(searchTerms).toArray();
    console.log(JSON.stringify(results));
    res.json(results);
};

async function resultsClimberDDRequest(client, req, res) {
    let postt = req.body;
    let searchTerms = {climberID: parseInt(postt['climberID'])}

    let results = await mangoClient.db().collection('climbers').find(searchTerms).toArray();
    console.log(JSON.stringify(results));
    res.json(results);
};




app.use('/compReqPg', express.json({ type: '*/*' }), function (req, res) {compReqUtil(req, res)});
app.use('/compDDPg', express.json({ type: '*/*' }), function (req, res) {compDDReqUtil(req, res)});

app.use('/climberReqPg', express.json({ type: '*/*' }), function (req, res) {climberReqUtil(req, res)});
app.use('/climberDDPg', express.json({ type: '*/*' }), function (req, res) {climberDDReqUtil(req, res)});

app.use('/resultsReqPg', express.json({ type: '*/*' }), function (req, res) {resultsReqUtil(req, res)});
app.use('/resultsCompDDPg', express.json({ type: '*/*' }), function (req, res) {resultsCompDDReqUtil(req, res)});
app.use('/resultsClimberDDPg', express.json({ type: '*/*' }), function (req, res) {resultsClimberDDReqUtil(req, res)});



async function compReqUtil(req, res) {
    try {
        await mangoClient.connect();
        await compRequest(mangoClient, req, res);
        } catch (e) {console.error(e);} 
}

async function compDDReqUtil(req, res) {
    try {
        await mangoClient.connect();
        await compDDRequest(mangoClient, req, res);
        } catch (e) {console.error(e);} 
}


async function climberReqUtil(req, res) {
   try {
       await mangoClient.connect();
       await climberRequest(mangoClient, req, res);
       } catch (e) {console.error(e);} 
}

async function climberDDReqUtil(req, res) {
   try {
       await mangoClient.connect();
       await climberDDRequest(mangoClient, req, res);
       } catch (e) {console.error(e);} 
}


async function resultsReqUtil(req, res) {
    try {
        await mangoClient.connect();
        await resultsRequest(mangoClient, req, res);
        } catch (e) {console.error(e);} 
}

async function resultsCompDDReqUtil(req, res) {
    try {
        await mangoClient.connect();
        await resultsCompDDRequest(mangoClient, req, res);
        } catch (e) {console.error(e);} 
}

async function resultsClimberDDReqUtil(req, res) {
    try {
        await mangoClient.connect();
        await resultsClimberDDRequest(mangoClient, req, res);
        } catch (e) {console.error(e);} 
}
