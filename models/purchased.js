'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchased extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
   models.purchased.belongsTo(models.user);
   models.purchased.belongsTo(models.product);


    }
  }
  purchased.init({
    time:{

     type:DataTypes.DATEONLY,
    },
    
  }, {
    sequelize,
    modelName: 'purchased',
  });
  return purchased;
};