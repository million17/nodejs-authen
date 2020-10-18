"use strict";

module.exports = {
    up: (queryInterface,) => {
        return queryInterface.createTable("users", {
            id: {
                allowNull: false,
            }
        })
    }
}
