module.exports = function(sequelize, DataTypes) {
  var Type = sequelize.define('Type', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });

  Type.associate = function (models) {
    
  };


  return Type;
};