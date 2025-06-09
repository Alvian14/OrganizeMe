import { API } from "../_api"

export const getTasks = async () => {
    const {data} = await API.get('/tasks')
    return data
}

