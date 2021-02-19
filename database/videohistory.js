const {db}=require('./dbInitialize');
const Sequelize=reequire('Sequelize');
const DataTypes=Sequelize.DataTypes;
const videohistory=db.define('videohistory',{
    username:DataTypes.STRING(40),
    videoId:DataTypes.STRING(40)
})
exports=module.exports={
    videohistory
}