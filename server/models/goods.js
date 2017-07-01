module.exports = function(sequelize, DataTypes) {
  var Goods = sequelize.define('Goods', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    isDiscontinued: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    discount: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    lauchedTime: {
      allowNull: false,
      type: DataTypes.DATE
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING
    }
  });

  Goods.associate = function (models) {
    
  };


  return Goods;
};