const cartItemsModel = (sequelize, DataTypes) => {
  const CartItems = sequelize.define('cart_items', {
    userOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  return CartItems;
};

export default cartItemsModel;
