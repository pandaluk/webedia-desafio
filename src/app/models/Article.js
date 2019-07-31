import Sequelize, { Model } from 'sequelize';

class Article extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        subtitle: Sequelize.STRING,
        text: Sequelize.STRING,
        permalink: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'userarticles',
      as: 'users',
      foreignKey: 'article_id',
    });
  }
}

export default Article;
