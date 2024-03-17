import axios from "axios"

export const localRequest = axios.create({
    // baseURL: "https://career-portal-api.dhirenkirpalani.com/",
    baseURL: "http://localhost:3000/"
})