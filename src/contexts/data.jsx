import React, { useState, createContext } from 'react';

import { API } from '../services';

export const DataContext = createContext();

export const DataProvider = (props) => {
	const api 								        = new API();
    const [citiesList, setCitiesList]               = useState(null)
    const [currentGameData, setCurrentGameData]     = useState(null)

    const generateCitiesList = async () => {
        const apiData = await api.getCities();
        if (apiData) {
            setCitiesList(apiData)
        } else {
            setCitiesList(false)
        }
        return apiData
    }

    const generateRandomTemperature = (min = -25, max = 45) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const getRandomData = (array, n) => {
        const shuffle = array.sort(() => 0.5 - Math.random());
        return shuffle.slice(0, n);
    }

    const generateNewGame = async () => {
        let currentGameData = []
        let dataList = !citiesList ? await generateCitiesList() : citiesList
        
        if (dataList) {
            let randomCountries = getRandomData(Object.values(dataList), 2)
            if (randomCountries && randomCountries.length > 0) {
                randomCountries.map((country, i) => {
                    let city = getRandomData(country.CityList, 1)
                    if (city && city[0]) {
                        let temp = generateRandomTemperature()
                        if (i === 1 && currentGameData[0].Temperature === temp) {
                            temp = generateRandomTemperature()
                        }
                        currentGameData.push({
                            Country: country.Country, 
                            City: city[0],
                            Temperature: temp
                        })
                    }
                    return true;
                })
            }
        }
        setCurrentGameData(currentGameData)
    }

	return (
		<DataContext.Provider value={{generateNewGame, currentGameData}}>
			{props.children}
		</DataContext.Provider>
	);
};