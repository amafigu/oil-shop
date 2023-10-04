import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('auth authHeader ', authHeader);

  console.log('auth req.user ', req.user);

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      console.log('auth user ', req.user);

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
