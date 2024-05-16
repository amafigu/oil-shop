import bcrypt from 'bcrypt';

const saltRounds = 10;
export const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, saltRounds);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
