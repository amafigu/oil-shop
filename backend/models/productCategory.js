const productCategoryModel = (sequelize, DataTypes) => {
  const productCategory = sequelize.define('product_categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  });

  return productCategory;
};

export default productCategoryModel;
