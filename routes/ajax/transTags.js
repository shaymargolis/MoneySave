
module.exports = (req, res) => {
  var query = req.params.query;
  res.status(200).json([{name: 'משרדי', color: 'success'},{name: 'אוכל', color: 'success'}]);
};
