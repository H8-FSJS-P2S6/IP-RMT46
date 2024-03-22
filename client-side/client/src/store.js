import { configureStore } from '@reduxjs/toolkit'
import prayerTimeReducer from './prayerTime/prayerTimeSlice'

export default configureStore({
  reducer: {
    prayerTime: prayerTimeReducer
  },
})