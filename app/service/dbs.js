/**
 * 数据库模块service类
 * Created by auto tool.
 */

'use strict';

var Sequelize = require('sequelize');
var Redis = require('ioredis');

var appraiser = require(config.serverRoot + "/model/Appraiser");
var brand = require(config.serverRoot + "/model/Brand");
var brandseries = require(config.serverRoot + "/model/BrandSeries");
var car = require(config.serverRoot + "/model/Car");
var carcolor = require(config.serverRoot + "/model/CarColor");
var carengine = require(config.serverRoot + "/model/CarEngine");
var carimg = require(config.serverRoot + "/model/CarImg");
var carmodel = require(config.serverRoot + "/model/CarModel");
var cartype = require(config.serverRoot + "/model/CarType");
var city = require(config.serverRoot + "/model/City");
var tags = require(config.serverRoot + "/model/Tags");
var userinfo = require(config.serverRoot + "/model/UserInfo");


// mysql 连接
function loadMysql() {
  return new Sequelize(config.DB_dbname, config.DB_username, config.DB_password, {
    host: config.DB_host,
    port: config.DB_port,
    dialect: config.DB_dialect,

    pool: {
      max: config.DB_maxpool,
      min: config.DB_minpool,
      idle: 10000
    }
  });
}

// redis 连接
function loadRedis() {
  return new Redis(config.RD_port, config.RD_host);
}

// 加载操作
// redis连接
exports.redis = loadRedis();

// 数据库连接以及连接池
var sequelize = loadMysql();
exports.sequelize = sequelize;

// model映射
exports.Appraiser = appraiser.Appraiser(sequelize);
exports.Brand = brand.Brand(sequelize);
exports.BrandSeries = brandseries.BrandSeries(sequelize);
exports.Car = car.Car(sequelize);
exports.CarColor = carcolor.CarColor(sequelize);
exports.CarEngine = carengine.CarEngine(sequelize);
exports.CarImg = carimg.CarImg(sequelize);
exports.CarModel = carmodel.CarModel(sequelize);
exports.CarType = cartype.CarType(sequelize);
exports.City = city.City(sequelize);
exports.Tags = tags.Tags(sequelize);
exports.UserInfo = userinfo.UserInfo(sequelize);


// 关联关系
exports.Brand.hasMany(exports.BrandSeries, {foreignKey: 'brandId', constraints: false});
exports.BrandSeries.belongsTo(exports.Brand, {foreignKey: 'brandId', constraints: false});

exports.UserInfo.hasMany(exports.Car, {foreignKey: 'sellId', constraints: false});
exports.Car.belongsTo(exports.UserInfo, {foreignKey: 'sellId', constraints: false});

exports.Appraiser.hasMany(exports.Car, {foreignKey: 'appraiserId', constraints: false});
exports.Car.belongsTo(exports.Appraiser, {foreignKey: 'appraiserId', constraints: false});

exports.CarModel.hasMany(exports.Car, {foreignKey: 'modelId', constraints: false});
exports.Car.belongsTo(exports.CarModel, {foreignKey: 'modelId', constraints: false});

exports.CarColor.hasMany(exports.Car, {foreignKey: 'color', constraints: false});
exports.Car.belongsTo(exports.CarColor, {foreignKey: 'color', constraints: false});

exports.Car.hasMany(exports.CarImg, {foreignKey: 'carId', constraints: false});
exports.CarImg.belongsTo(exports.Car, {foreignKey: 'carId', constraints: false});

exports.BrandSeries.hasMany(exports.CarModel, {foreignKey: 'brandSeriesId', constraints: false});
exports.CarModel.belongsTo(exports.BrandSeries, {foreignKey: 'brandSeriesId', constraints: false});

exports.CarEngine.hasMany(exports.CarModel, {foreignKey: 'engineId', constraints: false});
exports.CarModel.belongsTo(exports.CarEngine, {foreignKey: 'engineId', constraints: false});
