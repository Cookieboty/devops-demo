/*
 * @Author: Cookie
 * @Date: 2019-07-17 14:59:18
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-16 11:55:35
 * @Description: request 模块
 */

const crypto = require("crypto");

import { DING_SEND_URL, DING_SECRET } from '../../config/default.config'


export default (app) => {
  return {
    /**
     * @author: Cookie
     * @description: 加签发送消息
     */
    async send(content) {
      const timestamp = Date.now();
      const str = crypto
        .createHmac("sha256", DING_SECRET)
        .update(timestamp + "\n" + DING_SECRET)
        .digest()
        .toString("base64", "UTF-8");

      try {
        const { res, data } = await app.curl(
          `${DING_SEND_URL}&timestamp=${timestamp}&sign=${encodeURIComponent(str)}`,
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            method: "POST",
            data: JSON.stringify(content),
          }
        );
        return res;
      } catch (error) {
        return error;
      }
    },
    text({ content = {}, at }) {
      at = at || {};
      this.send({
        msgtype: "text",
        text: {
          content,
        },
        at,
      });
    },
  };
};
