const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize')

const CatTipoCliente = sequelize.define('cat_cmv_tipo_cliente', {
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre_cuenta: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = CatTipoCliente;