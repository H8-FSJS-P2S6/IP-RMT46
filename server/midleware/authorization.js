const { Game, Cart, User } = require("../models");
// const user = require("../models/user");

const authorizationGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const dataGame = await Game.findByPk(id);

    // console.log(dataGame.Userid);
    if (!dataGame) {
      throw { name: "NotFound", msg: `game not found` };
    }

    // console.log(userId);
    if (dataGame.UserId !== userId) {
      throw {
        name: "Forbidden",
        msg: `You're not authorized to delete this game`,
      };
    }
    req.game = dataGame;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authorizationGame;
