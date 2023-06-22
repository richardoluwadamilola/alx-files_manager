import redisClient from './utils/redis';
import dbClient from './utils/db';

export default class AppController {
	static getStatus(req, res) {
		res.status(200).json({
			redis: redisClient.isalive(),
			db: dbClient.isAlive(),
		});
	}

	static getStats(req, res) {
		Promise.all(dbClient.ndUsers(), dbClient.nbFiles()])
		.then(([usersCount, filesCount]) => {
			res.status(200).json({ users: usersCount, files: filesCount });
		});
	}
}
