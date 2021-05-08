import React, { useState, useEffect, createContext } from 'react';

import { API } from '../services';

export const DataContext = createContext();

export const DataProvider = (props) => {
	const api 								        = new API();
    const [citiesList, setCitiesList]               = useState(null)
    const [currentGameData, setCurrentGameData]     = useState(null)
    const [settings, setSettings]                   = useState({Units: false})
    const [score, setScore]                         = useState(0)
    const [history, setHistory]                     = useState([])
    const [gameStatus, setGameStatus]               = useState(null)

    const generateCitiesList = async () => {
        if (citiesList) {
            return citiesList
        } else if (citiesList === null) {
            const apiData = await api.getCities();
            if (apiData) {
                setCitiesList(apiData)
                return apiData
            } else {
                setCitiesList(false)
            }
        }
        return false
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
        let dataList = await generateCitiesList()
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
                            ID: i,
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
        setGameStatus(currentGameData.length > 0 ? 0 : false)
    }

    const updateSetingsUnits = (units) => {
        let newSettings = {...settings}
        newSettings.Units = units
        api.set("Settings", JSON.stringify(newSettings))
        setSettings(newSettings)
    }

    const convertUnits = (units) => {
        return parseInt((units * 1.8000) + 32.00)
    }

    const submitAnswer = (id) => {
        const winner = currentGameData.reduce((prev, current) => (prev.Temperature > current.Temperature) ? prev : current)
        if (winner) {
            console.log(winner)
            console.log(id)
            let result = winner.ID === id ? true : false
            let newHistoryEntry = [...currentGameData]
            newHistoryEntry.push({
                ID: 2,
                Result: result
            })
            let newHistory = [...history]
            newHistory.push(newHistoryEntry)
            setHistory(newHistory)
            api.set("History", JSON.stringify(newHistory))
            if (result) {
                setScore(score + 1)
                api.set("Score", score + 1)
            }
            setGameStatus(result ? 1 : 2)
        } else {

        }
    }

    const processSettings = () => {
        if (api.exists("Settings")) {
            let set = api.get("Settings")
            setSettings(JSON.parse(set))
        } else {
            api.set("Settings", JSON.stringify(settings))
        }
    }

    const processScore = () => {
        if (api.exists("Score")) {
            let set = api.get("Score")
            setScore(parseInt(set))
        } else {
            api.set("Score", 0)
        }
    }

    const processHistory = () => {
        if (api.exists("History")) {
            let set = api.get("History")
            setHistory(JSON.parse(set))
        } else {
            api.set("History", JSON.stringify(history))
        }
    }

    const initial = () => {
        processSettings()
        processScore()
        processHistory()
        return () => {}
    }

    useEffect(initial, [])

	return (
		<DataContext.Provider value={{generateNewGame, currentGameData, gameStatus, settings, updateSetingsUnits, convertUnits, score, history, submitAnswer}}>
			{props.children}
		</DataContext.Provider>
	);
};