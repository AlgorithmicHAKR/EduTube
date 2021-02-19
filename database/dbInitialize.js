const Sequelize=require('sequelize')
const db=new Sequelize(
     'edutubedb','hakr','1234',{host:'localhost',dialect:'mysql'}
)
exports=module.exports={db};
