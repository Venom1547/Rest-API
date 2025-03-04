const { create, getUserByEmail, getUsers } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: 0, message: "Database error" });
            }
            return res.status(200).json({ success: 1, data: results });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, user) => {
            if (err) return res.status(500).json({ success: 0, message: "Database error" });
            if (!user) return res.status(401).json({ success: 0, message: "Invalid email or password" });

            const isPasswordMatch = compareSync(body.password, user.password);
            if (!isPasswordMatch) return res.status(401).json({ success: 0, message: "Invalid email or password" });

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "default_secret_key", { expiresIn: "1h" });

            return res.status(200).json({ success: 1, message: "Login successful", token });
        });
    },

    getAllUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) return res.status(500).json({ success: 0, message: "Database error" });
            return res.json({ success: 1, data: results });
        });
    }
};
