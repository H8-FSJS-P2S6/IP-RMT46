import axios from 'axios'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPrayerTime } from '../prayerTime/prayerTimeSlice'

export default function PrayerTime() {
    const [time, setTime] = useState({})
    const prayerTime = useSelector((state) => state.prayerTimes.list)
    const dispatch = useDispatch()
    

    const fetchData = async () => {
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

            console.log(response.data.data.timings)

            setTime(response.data.data.timings)
        } catch (error) {
            console.log(error)
        }
    }

    // Mendapatkan waktu sekarang
    let currentTime = new Date();

    let maghribTime = new Date();
    maghribTime.setHours(18); // Jam
    maghribTime.setMinutes(5); // Menit

    let timeDiff = maghribTime - currentTime;

    let hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    let minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    // console.log(new Date().toLocaleTimeString(['id-ID'], { hour: "2-digit", minute: "2-digit" }))
    console.log(time.Maghrib)

    // console.log(time.Maghrib - new Date().toLocaleTimeString(['id-ID'], { hour: "2-digit", minute: "2-digit" }))

    useEffect(() => {
        fetchData()
        dispatch(getPrayerTime())
    }, [])

    return (
        <>
            <>
                <div className='d-flex justify-content-center'>
                {/* Button trigger modal */}
                <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Check prayer time this day
                </button>
                </div>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Prayer time for {new Date().toLocaleDateString()}
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <table className='table table-borderless table-info'>
                                    <thead>
                                        <tr>
                                            <th>Shubh</th>
                                            <th>Dhuhr</th>
                                            <th>Asr</th>
                                            <th>Marghrib</th>
                                            <th>Isha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{time.Fajr}</td>
                                            <td>{time.Dhuhr}</td>
                                            <td>{time.Asr}</td>
                                            <td>{time.Maghrib}</td>
                                            <td>{time.Isha}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                There are {hoursLeft} hours {minutesLeft} minutes left to break the fast</div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}