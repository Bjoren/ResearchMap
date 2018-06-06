var CONFIG = require('../config.json');

var map = L.map('mapid').setView([
	CONFIG.map.startingPointX,
	CONFIG.map.startingPointY], 
	CONFIG.map.startingPointZoomLevel);