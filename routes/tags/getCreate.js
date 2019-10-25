
module.exports = (req, res) => {
  res.render("tags/create", {
    action_url: "/tags/create",
    edit: false
  });
};
