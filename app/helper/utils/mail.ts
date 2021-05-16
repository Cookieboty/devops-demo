/*
 * @Author: Cookie
 * @Date: 2019-08-19 10:26:57
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-16 11:36:40
 * @Description:
 */
import { MAIL_CONFIG } from "../../config/default.config";

const marked = require("marked"); // marked 转换
const nodemailer = require("nodemailer"); // 发送邮件
const nunjucks = require("nunjucks"); // 模板引擎
const path = require("path");

// 邮箱配置初始化
const transporter = nodemailer.createTransport({
  host: MAIL_CONFIG.service,
  secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
  port: MAIL_CONFIG.port,
  auth: {
    user: MAIL_CONFIG.user_email, // 账号
    pass: MAIL_CONFIG.auth_code, // 授权码
  },
});

const htmlModel = (params) => {
  const { storyMail, exitInfo, summitUser, iterationMail } = params
  const html = nunjucks.render(path.join(__dirname, "./emailTpl/email.njk"), {
    storyMail,
    exitInfo,
    summitUser,
    iterationMail,
  });
  return html;
};

const htmlPassModel = ({ storyMail, testInfo, testUser, iterationMail }) => {
  const html = nunjucks.render(path.join(__dirname, "./emailTpl/pass.njk"), {
    storyMail,
    testInfo,
    testUser,
    iterationMail,
  });
  return html;
};

const htmlRepulseModel = ({
  storyMail,
  repulseUser,
  repulseInfo,
  iterationMail,
}) => {
  const html = nunjucks.render(path.join(__dirname, "./emailTpl/repulse.njk"), {
    storyMail,
    repulseUser,
    repulseInfo,
    iterationMail,
  });
  return html;
};

/*
 * toEmail: String 接收者,可以同时发送多个,以逗号隔开
 * subject: String 标题
 * cc: String 抄送
 * text: String 文本
 * html: Object titleList表头 conterFontList内容
 * attachments: any 附件
 * [
 *  {
     filename: 'img1.png',            // 改成你的附件名
     path: 'public/images/img1.png',  // 改成你的附件路径
     cid : '00000001'                 // cid可被邮件使用
    }
 * ]
 */

interface mailInterface {
  toEmail: string;
  subject: string;
  cc?: string;
  text?: string;
  html?: any;
  attachments?: any;
  storyMail?: any;
  exitInfo?: any;
  summitUser?: String;
  iterationMail?: any;
}

const sendMail = async (mailOptions: mailInterface) => {
  const {
    toEmail,
    subject,
    cc,
    text,
    attachments,
    storyMail,
    exitInfo,
    summitUser,
    iterationMail,
  } = mailOptions;
  Object.keys(exitInfo).forEach((key) => {
    exitInfo[key] = marked(exitInfo[key]);
  });
  const html = htmlModel({ storyMail, exitInfo, summitUser, iterationMail });
  const mailOpts = {
    from: MAIL_CONFIG.user_email, // 发送者,与上面的user一致
    to: toEmail,
    subject,
    cc,
    text,
    html,
    attachments,
  };
  try {
    transporter.sendMail(mailOpts);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const sendPassMail = async ({
  toEmail,
  subject,
  cc,
  text,
  attachments,
  storyMail,
  testInfo,
  testUser,
  iterationMail,
}) => {
  testInfo = marked(testInfo);
  const html = htmlPassModel({ storyMail, testInfo, testUser, iterationMail });
  const mailOpts = {
    from: MAIL_CONFIG.user_email, // 发送者,与上面的user一致
    to: toEmail,
    subject,
    cc,
    text,
    html,
    attachments,
  };
  try {
    transporter.sendMail(mailOpts);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const sendRepulseMail = async ({
  toEmail,
  subject,
  cc,
  text,
  attachments,
  storyMail,
  repulseUser,
  repulseInfo,
  iterationMail,
}) => {
  repulseInfo = marked(repulseInfo);
  const html = htmlRepulseModel({
    storyMail,
    repulseUser,
    repulseInfo,
    iterationMail,
  });
  const mailOpts = {
    from: MAIL_CONFIG.user_email, // 发送者,与上面的user一致
    to: toEmail,
    subject,
    cc,
    text,
    html,
    attachments,
  };
  try {
    transporter.sendMail(mailOpts);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default { sendMail, sendPassMail, sendRepulseMail };
