
const express = require('express');
const adminRoute = express.Router();
const controller = require('../controllers/admin');
const gameController = require('../controllers/game');

adminRoute.get('/', controller.index);
adminRoute.get('/purge_games', controller.deletAllGames);

adminRoute.get('/update_leaderboard', controller.update_leader_board);
adminRoute.get('/score_form', gameController.form);
adminRoute.post('/store_new_score', gameController.store);
adminRoute.delete('/delete_game/{id}', gameController.delete);
module.exports = adminRoute;