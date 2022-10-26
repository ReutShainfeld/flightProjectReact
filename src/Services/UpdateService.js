import axios from 'axios'
export default new class UpdateService {

  async UpdateBack(url, id, object) {
    const response = await axios.patch(url + id, object)
    return response.data
  }
}