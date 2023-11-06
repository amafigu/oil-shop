const cartItemsModel = (sequelize, DataTypes) => {
  const CartItems = sequelize.define('cart_items', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_orders',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
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
