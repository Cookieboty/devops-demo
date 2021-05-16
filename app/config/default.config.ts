/*
 * @Author: Cookie
 * @Date: 2019-07-17 14:29:27
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-16 16:21:25
 * @Description: 基础参数配置
 */


/**
 * @description: 这里的配置内容需要自己替换成本地的
 */

// 反向代理git url
const GIT_URL = 'http://192.168.160.88:8888/';

// app 授权客户端id 与 秘钥
const CLIENT_ID = '606e33d507674f99d1ac16877766eca0db448c26a6fdddf5b76e850dac0d2421';
const CLIENT_SECRET = '21346c11a255c64b25fd4b75ecbf80d0e702a992dc616acd741608905d61892f';

// 钉钉机器人


const DING_SECRET =
  "SECc477ca6197e14dd888662eb22a33e1b38eb786130d154ed692d855b6f48e132e";

const DING_SEND_URL =
  "https://oapi.dingtalk.com/robot/send?access_token=5a576c01fdee6bf137a3e3826a3b768ecfc913000545fd67926e7228c57dabe8";

// 邮箱配置
const MAIL_CONFIG = {
  user_email: '',
  service: '',
  port: '',
  auth_code: ''
}


export { GIT_URL, CLIENT_ID, CLIENT_SECRET, DING_SEND_URL, DING_SECRET, MAIL_CONFIG };
