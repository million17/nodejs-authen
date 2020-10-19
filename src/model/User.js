"use strict";
import {ROLE} from '../constant/constant'

const Sequelize = require('sequelize');
const sequelize = require('../../config/db');

export const User = sequelize.define("user", {
        email: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        role: {
            type: Sequelize.ENUM(ROLE.ROLE_ADMIN, ROLE.ROLE_USER),
        },
    }, {
    tableName: 'user',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            unique: true,
            fields: ["id"],
        }
    ],
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    }
);