const productCategoryModel = (sequelize, DataTypes) => {
  const productCategory = sequelize.define('product_categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return productCategory;
};

export default productCategoryModel;
