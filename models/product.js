'use strict';
const {
  Model
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
    Pname:{   
      type:DataTypes.STRING,
    },
   Ppicture:{
    type:DataTypes.STRING,
   }

  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};