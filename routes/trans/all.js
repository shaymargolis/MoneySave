const data = require('../../test_data/data.json');

module.exports = (req, res) => {
  const models = data.trans;

  res.status(200).json( models );
};
