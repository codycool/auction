module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    hashPassword: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nickName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    isEmailActived: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verifyEmailToken: {
      allowNull: true,
      type: DataTypes.STRING
    },
    evaluation: {
      defaultValue: 0,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    avator: {
      allowNull: true,
      type: DataTypes.STRING
    }
  });

  User.associate = function (models) {
    
  };


  return User;
};