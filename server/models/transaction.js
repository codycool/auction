module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
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
    payment: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    isShowl: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    transactionTime: {
      allowNull: false,
      type: DataTypes.DATE
    },
    paymentTime: {
      allowNull: false,
      type: DataTypes.DATE
    },
    state: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['paid', 'expired', 'Unpaid', 'cancel']
    }
  });

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.User);
    Transaction.belongsTo(models.Goods);
  };


  return Transaction;
};