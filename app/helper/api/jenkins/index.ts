/*
 * @Author: Cookie
 * @Date: 2019-09-12 15:47:15
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-19 20:28:42
 * @Description:
 */

import * as jenkins from "jenkins";

/**
 * Jenkins连接
 * @param type
 */
const getJenkins = function (
  type: "h5" | "node" | "nodeProduct" | "android" | "java"
) {
  const jenkinsConfig = {
    h5: {
      baseUrl: "http://cookieboty:qq123456@jenkins.cookieboty.com/",
      crumbIssuer: true,
    },
  };
  return jenkins(jenkinsConfig[type]);
};

/**
 * @author: Cookie
 * @description: 触发jenkins流水线
 */
const buildJenkins = async ({ type, job, params }) => {
  const jenkinsCallback: any = await new Promise((resolve) => {
    getJenkins(type).job.build(
      { name: job, parameters: params },
      (err: any, data: any) => {
        if (err) {
          console.log("err: ", err);
          throw err;
        }
        resolve({ queueId: data });
      }
    );
  });
  return { data: jenkinsCallback };
};

/**
 * @author: Cookie
 * @description: 获取当前节点信息
 */
const getQueuedInfo = async ({ type, queueId }) => {
  const jenkinsCallback: any = await new Promise((resolve) => {
    getJenkins(type).queue.item(queueId, (err: any, data: any) => {
      if (err) {
        console.log("err---->", err);
        throw err;
      }
      resolve(data);
    });
  });
  return { data: jenkinsCallback };
};

/**
 * @author: Cookie
 * @description: 获取当前构建信息
 */
const getJenkinsInfo = async ({ type, job, buildNumber }) => {
  console.log(type, job, buildNumber);
  const jenkinsCallback: any = await new Promise((resolve) => {
    getJenkins(type).build.get(job, buildNumber, (err: any, data: any) => {
      console.log("data: ", data);
      console.log("err: ", err);
      if (err) {
        console.log("err---->", err);
        throw err;
      }
      resolve(data);
    });
  });
  const { statusCode } = jenkinsCallback;
  if (jenkinsCallback && statusCode !== 404) {
    return { data: jenkinsCallback };
  } else {
    return { data: jenkinsCallback };
  }
};

/**
 * @author: Cookie
 * @description: 获取jenkins打印
 */
const getJenkinsConsole = async ({ type, job, buildId }) => {
  const jenkinsCallback: any = await new Promise((resolve) => {
    getJenkins(type).build.log(job, buildId, (err: any, data: any) => {
      if (err) {
        return console.log("err---->", err);
      }
      resolve(data);
    });
  });
  return { data: jenkinsCallback };
};

export default {
  buildJenkins,
  getQueuedInfo,
  getJenkinsInfo,
  getJenkinsConsole,
};
