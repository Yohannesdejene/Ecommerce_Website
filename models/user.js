
 

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

models.user.belongsToMany(models.product,{through:models.purchased})


    }
  }
  user.init({
    Fname:{
     type: DataTypes.STRING,
     allowNull:false,
    },
    Lname: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    email:{
    type: DataTypes.STRING,
    allowNull:false,
    primaryKey:true,
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,


    },
    address:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    profilePhoto:{
      type:DataTypes.TEXT('long'),
      allowNull:true,
      
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },
userType:{
type:DataTypes.STRING,
defaultValue: "user",

},

  


  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};