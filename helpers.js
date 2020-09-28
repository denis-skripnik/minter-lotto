async function sleep(ms) {
    await new Promise(r => setTimeout(r, ms));
    }

    async function unixTime(time){
        return parseInt(new Date(time).getTime()/1000)
        }
    
function compareDate(a, b)
{
	if(a.unixtime > b.unixtime)
	{
		return -1;
	}
else{
		return 1;
	}
}

	async function objectSearch(object, value) {
		let results = -1;
        for (let key in object) {
if (object[key] === value) {
    results += 1;
}
}
return results;
}

module.exports.unixTime = unixTime;
module.exports.sleep = sleep;
module.exports.compareDate = compareDate;
module.exports.objectSearch = objectSearch;