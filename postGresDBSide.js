/** 
 * Very simple site for serving static pages 
 * and performing one simple query on the rocket database
 * 
 * To start: UNIX> nohup node app6.js &
 *           where apps6.js is the name of this file
 *           nohup allows things to run in background, smoothly
 */
//USE TWO DIFFERENT PORTS for mongo and for postgres
//the queries know which one youre querying

const path = require('path')
const express = require('express')
const { Pool } = require('pg') // connecting to postgres
const { CommandCompleteMessage, closeComplete } = require('pg-protocol/dist/messages')

// Connection to postgres parameters
const pool = new Pool({
    user: 'dbuser',
    host: 'localhost',
    database: 'ethomas',
    password: '12345678',
    port: 5432,
})

console.log("Created pool ", pool)

const app = express()
const port = 44265 

// static pages are served from the same directory as this file
app.use("/", express.static(path.join(__dirname)));


function compReq(dberr, client, done, req, res) {
    if (dberr) {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');
        return;
    }

    let postt = req.body;
    client.query("SELECT * from competitions where compName = '" + postt['compName'] + "'", function (dberr, dbres) {

        done()
        if (dberr) {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');
            
        } else {
            console.log(dbres.rows)
            res.json(dbres.rows);
 
        }
    });
};


function compDDReq(dberr, client, done, req, res) {
    if (dberr) {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');
        return;
    }

    let postt = req.body;
    client.query("SELECT * from results where compid = '" + postt['compid'] + "'", function (dberr, dbres) {

        done()
        if (dberr) {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');
            
        } else {
            console.log(dbres.rows)
            res.json(dbres.rows);
 
        }
    });
};


// do a query to Postgres and return the result as JSON
function climberReq(dberr, client, done, req, res) {
   if (dberr) {
       res.writeHead(500);
       res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');
       return;
    }

    let countryDict = {"Argentina": "ARG","Austraila": "AUS","Austria": "AUT","Belarus": "BLR","Belgium": "BEL","Brazil": "BRA","Bulgaria": "BUL","Cambodia": "CAM","Canada": "CAN","Chile": "CHI","China": "CHN","Croatia": "CRO","Czech Republic": "CZE","Denmark": "DEN","Ecuador": "ECU","Estonia": "EST","Finland": "FIN","France": "FRA","Georgia": "GEO","Germany": "GER","Great Britain": "GBR","Greece": "GRE","Guatemala": "GUA","Hong Kong": "HKG","Hungary": "HUN","India": "IND","Indonesia": "INA","Iran": "IRI","Ireland": "IRL","Israel": "ISR","Italy": "ITA","Japan": "JPN","Kazakhstan": "KAZ","Kyrgyzstan": "KGZ","Latvia": "LAT","Lithuania": "LTU","Luxembourg": "LUX","Macau": "MAC","Malaysia": "MAS","Mexico": "MEX","Mongolia": "MGL","Nepal": "NEP","Netherlands": "NED","New Zealand": "NZL","North Macedonia": "MKD","Norway": "NOR","Pakistan": "PAK","Peru": "PER","Philippines": "PHI","Poland": "POL","Portugal": "POR","Romania": "ROU","Russia": "RUS","Serbia": "SRB","Singapore": "SGP","Slovakia": "SVK","Slovenia": "SLO","South Africa": "RSA","South Korea": "KOR","Spain": "ESP","Sri Lanka": "LKA","Sweden": "SWE","Switzerland": "SUI","Taiwan": "TPE","Thailand": "THA","Turkey": "TUR","Ukraine": "UKR","United States of America": "USA","Uzbekistan": "UZB","Venezuela": "VEN",}
    let postt = req.body;
    let fNameVar = '%'
    let lNameVar = '%'
    let countryVar = '%'
    if (postt['firstName'] != ''){fNameVar = '%' + postt['firstName'] + '%'}
    if (postt['lastName'] != ''){lNameVar = '%' + postt['lastName'] + '%'}
    if (postt['cliCountry'] != '' && typeof postt['cliCountry'] !== 'undefined'){countryVar = countryDict[postt['cliCountry']]}
    
    client.query("SELECT * from climbers where LOWER(firstname) LIKE LOWER('" + fNameVar + "') AND LOWER(lastname) LIKE LOWER('" + lNameVar + "') AND clicountry like '" + countryVar + "'", function (dberr, dbres) {

       done()
       if (dberr) {
           res.writeHead(500);
           res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');
           
        } else {
           console.log(dbres.rows)
           res.json(dbres.rows);

        }
   });
};





function climberDDReq(dberr, client, done, req, res) {
    if (dberr) {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');
        return;
    }

    let postt = req.body;
    client.query("with table1 as (select * from competitions natural join results), allTable as (select * from table1 natural join climbers) SELECT climberid, firstname, lastname, clicountry, compname from allTable where climberid = '" + postt['climberid'] + "'", function (dberr, dbres) {

        done()
        if (dberr) {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');
        } else {
            console.log(dbres.rows)
            res.json(dbres.rows);
        }
    });
};



function resultsReq(dberr, client, done, req, res) {
    if (dberr) {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');
        return;
    }

    let countryDict = {"Argentina": "ARG","Austraila": "AUS","Austria": "AUT","Belarus": "BLR","Belgium": "BEL","Brazil": "BRA","Bulgaria": "BUL","Cambodia": "CAM","Canada": "CAN","Chile": "CHI","China": "CHN","Croatia": "CRO","Czech Republic": "CZE","Denmark": "DEN","Ecuador": "ECU","Estonia": "EST","Finland": "FIN","France": "FRA","Georgia": "GEO","Germany": "GER","Great Britain": "GBR","Greece": "GRE","Guatemala": "GUA","Hong Kong": "HKG","Hungary": "HUN","India": "IND","Indonesia": "INA","Iran": "IRI","Ireland": "IRL","Israel": "ISR","Italy": "ITA","Japan": "JPN","Kazakhstan": "KAZ","Kyrgyzstan": "KGZ","Latvia": "LAT","Lithuania": "LTU","Luxembourg": "LUX","Macau": "MAC","Malaysia": "MAS","Mexico": "MEX","Mongolia": "MGL","Nepal": "NEP","Netherlands": "NED","New Zealand": "NZL","North Macedonia": "MKD","Norway": "NOR","Pakistan": "PAK","Peru": "PER","Philippines": "PHI","Poland": "POL","Portugal": "POR","Romania": "ROU","Russia": "RUS","Serbia": "SRB","Singapore": "SGP","Slovakia": "SVK","Slovenia": "SLO","South Africa": "RSA","South Korea": "KOR","Spain": "ESP","Sri Lanka": "LKA","Sweden": "SWE","Switzerland": "SUI","Taiwan": "TPE","Thailand": "THA","Turkey": "TUR","Ukraine": "UKR","United States of America": "USA","Uzbekistan": "UZB","Venezuela": "VEN",}
    let postt = req.body;
    let rankVar = postt['rank']
    let countryVar = '%'
    if (postt['compCountry'] != '' && typeof postt['compCountry'] !== 'undefined'){countryVar = countryDict[postt['compCountry']]}
    
    if (rankVar != ''){
        client.query("with table1 as (select * from competitions natural join results), allTable as (select * from table1 natural join climbers) SELECT * from allTable where rank = " + rankVar + " AND compcountry like '" + countryVar + "'", function (dberr, dbres) {
 
            done()
            if (dberr) {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');
                
            } else {
                console.log(dbres.rows)
                res.json(dbres.rows);
     
            }
        });
    } else {
        client.query("with table1 as (select * from competitions natural join results), allTable as (select * from table1 natural join climbers) SELECT * from allTable where compcountry like '" + countryVar + "'", function (dberr, dbres) {
        
            done()
            if (dberr) {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');

            } else {
                console.log(dbres.rows)
                res.json(dbres.rows);
            
            }
        });
    }
};


function resultsDDReq(dberr, client, done, req, res) {
    if (dberr) {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');
        return;
    }

    // let countryDict = {"Argentina": "ARG","Austraila": "AUS","Austria": "AUT","Belarus": "BLR","Belgium": "BEL","Brazil": "BRA","Bulgaria": "BUL","Cambodia": "CAM","Canada": "CAN","Chile": "CHI","China": "CHN","Croatia": "CRO","Czech Republic": "CZE","Denmark": "DEN","Ecuador": "ECU","Estonia": "EST","Finland": "FIN","France": "FRA","Georgia": "GEO","Germany": "GER","Great Britain": "GBR","Greece": "GRE","Guatemala": "GUA","Hong Kong": "HKG","Hungary": "HUN","India": "IND","Indonesia": "INA","Iran": "IRI","Ireland": "IRL","Israel": "ISR","Italy": "ITA","Japan": "JPN","Kazakhstan": "KAZ","Kyrgyzstan": "KGZ","Latvia": "LAT","Lithuania": "LTU","Luxembourg": "LUX","Macau": "MAC","Malaysia": "MAS","Mexico": "MEX","Mongolia": "MGL","Nepal": "NEP","Netherlands": "NED","New Zealand": "NZL","North Macedonia": "MKD","Norway": "NOR","Pakistan": "PAK","Peru": "PER","Philippines": "PHI","Poland": "POL","Portugal": "POR","Romania": "ROU","Russia": "RUS","Serbia": "SRB","Singapore": "SGP","Slovakia": "SVK","Slovenia": "SLO","South Africa": "RSA","South Korea": "KOR","Spain": "ESP","Sri Lanka": "LKA","Sweden": "SWE","Switzerland": "SUI","Taiwan": "TPE","Thailand": "THA","Turkey": "TUR","Ukraine": "UKR","United States of America": "USA","Uzbekistan": "UZB","Venezuela": "VEN",}
    let postt = req.body;
    let compVar = postt['compid']
    let climberVar = postt['climberid']
    console.log(compVar)
    console.log(climberVar)
    // let rankVar = postt['rank']
    // let countryVar = '%'
    // if (postt['compCountry'] != '' && typeof postt['compCountry'] !== 'undefined'){countryVar = countryDict[postt['compCountry']]}
    

    client.query("with table1 as (select * from competitions natural join results), allTable as (select * from table1 natural join climbers) SELECT * from allTable where compid = '" + compVar + "' AND climberid = '" + climberVar + "'", function (dberr, dbres) {
        
        done()
        if (dberr) {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: ' + dberr.code + ' ..\n');

        } else {
            console.log(dbres.rows)
            res.json(dbres.rows);
        
        }
    });
};





// tell express aboout how to handle the dq1 request
//  app.post('/dq1', express.json({ type: '*/*' }), function (req, res) {
//      pool.connect(function (dberr, client, done) {
//          dbreq1(dberr, client, done, req, res);
//      });
//  });

app.use('/compQPg', express.json({ type: '*/*' }), function (req, res) {
    pool.connect(function (dberr, client, done) {
        compReq(dberr, client, done, req, res);//req eill now have my form data
    });
});
app.use('/compDDPg', express.json({ type: '*/*' }), function (req, res) {
    pool.connect(function (dberr, client, done) {
        compDDReq(dberr, client, done, req, res);//req eill now have my form data
    });
});
app.use('/climberQPg', express.json({ type: '*/*' }), function (req, res) {
   pool.connect(function (dberr, client, done) {
       climberReq(dberr, client, done, req, res);//req eill now have my form data
   });
});
app.use('/climberDDPg', express.json({ type: '*/*' }), function (req, res) {
    pool.connect(function (dberr, client, done) {
        climberDDReq(dberr, client, done, req, res);//req eill now have my form data
    });
});
app.use('/resultsQPg', express.json({ type: '*/*' }), function (req, res) {
    pool.connect(function (dberr, client, done) {
        resultsReq(dberr, client, done, req, res);//req eill now have my form data
    });
});
app.use('/resultsDDPg', express.json({ type: '*/*' }), function (req, res) {
    pool.connect(function (dberr, client, done) {
        resultsDDReq(dberr, client, done, req, res);//req eill now have my form data
    });
});




// start the Node server
app.listen(port, function(error){
    if(error) throw error
    console.log(`Server created Successfully on port ${port}`);
})
