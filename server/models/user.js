module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    hashPassword: {
      allowNull: true,
      type: DataTypes.STRING
    },
    nickName: {
      allowNull: true,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING
    },
    birthday: {
      allowNull: true,
      type: DataTypes.DATEONIY
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
    isSocial:
    {
      allowNull:false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    facebook:{
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
    User.hasMany(models.Goods);
    User.hasMany(models.Transaction);
    User.hasMany(models.Follow);
  };


  return User;
};