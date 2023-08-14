const validateBody = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

const validateParams = (schema) => (req, res, next) => {
  console.log('validateParams type ', typeof req.params);
  console.log('validateParams ', req.params);
  try {
    schema.parse(req.params);
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

export { validateBody, validateParams };
