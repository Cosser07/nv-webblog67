import axios from 'axios'
import store from '../store'


export default () => {
    return axios.create({
        baseURL: 'http://localhost:8081/', // ตรวจสอบให้แน่ใจว่าที่อยู่ URL ถูกต้อง
        headers: {
            Authorization: `Bearer ${store.state.token}`
        }
    })
}
