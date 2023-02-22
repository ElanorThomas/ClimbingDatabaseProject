# ThomasPortfolio
Elanor Thomas's college code portfolio

This is an implementation of a web interface for users to query two databases (one Mongo, one postGres) containing the same data.
The data is the results of climbing competitions in the 2018-19 bouldering wold cup circuit.

Program Files:
===============
    index.html
        Contains the html for the started page, where the user chooses between mongo and pg

    mongoQuery.html
        Contains html code for query building with mongo
    mongoClientSide.js
        Contains client side functions for interacting with the html - table makers and queryFunctions to request data from the DB side
    mongoDBSide.js
        Contains db-side functions for querying the database and use functions for connectionf to the client side file

    postGresQuery.html
        Contains html code for query building with postGres
    postGresClientSide.js
        Contains client side functions for interacting with the html - table makers and queryFunctions to request data from the DB side
    postGresDBSide.js
        Contains db-side functions for querying the database and use functions for connectionf to the client side file
