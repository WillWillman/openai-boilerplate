export const addJsonBodyToRes = (req, res, next) => {
  const json = res.json.bind(res);

  res.json = (body) => {
    res.body = body;
    json(body);
  };

  next();
};
