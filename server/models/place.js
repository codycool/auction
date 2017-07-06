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
    Place.hasMany(models.Goods);
    Place.belongsTo(models.Subplace);
  };


  return Place;
};