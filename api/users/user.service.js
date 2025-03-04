const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO users (store_name, email, password) VALUES (?, ?, ?)`,
            [data.store_name, data.email, data.password],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },
    
    getUserByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results[0]);
            }
        );
    },

    getUsers: (callBack) => {
        pool.query(
            `SELECT store_name, email FROM users`,
            [],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    }
};
