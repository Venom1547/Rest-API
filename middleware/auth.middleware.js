const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) return res.status(403).json({ success: 0, message: "No token provided" });

    token = token.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ success: 0, message: "Invalid token" });
        req.user = decoded;
        next();
    });
};
