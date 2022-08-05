'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
models.product.belongsTo(models.category);
models.product.belongsToMany(models.user, {through:models.purchased})



    }
  }
  product.init({
   name:{   
      type:DataTypes.STRING,
    },
   picture:{
    type:DataTypes.STRING,
   },
   gender:{
    type:DataTypes.STRING,
   },
   oldprice:{
    type:DataTypes.DOUBLE,
   },
   newprice:{
    type:DataTypes.DOUBLE,
   },
   description:{
    type:DataTypes.STRING,
   },



  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};