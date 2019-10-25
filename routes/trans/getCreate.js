
module.exports = (req, res) => {
  res.render("trans/create", {
    edit: false,
    action_url: "/trans/create",
    moment: require('moment')
  });
};
