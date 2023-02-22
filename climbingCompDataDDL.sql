DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS climbers;
DROP TABLE IF EXISTS competitions;

create type category as enum ('boulder', 'lead', 'speed');

CREATE TABLE climbers (
    climberID INTEGER PRIMARY KEY,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    cliCountry VARCHAR(30)
);

CREATE TABLE competitions (
    compID INTEGER PRIMARY KEY,
    compName VARCHAR(100),
    compCountry VARCHAR(30),
    city VARCHAR(30),
    startDate DATE,
    endDate DATE
    
);

CREATE TABLE results (
    compID INTEGER,
    climberID INTEGER,
    startNumber VARCHAR(5),
    rank INTEGER,
    qualification VARCHAR(30),
    qualification1 VARCHAR(30),
    qualification2 VARCHAR(30),
    semifinal VARCHAR(30),
    final VARCHAR(30),
    type category,
    foreign key(compID) references competitions(compID),
    foreign key(climberID) references climbers(climberID)
);
