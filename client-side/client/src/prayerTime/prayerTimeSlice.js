import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    list: {}
}

export const prayerTimeSlice = createSlice({
    name: 'prayerTimes',
    initialState,
    reducers: {
        setPrayerTimes: (state, action) => {
            state.list = action.payload
        }
    }
})

export const { setPrayerTimes } = prayerTimeSlice.actions

export const prayerTime = (getPrayerTime) => {
    return async () => {
        try {
            const options = {
                method: 'GET',
                url: `https://prayer-times11.p.rapidapi.com/timingsByCity/${new Date().toLocaleDateString()}`,
                params: {
                    method: '5',
                    city: 'Jakarta',
                    country: 'Indonesia'
                },
                headers: {
                    Accept: 'application/json',
                    'X-RapidAPI-Key': '09c85fe558mshfde7ff537933352p18207djsn874742403006',
                    'X-RapidAPI-Host': 'prayer-times11.p.rapidapi.com'
                }
            };
            const response = await axios.request(options)
            getPrayerTime(response.data.data.timings)
        } catch (error) {
            console.log(error)
        }
    }
}