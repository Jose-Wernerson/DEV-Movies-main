 import axios from 'axios'

 const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    params:{
        api_key: '30cdd689965b330e80c42fbe7fb48af6',
        language:'pt-BR',
        page: 1
    }
 })

 export default api