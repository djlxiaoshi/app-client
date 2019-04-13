/*
*  项目配置文件
* */

const development = {
  SERVER_ADDRESS: 'http://localhost:3000' // 开发环境后端接口地址
};

const production = {
  SERVER_ADDRESS: 'http://localhost:3000' // 正式环境后端接口地址
};

export default process.env.NODE_ENV === 'production' ? production : development;
