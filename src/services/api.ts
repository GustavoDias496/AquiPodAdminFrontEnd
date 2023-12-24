import axios from "axios"

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyMzQ2Njc3fQ.JVmkjlE70QyFAZ10NgPV586yCtHsJBSDFfEWLBGGsIQ'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers:{
        'Authorization': `${token}`
    }
});

export default api;