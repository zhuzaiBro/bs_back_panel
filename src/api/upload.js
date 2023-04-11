import request from '@/utils/request'
import axios from 'axios';

export function upload(form) {

    return new Promise((reslove, reject) => {
        axios.post("/dev-api/api/upload", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => reslove(res.data))
            .catch((error) => reject(error));
    })


}