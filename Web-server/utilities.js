'use strict';

this.getIconUrl = function(reward) { //TODO: There's definitely a better way to do this
	switch(reward) {
		case "Aerodactyl":
			return '/reward_icons/Aerodactyl.png';
		case "Rare Candy":
			return '/reward_icons/Rare_Candy.png';
		default:
			return null;
	}
}