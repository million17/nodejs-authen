'use strict';

const Sequelize = require("sequelize");
const sequelize = require('../../config/db').sequelize;

const Post = sequelize.define("post", {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    poster: Sequelize.INTEGER,
}, {
    tableName: "post",
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
        {
            unique: true,
            fields: ["id"],
        }
    ],
    charset: 'urf8',
    collate: 'utf8_unicode_ci',
})

module.exports = {
    Post,
}