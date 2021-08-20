import axios from "axios";

const baseUrl = "http://localhost:3001/data";



const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const addNew = (newContact) => {
    const request = axios.post(baseUrl, newContact);
    return request.then((response) => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data)
}

const phoneServices = { 
    getAll,
    addNew,
    deleteContact
   };

export default  phoneServices;
