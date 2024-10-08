import axios from "axios"
import { baseUrl } from "./config"

export const getCoarse = (query:string) => {
    if(query) {
        return;
    }

    axios.get(`${baseUrl}/coarses/${query}`).then(response => {
        return response.data ? response : null;
    })
    .catch(error =>{
        console.log(error)
    });
}
