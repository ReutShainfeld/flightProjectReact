import axios from 'axios';

export default new class DeleteService {

  async DeleteById(url, id) {
    const response = await axios.delete(url + id)
    return response.data
  }
}