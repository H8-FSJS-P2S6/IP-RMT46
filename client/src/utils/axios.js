import axios from "axios"

const instance = axios.create({
    baseURL: "https://poke-world-desu.wadesuuu.xyz/"
    // baseURL: 'http://localhost:3000/',
})

export default instance;