
module.exports = (req, res) => {
  res.render("periodic/create", {
    edit: false,
    moment: require('moment'),
    action_url: "/periodic/create"
  });
};
