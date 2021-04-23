import { Service } from 'egg';

export default class User extends Service {

  public async getUserToken({ username, password }) {
    const { data: token } = await this.ctx.helper.utils.http.post(
      '/oauth/token',
      {
        grant_type: 'password',
        username,
        password,
      },
    );

    if (token && token.access_token) {
      return token;
    }
    return false;
  }

  public async getTokenByApplications({ code }) {
    const { data: token } = await this.ctx.helper.utils.http.post(
      '/oauth/token',
      {
        grant_type: 'authorization_code',
        client_id: '606e33d507674f99d1ac16877766eca0db448c26a6fdddf5b76e850dac0d2421',
        client_secret: '21346c11a255c64b25fd4b75ecbf80d0e702a992dc616acd741608905d61892f',
        code,
        redirect_uri: 'http://127.0.0.1:7001/user/getTokenByApp',
      },
    );

    if (token && token.access_token) {
      return token;
    }
    return false;
  }
}
