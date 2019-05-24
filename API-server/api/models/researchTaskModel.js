var utils = require('../util/utils.js');
const REQUIRED_FIELDS = ["task","reward","reporter"];

exports.validateResearchTask = function(task) {
    var missingFields = utils.validateMissingFields(task, REQUIRED_FIELDS);

	if(missingFields) { 
		return utils.createError("Missing required field(s): " + JSON.stringify(missingFields))
    };

    try {
        validateReward(task.reward);
    } 
    catch (error) {
        return error;
    }
}

validateReward = function(reward) {
    if(reward.encounter.length < 1 && reward.item == null){
        throw Error("\"reward\" property requires one of \[\"\encounter\",\"item\"\]");
    }

    try {
        validateEncounter(reward.encounter);
        validateItem(reward.item);
    }
    catch (error) { throw error }

    return filterReward(reward);
}

validateEncounter = function(encounter) {
    validatedEncounter = new Array();

    if(!encounter.isArray()) {
        throw Error("\"encounter\" property must be an Array of Pokémon names");
    }

    encounter.forEach(pokemonName => {
        if(typeof pokemonName === "string") {
            //Validate against list of Pokémon names?
        } else {
            throw Error("\"encounter\" property must be an Array");
        }
        
    });
}

validateItem = function(item) {
    var validatedItem = new Array();
    if(!item.isArray()) {
        throw Error("\"item\" property must be an Array");
    }

    item.forEach(reward => {
        if(utils.validateMissingFields(task, ["name","amount"])) { 
            throw Error("Missing required field(s): " + JSON.stringify(missingFields))
        }
    });
    /*"item":
			[
				{
					"name": "Potion",
					"amount": 3
				},
				{
					"name": "Super Potion",
					"amount": 1
				}
			],*/
}

filterReward = function(reward) {
    var filteredReward = new Object();

    filteredReward.encounter = reward.encounter;
    filteredReward.item = reward.item;

    return filteredReward;
}
