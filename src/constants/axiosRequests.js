import axios from 'axios';

const client = axios.create({
    baseURL: "https://uf7nk7u7ji.execute-api.us-east-1.amazonaws.com/Prod"
  });


export default async function getMethod(path, data){

        const response = await client.get(`${path}`, {
          params: {
            data: data,
          }
        });
        // console.log("response");
        // console.log(response);
        return response.data;
}

export async function postMethod(path, data){

    const response = await client.post(`${path}`, data);
    console.log(response.data);
    return response.data;
}
