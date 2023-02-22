function compQuery() {

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
 
    let uurl = "http://165.106.10.170:44265/compQPg"
 
    fetch(uurl, params)
        .then(function(response) { 
            response.text().then(function(text) {
                qResult = JSON.parse(text);
                console.log(qResult);
                document.querySelector("#tableResp").innerHTML = tabFormComp(qResult);
            });
        });
    
}


function compDDQuery(givenCompID) {
    let params = {
            method: "POST",
            headers: { 'Content-type': 'application/json'
            }}
    let content = {compid: givenCompID};
    params['body']=JSON.stringify(content);
 
    let uurl = "http://165.106.10.170:44265/compDDPg"
 
    fetch(uurl, params)
        .then(function(response) { 
            response.text().then(function(text) {
                qResult = JSON.parse(text);
                console.log(qResult);
                if (qResult.length == 0){
                    document.querySelector("#jsonResp").innerHTML = "Your query returned no results";
                } else{
                    document.querySelector("#jsonResp").innerHTML = tabformCompDD(qResult);

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
 function tabFormComp(dbres) {
    let tbl = '<table border="1">';
    let keyss = Object.keys(dbres[0]);
    tbl += "<tr>";

    let keyssLess = keyss//keyss.slice(1,keyss.length)
    
    for (let k of keyssLess) {
        tbl += "<td>" + k + "</td>";
    }
    tbl += "<td>Drilldown</td>"
    tbl += "</tr>";
    dbres.forEach(element => {
        tbl += "<tr>";
        keyssLess.forEach(k => {
            if (k === 'startdate' || k === 'enddate'){
                dateOnly = String(element[k]).substring(0,10)
                tbl += "<td>" + dateOnly + "</td>";
            } else {
                tbl += "<td>" + element[k] + "</td>";
            }
        });
        tbl += "<th><button onclick='compDDQuery(\"" + element["compid"] + "\")'>+</button></th>"
        tbl += "</tr>";
    });
    tbl += "</table>";
    return tbl;
}


function tabformCompDD(dbres) {//for climbers
    let tbl = "<br><br>Climbers that participated in this competition:"
    tbl += '<table border="1">';
    tbl += "<tr>";
    let resultsKeys = Object.keys(dbres[0])

    let resultsKeysLess = resultsKeys.slice(1, resultsKeys.length)

    //headers
    for (let k of resultsKeysLess) {
        tbl += "<td>" + k + "</td>";
    }

    tbl += "</tr>";
    dbres.forEach(element => {
        tbl += "<tr>";
        resultsKeysLess.forEach(k => {
            tbl += "<td>" + element[k] + "</td>";
        });
        tbl += "</tr>";
    });
    tbl += "</table>";
    return tbl;
}








/**
* Do a query.  This just calls a fairly static query on the rocket database.
* Each time it is called, it gets one more random rocket than the previous time
* this is the client side, talking to html its saying fetch from node
* the node file fetches from database
*/
function climberQuery() {

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

   let uurl = "http://165.106.10.170:44265/climberQPg"

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



function climberDDQuery(givenClimberID) {
    let params = {
            method: "POST",
            headers: { 'Content-type': 'application/json'
            }}
    let content = {climberid: givenClimberID};
    params['body']=JSON.stringify(content);
 
    let uurl = "http://165.106.10.170:44265/climberDDPg"
 
    fetch(uurl, params)
        .then(function(response) { 
            response.text().then(function(text) {
                qResult = JSON.parse(text);
                console.log(qResult);
                if (qResult.length == 0){
                    document.querySelector("#jsonResp2").innerHTML = "Your query returned no results";
                } else{
                    document.querySelector("#tableResp2").innerHTML = tabformClimberDD(qResult)[0];
                    document.querySelector("#jsonResp2").innerHTML = tabformClimberDD(qResult)[1];

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
 function tabFormClimber(dbres) {
    let tbl = '<table border="1">';
    let keyss = Object.keys(dbres[0]);
    tbl += "<tr>";
    // }
    for (let k of keyss) {
        tbl += "<th><button onclick='doReSortClimber(\""+k+"\")'>" + k  + "</button></th>"
    }
    tbl += "<td>Drilldown</td>"
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
        keyss.forEach(k => {
            tbl += "<td>" + element[k] + "</td>";
        });
        tbl += "<th><button onclick='climberDDQuery(\"" + element["climberid"] + "\")'>+</button></th>"
        tbl += "</tr>";
    });
    tbl += "</table>";
    return tbl;
}


function tabformClimberDD(dbres) {//for climbers
    let climberKeys = Object.keys(dbres[0]);
    let climberKeysLess = climberKeys.slice(0,climberKeys.length-1)

    let tbl = '<table border="1">';
    tbl += "<tr>";
    for (let k of climberKeysLess) {
        tbl += "<td>" + k + "</td>";
    }

    tbl += "</tr>";
    tbl += "<tr>";
    climberKeysLess.forEach(k => {
       tbl += "<td>" + dbres[0][k] + "</td>";
    });
    tbl += "</tr>";
    tbl += "</table>";
    let tbl2 = '<br>Competitions in which this climber participated:<br>'
    tbl2 += '<table border="1">';
    tbl2 += "<tr>";
    tbl2 += "<td>compName</td>";
    tbl2 += "</tr>";
    tbl2 += "<tr>";
    let compString = ""
    dbres.forEach(elem => {
        compString += elem['compname']
        compString += "<br>"
    });
    tbl2 += "<td>" + compString + "</td>";
    tbl2 += "</tr>";
    tbl2 += "</table>";
    return [tbl, tbl2];

}





/**
* Do a query.  This just calls a fairly static query on the rocket database.
* Each time it is called, it gets one more random rocket than the previous time
* this is the client side, talking to html its saying fetch from node
* the node file fetches from database
*/
function resultsQuery() {
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
 
    let uurl = "http://165.106.10.170:44265/resultsQPg"
 
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



function resultsDDQuery(givenIDs) {
    let params = {
            method: "POST",
            headers: { 'Content-type': 'application/json'
            }}
    let idArr = givenIDs.split(",")
    let content = {climberid: idArr[0], compid: idArr[1]};
    params['body']=JSON.stringify(content);
 
    let uurl = "http://165.106.10.170:44265/resultsDDPg"
 
    fetch(uurl, params)
        .then(function(response) { 
            response.text().then(function(text) {
                qResult = JSON.parse(text);
                console.log(qResult);
                if (qResult.length == 0){
                    document.querySelector("#jsonResp3").innerHTML = "Your query returned no results";
                } else{
                    document.querySelector("#tableResp3").innerHTML = tabFormResultsDD(qResult)[0];
                    document.querySelector("#jsonResp3").innerHTML = tabFormResultsDD(qResult)[1];

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
 function tabFormResults(dbres) {
    let tbl = '<table border="1">';
    let keyss = ['firstname', 'lastname','compcountry','compname']
    tbl += "<tr>";

    let keyssLess = keyss
    
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
        tbl += "<th><button onclick='resultsDDQuery(\"" + element["climberid"] + "," + element['compid'] + "\")'>+</button></th>";
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
 function tabFormResultsDD(dbres) {

    let tbl = '<table border="1">';
    // let keyss = Object.keys(dbres[0]);
    let keyss = ['climberid', 'firstname', 'lastname', 'clicountry','startnumber','rank']
    tbl += "<tr>";

    let keyssLess = keyss//keyss.slice(1,keyss.length)
    
    for (let k of keyssLess) {
        // tbl += "<th><button onclick='doReSort(\""+k+"\")'>" + k  + "</button></th>"
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
    // return tbl;


    let tbl2 = '<br><br>'
    tbl2 += '<table border="1">';
    // let keyss = Object.keys(dbres[0]);
    let keyss2 = ['compid','compname','city','compcountry',]
    tbl2 += "<tr>";

    let keyssLess2 = keyss2//keyss.slice(1,keyss.length)
    
    for (let k of keyssLess2) {
        // tbl += "<th><button onclick='doReSortResults(\""+k+"\")'>" + k  + "</button></th>"
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
    return [tbl, tbl2];
}








/**
* Sort the retrieved data by the given key. 
* Then reformat it into a table.
* @param {} field the field on which to sort.
*/
function doReSortClimber(field) {
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
