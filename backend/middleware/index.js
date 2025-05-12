const admin = require('../config/firebaseConfig')

const decodeToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = await admin.auth().verifyIdToken(token);
        req.body.email = decoded.email
        req.body.firebaseId = decoded.uid
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = decodeToken;