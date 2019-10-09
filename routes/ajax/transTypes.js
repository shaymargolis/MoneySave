
module.exports = (req, res) => {
  var query = req.params.query;
  res.status(200).json([{name: 'פיצה', color: 'success'},{name: 'עט', color: 'success'}]);
};
