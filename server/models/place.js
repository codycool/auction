module.exports = function(sequelize, DataTypes) {
  var Place = sequelize.define('Place', {
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

  Place.associate = function (models) {
    
  };


  return Place;
};