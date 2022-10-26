import axios from 'axios'
export default new class PostService {

  async AddToBack(url, object) {
    const response = await axios.post(url, object)
    return response.data
  }
}