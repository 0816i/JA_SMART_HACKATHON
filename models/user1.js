module.exports = (sequelize, DataTypes) => {
  const user1 = sequelize.define('User1', {
    id: { 
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    pw: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    school: {
        type: DataTypes.STRING(100)
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey:true
    },
    area: {
        type: DataTypes.STRING(100)
    },
    subject:{
      type: DataTypes.STRING(100)
    },
    detailsubject:{
      type:DataTypes.STRING(100)
    },
    permission:{
      type: DataTypes.ENUM('T', 'M', 'S'),
      allowNull:false
    },
    project:{
      type:DataTypes.STRING(100)
    }
  }, {
      underscored: true,
      freezeTableName: true,
      tableName:'user1'
  });
  user1.associate = function(models) {
    // associations can be defined here
  };
  return user1;
};