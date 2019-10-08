class TransController {
  static async register(req, res) {
    try {
      let payload = await AccountStore.register(req);
      res.send(payload);
    } catch(exception) {
      res.status(500).send(exception)
    }
  }


  static async getAll(req, res) {
    try {
      let payload = await AccountStore.getAllUsers(req);
      res.send(payload);
    } catch(exception) {
      res.status(500).send(exception)
    }
  }
}

module.exports = TransController;
