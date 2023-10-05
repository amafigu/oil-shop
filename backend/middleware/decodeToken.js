import jwt from 'jsonwebtoken';

export const decodeJWT = (req, res, next) => {
  console.log('decodeJWT req.cookies ', req.cookies);
  console.log('decodeJWT req.cookies.token ', req.cookies.token);
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
