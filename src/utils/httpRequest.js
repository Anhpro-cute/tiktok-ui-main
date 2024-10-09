import axios from 'axios'; //Tìm hiểu và sử dụng thư viện Axios

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;

// Các môi trường
// Local / development
// Test / staging
// UAT
// Producion
