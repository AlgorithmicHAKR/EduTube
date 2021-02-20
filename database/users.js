const {db}=require('./dbInitialize');
const subscribes = require('./subscribes');
const Sequelize=reequire('Sequelize');
const DataTypes=Sequelize.DataTypes;
const users=Sequelize.define('users',{
    gmailId:{type:DataTypes.STRING(40)},
    firstName:{
        type:DataTypes.STRING(40)
    },
    lastName:{
        type:DataTypes.STRING(40)
    }
})
users.hasMany(subscribes,{foreignKey:'gmailId'})
subscribes.belongsTo(users)
exports=module.exports={
    users
}