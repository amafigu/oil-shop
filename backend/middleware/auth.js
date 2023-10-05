import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      console.log(
        'authenticateToken.js process.env.JWT_KEY',
        process.env.JWT_KEY
      );

      req.user = user;

      console.log('jwt.verify req.user = user;', user);
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
