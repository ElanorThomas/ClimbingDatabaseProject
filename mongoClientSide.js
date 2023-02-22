async function compQuery() {
    let params = {
        method: "POST",
        headers: { 'Content-type': 'application/json'
        }}

    const formData = new FormData(document.querySelector('#competitionForm'));
    let content = {};
    for (var pair of formData.entries()) {
        content[pair[0]] = pair[1];
    }
    params['body']=JSON.stringify(content);
    let uurl = "http://165.106.10.170:44266/compReqPg"

    fetch(uurl, params)
        .then(function(response) { 
            response.text().then(function(text) {
                qResult = JSON.parse(text);
                console.log(qResult);
                if (qResult.length == 0){
                    document.querySelector("#tableResp").innerHTML = "Your query returned no results";
                } else{
                    document.querySelector("#tableResp").innerHTML = tabFormComp(qResult);
                }
            });
    }); 
}


function compDDQuery(givenCompID){
    let params = {
        method: "POST",
        headers: { 'Content-type': 'application/json'
        }}
        
    let content = {compID: givenCompID};
    params['body']=JSON.stringify(content);
    
    let uurl = "http://165.106.10.170:44266/compDDPg"

    fetch(uurl, params)
        .then(function(response) { 
            response.text().then(function(text) {
                qResult = JSON.parse(text);
                console.log(qResult);
                if (qResult.length == 0){
                    document.querySelector("#tableResp").innerHTML = "Your query returned no results";
                } else{
                    document.querySelector("#tableResp").innerHTML = tabformCompDD(qResult)[0];
                    document.querySelector("#jsonResp").innerHTML = tabformCompDD(qResult)[1];
                }
            });
    });

}

async function climberQuery() {
    let params = {
        method: "POST",
        headers: { 'Content-type': 'application/json'
        }}

    const formData = new FormData(document.querySelector('#climberForm'));
    let content = {};
    for (var pair of formData.entries()) {
        content[pair[0]] = pair[1];
    }
    params['body']=JSON.stringify(content);

    let uurl = "http://165.106.10.170:44266/climberReqPg"

    fetch(uurl, params)
        .then(function(response) { 
            response.text().then(function(text) {
                qResult = JSON.parse(text);
                console.log(qResult);
                if (qResult.length == 0){
                    document.querySelector("#tableResp2").innerHTML = "Your query returned no results";
                } else{
                    document.querySelector("#tableResp2").innerHTML = tabFormClimber(qResult);
                }
            });
        }); 
}


function climberDDQuery(givenClimberID){
    let params = {
        method: "POST",
        headers: { 'Content-type': 'application/json'
        }}
        
    let content = {climberID: givenClimberID};
    params['body']=JSON.stringify(content);
    
    let uurl = "http://165.106.10.170:44266/climberDDPg"

    fetch(uurl, params)
        .then(function(response) { 
            response.text().then(function(text) {
                qResult = JSON.parse(text);
                console.log(qResult);
                if (qResult.length == 0){
                    document.querySelector("#tableResp2").innerHTML = "Your query returned no results";
                } else{
                    document.querySelector("#tableResp2").innerHTML = tabformClimberDD(qResult);
                }
            });
    });
}




async function resultsQuery() {
    let params = {
        method: "POST",
        headers: { 'Content-type': 'application/json'
        }}

    const formData = new FormData(document.querySelector('#resultsForm'));
    let content = {};
    for (var pair of formData.entries()) {
        content[pair[0]] = pair[1];
    }
    params['body']=JSON.stringify(content);

    let uurl = "http://165.106.10.170:44266/resultsReqPg"

    fetch(uurl, params)
        .then(function(response) { 
            response.text().then(function(text) {
                qResult = JSON.parse(text);
                console.log(qResult);
                if (qResult.length == 0){
                    document.querySelector("#tableResp3").innerHTML = "Your query returned no results";
                } else{
                    document.querySelector("#tableResp3").innerHTML = tabFormResults(qResult);
                }
            });
        }); 
}


function resultsDDQuery(givenIDs){

    let idArr = givenIDs.split(",")
    let params = {
        method: "POST",
        headers: { 'Content-type': 'application/json'
        }}
        
    let content = {climberID: idArr[0], compID: idArr[1]};
    params['body']=JSON.stringify(content);
    
    let uurl = "http://165.106.10.170:44266/resultsClimberDDPg"

    fetch(uurl, params)
        .then(function(response) { 
            response.text().then(function(text) {
                qResult = JSON.parse(text);
                console.log(qResult);
                if (qResult.length == 0){
                    document.querySelector("#tableResp3").innerHTML = "Your query returned no results";
                } else{
                    document.querySelector("#tableResp3").innerHTML = tabformResultsClimberDD(qResult);

                }
            });
    });

    uurl = "http://165.106.10.170:44266/resultsCompDDPg"

    fetch(uurl, params)
        .then(function(response) { 
            response.text().then(function(text) {
                qResult = JSON.parse(text);
                console.log(qResult);
                if (qResult.length == 0){
                    document.querySelector("#tableResp3").innerHTML = "Your query returned no results";
                } else{
                    document.querySelector("#jsonResp3").innerHTML = tabformResultsCompDD(qResult);

                }
            });
    });
}











/**
 * Create an html table from a bunch of data in JSON form. 
 * Where the JSON form is an array of objects
 * @param dbres -- the JSON data
 * @returns an HTML table
 */
 function tabformOG(dbres) {
    let tbl = '<table border="1">';
    let keyss = Object.keys(dbres[0]);
    tbl += "<tr>";
    // first, format the table header. 
    // each item in the header is a key in the first JSON object
    // each of these is turned into a button that sorts the JSON data on that key
    let keyssLess = keyss.slice(1,keyss.length-1)
    
    for (let k of keyssLess) {
        tbl += "<th><button onclick='doReSort(\""+k+"\")'>" + k  + "</button></th>"
    }
    // same loop, different phrasing
    //for (let kk = 0; kk < keyss.length; kk++) {
    //    let k = keyss[kk];
    //    tbl += "<th><button onclick='doReSort(\""+k+"\")'>" + k  + "</button></th>";
    //}
    // same loop, yet again!
    //keyss.forEach(k => {
    //    tbl += "<th><button onclick='doReSort(\""+k+"\")'>" + k  + "</button></th>";
    //}); 
    tbl += "</tr>";
    dbres.forEach(element => {
        tbl += "<tr>";
        keyssLess.forEach(k => {
            tbl += "<td>" + element[k] + "</td>";
        });
        tbl += "</tr>";
    });
    tbl += "</table>";
    return tbl;
}



/**
 * Create an html table from a bunch of data in JSON form. 
 * Where the JSON form is an array of objects
 * @param dbres -- the JSON data
 * @returns an HTML table
 */
 function tabFormComp(dbres) {
    let tbl = '<table border="1">';
    let keyss = Object.keys(dbres[0]);
    tbl += "<tr>";

    let keyssLess = keyss.slice(1,keyss.length-1)
    
    for (let k of keyssLess) {
        // tbl += "<th><button onclick='doReSort(\""+k+"\")'>" + k  + "</button></th>"
        tbl += "<td>" + k + "</td>";
    }
    tbl += "<td>Drilldown</td>"
    tbl += "</tr>";
    dbres.forEach(element => {
        tbl += "<tr>";
        keyssLess.forEach(k => {
            tbl += "<td>" + element[k] + "</td>";
        });
        let elemjson = JSON.stringify(element)
        tbl += "<th><button onclick='compDDQuery(\"" + element["compID"] + "\")'>+</button></th>"
        tbl += "</tr>";
    });
    tbl += "</table>";
    return tbl;
}




function tabformCompDD(dbres) {//for climbers
    let tbl1 = '<table border="1">';
    let compKeys = Object.keys(dbres[0]);

    tbl1 += "<tr>";
    let compKeysLess = compKeys.slice(1,compKeys.length-1)

    //making headers
    for (let k of compKeysLess) {
        tbl1 += "<td>" + k + "</td>";
    }
    tbl1 += "</tr>";

    tbl1 += "<tr>";
    compKeysLess.forEach(k => {
        tbl1 += "<td>" + dbres[0][k] + "</td>";
    });
    tbl1 += "</tr>";
    tbl1 += "</table>";
    


    let tbl2 = "<br><br>Climbers that participated in this competition:"
    tbl2 += '<table border="1">';
    tbl2 += "<tr>";
    let climberKeys = Object.keys(dbres[0]['climbers'][0])
    let climberKeysLess = climberKeys//climberKeys.slice(1,climberKeys.length-1)

    //headers
    for (let k of climberKeysLess) {
        tbl2 += "<td>" + k + "</td>";
    }

    tbl2 += "</tr>";
    dbres[0]['climbers'].forEach(element => {
        tbl2 += "<tr>";
        climberKeysLess.forEach(k => {
            // tbl2 += "<td>" + dbres[0]['climbers'][k] + "</td>";
            tbl2 += "<td>" + element[k] + "</td>";
        });
        tbl2 += "</tr>";
    });
    tbl2 += "</table>";

    return [tbl1, tbl2];
}


/**
 * Create an html table from a bunch of data in JSON form. 
 * Where the JSON form is an array of objects
 * @param dbres -- the JSON data
 * @returns an HTML table
 */
 function tabFormClimber(dbres) {
    let tbl = '<table border="1">';
    let keyss = Object.keys(dbres[0]);
    tbl += "<tr>";

    let keyssLess = keyss.slice(1,keyss.length-1)
    
    for (let k of keyssLess) {
        tbl += "<th><button onclick='doReSort(\""+k+"\")'>" + k  + "</button></th>"
    }
    tbl += "<td>Drilldown</td>"
    tbl += "</tr>";
    dbres.forEach(element => {
        tbl += "<tr>";
        keyssLess.forEach(k => {
            tbl += "<td>" + element[k] + "</td>";
        });
        // let elemjson = JSON.stringify(element)
        tbl += "<th><button onclick='climberDDQuery(\"" + element["climberID"] + "\")'>+</button></th>"
        tbl += "</tr>";
    });
    tbl += "</table>";
    return tbl;
}




function tabformClimberDD(dbres) {//for climbers
    let tbl1 = '<table border="1">';
    let climberKeys = Object.keys(dbres[0]);
    let compKeys = Object.keys(dbres[0]['competitions'])

    tbl1 += "<tr>";
    let climberKeysLess = climberKeys.slice(1,climberKeys.length-1)

    //making headers
    for (let k of climberKeysLess) {
        tbl1 += "<td>" + k + "</td>";
    }
    tbl1 += "<td>competitions</td>";
    tbl1 += "</tr>";

    tbl1 += "<tr>";
    climberKeysLess.forEach(k => {
        tbl1 += "<td>" + dbres[0][k] + "</td>";
    });

    let compString = ""
    compKeys.forEach(k => {
        compString += dbres[0]['competitions'][k]['compName']
        compString += "<br>"
    });
    tbl1 += "<td>" + compString + "</td>";
    
    tbl1 += "</tr>";
    tbl1 += "</table>";
    return tbl1;
}



/**
 * Create an html table from a bunch of data in JSON form. 
 * Where the JSON form is an array of objects
 * @param dbres -- the JSON data
 * @returns an HTML table
 */
 function tabFormResults(dbres) {
    let tbl = '<table border="1">';
    // let keyss = Object.keys(dbres[0]);
    // let keyss = ['firstname', 'lastname','compcountry','compname']
    let keyss = ['climberID', 'compID', 'compName', 'compCountry']
    tbl += "<tr>";

    let keyssLess = keyss//keyss.slice(1,keyss.length)
    
    for (let k of keyssLess) {
        tbl += "<th><button onclick='doReSortResults(\""+k+"\")'>" + k  + "</button></th>"
        // tbl += "<td>" + k + "</td>";
    }
    tbl += "<td>Drilldown</td>"
    tbl += "</tr>";
    dbres.forEach(element => {
        tbl += "<tr>";
        keyssLess.forEach(k => {
            tbl += "<td>" + element[k] + "</td>";
        });
        tbl += "<th><button onclick='resultsDDQuery(\"" + element["climberID"] + "," + element['compID'] + "\")'>+</button></th>";
        tbl += "</tr>";
    });
    tbl += "</table>";
    return tbl;
}




function tabformResultsCompDD(dbres) {//for climbers
    let tbl2 = '<br><br>'
    tbl2 += '<table border="1">';
    // let keyss = Object.keys(dbres[0]);
    let keyss2 = ['compID','compName','city','compCountry',]
    tbl2 += "<tr>";

    let keyssLess2 = keyss2//keyss.slice(1,keyss.length)
    
    for (let k of keyssLess2) {
        tbl2 += "<td>" + k + "</td>";
    }
    tbl2 += "</tr>";
    dbres.forEach(element => {
        tbl2 += "<tr>";
        keyssLess2.forEach(k => {
            tbl2 += "<td>" + element[k] + "</td>";
        });
        tbl2 += "</tr>";
    });
    tbl2 += "</table>";
    return tbl2;
}



function tabformResultsClimberDD(dbres) {//for climbers

    let tbl = '<table border="1">';
    let keyss = ['climberID', 'firstName', 'lastName', 'cliCountry','startNumber','rank']
    tbl += "<tr>";

    let keyssLess = keyss
    
    for (let k of keyssLess) {
        tbl += "<td>" + k + "</td>";
    }
    tbl += "</tr>";
    dbres.forEach(element => {
        tbl += "<tr>";
        keyssLess.forEach(k => {
            tbl += "<td>" + element[k] + "</td>";
        });
        tbl += "</tr>";
    });
    tbl += "</table>";

    return tbl;
}






/**
 * Sort the retrieved data by the given key. 
 * Then reformat it into a table.
 * @param {} field the field on which to sort.
 */
 function doReSort(field) {
    sortBy(field);
    document.querySelector("#tableResp2").innerHTML = tabFormClimber(qResult);
}


 function doReSortResults(field) {
    sortBy(field);
    document.querySelector("#tableResp3").innerHTML = tabFormResults(qResult);
}

/**
 * Actually do the Sorting
 * @param {} pName the field by which to sort
 */
function sortBy(pName) {
    function compare( a, b ) {
        if ( a[pName] < b[pName] ){
          return -1;
        }
        if ( a[pName] > b[pName] ){
          return 1;
        }
        return 0;
      }
    qResult.sort(compare);
    console.log(`sorted on ${pName}`);
}
