import axios from 'axios'
export default new class GetService {

  async GetAll(url) {
    const response = await axios.get(url)
    return response.data
  }

  async GetById(url, id) {
    const response = await axios.get(url + id)
    return response.data
  }

  async GetByParameter(url, parameters) {
    const response = await axios.get(url, parameters)
    return response.data
  }


}