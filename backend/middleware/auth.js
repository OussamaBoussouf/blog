const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_KEY = process.env.ACCESSTOKEN_PRIVATE_KEY;

exports.authenticateToken = async (req, res, next) => {
  let accessToken = req.header('Authorization');

  if (!accessToken) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  accessToken = accessToken.split(" ")[1];

  jwt.verify(accessToken, ACCESS_TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid Access Token', type: 'accessTokenError'});
    }
    req.user = user;
    next();
  });
};
