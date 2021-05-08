class API {
	constructor () {
		this.storage 									= localStorage;
	}

    exists(key) {
        return this.get(key) !== null;
    }
    
    length() {
        return this.storage.length;
    }

    get(key) {
        return this.storage.getItem(key);
    }

    set(key, val) {
        return this.storage.setItem(key, val);
    }

    clear() {
        return this.storage.clear();
    }

	getCities = async () => {
		try {
			let response = await fetch("https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.min.json");
			let json = await response.json();
            let list = [];
            Object.entries(json).map(([k,v]) => {
                return list.push({Country: k, CityList: v})
            })
			return list;
		} catch (error) {
			console.error(error);
		}
		return false
	}

}
export default API
