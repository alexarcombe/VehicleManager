# Coretex Vehicle Manager System

A app built for Coretex code challange, built with a react front-end, .net back-end and a MongDB. Hosted on Azure https://vehiclemanagersystem.azurewebsites.net/ with a Cosmos db.

## Host localy

### Prerequests

- dotnet CLI or Visual Studios
- node
- mongodb CLI

### install

Download the repo and cd into ClientApp and run in terminal

```
npm install
```

### Set up mongoDB

create a folder, to store the data and copy the path to it.
run in terminal:

```
mongod --dbpath <path>
```

open another terminal and run:

```
mongo

use VehicleDB

db.createCollection('Vehicles')

db.Vehicles.insertMany([   {     customerId: '123',     name: 'Coretex Truck',     model: 'Tesla x.x',     tags: ['NZ', 'Auckland'],     speed: '100',     latitude: '10.1',     longitude: '20.2',     sensors: [{ name: 'cooling', value: '-10' }],     comments: [       {         by: 'John',         date: '2020-04-06',         comment: 'The roads were a bit ruff to this truck.',       },     ],   },   {     customerId: '123',     name: 'Alex Truck',     model: 'Boxcar 0.1.9',     tags: ['SWE', 'Stockholm'],     speed: '120',     latitude: '0',     longitude: '0',     sensors: [{ name: 'cooling', value: '-20' }],     comments: [       {         by: 'Alex',         date: '2020-04-20',         comment: 'The roads were a bit ruff with a toy car.',       },     ],   }, ]);
```

This should set up the DB, run

```
db.Vehicles.find({}).pretty()
```

to test that everything is set up.

### Start

With the db running in a terminal, start up the server.
This can be done with the dotnet CLI or Visual Studios. </br>

With dotnet CLI run: </br>
open a terminal and cd into the project, run:

```
dotnet
```

With Visual Studios, open up the project and run.
