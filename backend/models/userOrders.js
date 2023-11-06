const userOrdersModel = (sequelize, DataTypes) => {
  const UserOrders = sequelize.define('user_orders', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },

    totalAmount: {
      type: DataTypes.DECIMAL,
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  return UserOrders;
};

export default userOrdersModel;
