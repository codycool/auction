module.exports = function(sequelize, DataTypes) {
  var Follow = sequelize.define('Follow', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    isCancel: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    followTime: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });

  Follow.associate = function (models) {
    
  };


  return Follow;
};