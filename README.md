# ResearchMap
A web-app that allows Pokémon Go players to collaborate on mapping out field research task locations.

## Prerequisites:
In order to deploy and run the ResearchMap web application, you must have:
 - [NodeJS and NPM](https://nodejs.org/en/) installed.
 - npm and nodejs system path variables configured
 - A [MapBox account with public access token](https://account.mapbox.com/access-tokens/) available

## How to Deploy

Start by cloning [the git repo](https://github.com/Bjoren/ResearchMap.git). The development branch is likely more up to date, but might not be stable at all times.

### Configuring Application

You must configure the application by editing the ´config.json´ file before you may run it.
The contents of the file will look something like this:
```
{
  ...
 
  "map": {
    "accessToken": "pk.access_token_goes_here"
    "startingPointZoomLevel": 15,
    "startingPoint": [0.5, 0.5],
    "boundaryMin": [0.0, 0.0],
    "boundaryMax": [1.1, 1.1],
  }
}
```

I've excluded everything but the "map" object for now, since we are only concerned with that.

Here is a brief explanation of each configurable property and what it does:

`accessToken: String`

Your MapBox access token. I recommend registering a new *public* token, separate from your default public token.
End-users will have access to this token, so make sure it's not a private token (private start with `sk.`, public starts with `pk.`)
Additionally, make sure you have set it to grant only read rights.
For additional security, you could set up a [URL-restriction](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/#using-url-restrictions).

**You must have a valid token set up**, or the map will not render any tiles.

`startingPointZoomLevel: Integer`

The level of zoom the map starts out with.
At zoom level 0 you see the whole world, at zoom level 16 you could see a small road.
I've found that zoom level 15 is a good starting point, providing good overview.

`startingPoint: [Latitude, Longitude]`

[Latitude and Longitude](https://www.latlong.net/) coordinates to the center of the area the map starts out at when the site is refreshed.
If you are unfamiliar with latitude and longitude, think of them as floating point X and Y values of a coordinate system.

```
boundaryMin: [Latitude, Longitude],
boundaryMax: [Latitude, Longitude]
```

*Lower left* and *top right* corners of a rectangle that defines the boundary in which the user is allowed to register Pokéstops and by extension, report field research.
This is to limit use of the map to your local community so it doesn't scale out of hand.


Any attempts to register a Pokéstop outside of this boundary will be rejected by the API-server and the map will automatically pan back to the boundary when the user pans out of bounds.


The boundary is represented on the map as a red rectangle.


You can use a website [such as this](https://www.latlong.net/) to find your coordinates.

### Starting the Application

To start the application, run these commands from your prefered CLI in the repositorys root folder:

`npm install` (The first time only)

`npm start`

Read the CLI log. Without errors, it should look like this:
```
npm start

> ResearchMapServer@1.0.0 start <LOCAL_PATH>\ResearchMap
> concurrently "nodemon ./API-server/server.js" "http-server ./Web-server" --kill-others

[1] Starting up http-server, serving ./Web-server
[1] Available on:
[1]   http://<YOUR_LOCAL_IP>:<WEB_PORT>
[1]   http://127.0.0.1:<WEB_PORT>
[1] Hit CTRL-C to stop the server
[0] [nodemon] <NODEMON_VER>
[0] [nodemon] to restart at any time, enter `rs`
[0] [nodemon] watching: *.*
[0] [nodemon] starting `node ./API-server/server.js`
[0] Successfully connected to : ./API-server/database
[0] API server listening on: <API_PORT>
```

Now open a web browser, the application should be accessible at:
>localhost:<WEB_PORT>/index.html

(Web port is 8080 by default)

## For Developers

### Additional Resources:
Postman collection can be found here:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/d7d309a9f5c17da5edc0)

### Tips

To avoid accidentally commiting the config.json file along with your changes, I recommend running the command:

`git update-index --skip-worktree config.json` in your local git repo.
