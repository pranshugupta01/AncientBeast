import * as $j from 'jquery';
import Game from '../game';
import MatchI from './match';
import { Player } from '../player';

type matchData = {
	match_id?: string;
};

export default class Gameplay {
	private game: Game;
	private match: MatchI;
	private players: Player[];
	private matchData: matchData;
	private configData: object;
	private matchUsers: any[];
	private matchTurn: any;
	constructor(game: Game, match: MatchI) {
		this.game = game;
		this.match = match;
		this.matchData = {};
		this.configData = {};
		this.players = game.players;
		this.matchUsers = [];
	}

	moveTo(o) {
		if (this.game.activeCreature.player.id != this.match.userTurn) {
			return;
		}
		const data = o;
		const id = this.match.matchData.match_id;
		const opCode = '4';
		this.match.sendMatchData({ match_id: id, op_code: opCode, data: data });
		this.game.UI.active = true;
	}
	useAbility(o) {
		if (this.game.activeCreature.player.id != this.match.userTurn) {
			return;
		}
		const data = o;
		const id = this.match.matchData.match_id;
		const opCode = '5';
		this.match.sendMatchData({ match_id: id, op_code: opCode, data: data });
		this.game.UI.active = true;
	}
	activatePlayer() {
		this.match.activePlayer = this.game.activeCreature.player.id;
		if (this.match.userTurn == this.match.activePlayer) {
			this.game.freezedInput = false;
			return;
		}
		this.game.freezedInput = true;
	}

	updateTurn() {
		if (this.match.userTurn == this.match.activePlayer) {
			this.game.UI.banner(
				this.match.users[this.game.activeCreature.player.id].playername + ' turn',
			);
			const id = this.match.matchData.match_id;
			const opCode = '2';
			const data = { activePlayer: this.game.activeCreature.player.id };
			this.match.sendMatchData({ match_id: id, op_code: opCode, data: data });
		}
		this.activatePlayer();
	}

	delay() {
		if (this.game.activeCreature.player.id != this.match.userTurn) {
			return;
		}
		const id = this.matchData.match_id;
		const opCode = '3';
		const data = { turn: this.matchTurn };
		this.match.sendMatchData({ match_id: id, op_code: opCode, data: data });
	}
}
