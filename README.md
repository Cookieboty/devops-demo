<!--
 * @Author: Cookie
 * @Date: 2021-05-09 14:46:32
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-16 16:54:49
 * @Description: 
-->

## QuickStart

[基于 Node 的 DevOps 实战](https://juejin.cn/book/6948353204648148995)

根据教程安装项目环境 

新建数据库 devops_dev

```bash
$ yarn
$ npx sequelize db:migrate // 执行数据库变更
```

### Development

```bash
$ yarn dev
$ open http://localhost:7001/
```
### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
