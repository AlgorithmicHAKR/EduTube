const { Data } = require('phaser');
const { DATE } = require('sequelize/types');
const {db}=require('./dbInitialize');
const Sequelize=reequire('Sequelize');
const DataTypes=Sequelize.DataTypes;

const subscribes=db.define('subscribes',{
    username:DataTypes.STRING(40),
    channelId:DataTypes.STRING(40),
})
exports=module.exports={subsribes};