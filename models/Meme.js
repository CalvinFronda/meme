module.exports = function (sequelize, DataTypes) {
  var Meme = sequelize.define("Meme", {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      defaultValue: "Anonymous"
    },
    description: {
      type: DataTypes.TEXT
    },
    author: {
      type: DataTypes.STRING
    },
    example: {
      type: DataTypes.STRING
    },
    likesNum: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dislikesNum: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },


  });
  return Meme;
};
