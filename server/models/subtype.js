module.exports = function(sequelize, DataTypes) {
  var Subtype = sequelize.define('Subtype', {
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

  Subtype.associate = function (models) {
    Subtype.hasMany(models.Type);
  };


  return Subtype;
};