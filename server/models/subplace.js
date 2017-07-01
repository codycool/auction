module.exports = function(sequelize, DataTypes) {
  var Subplace = sequelize.define('Subplace', {
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

  Subplace.associate = function (models) {
    
  };


  return Subplace;
};