import axios from 'axios'

export class AppSetting {
  async getUrl() {
    const { data } = await axios.get('')
    return { data }
  }
  public env = this.getUrl()
    .then(res => (res.data ? res.data : process.env.NEXT_PUBLIC_UC_API))
    .catch(err => console.log(err))
}
