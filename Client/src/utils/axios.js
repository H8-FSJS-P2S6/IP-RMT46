import axios from "axios";

const serverRequest = axios.create({
    baseURL: "https://medshop.carloshakim.online/",
})

export default serverRequest