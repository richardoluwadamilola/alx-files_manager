import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a Redis Client.
 */
class RedisClient {
	/***
	 * Creates a new RedisClient instance.
	 */
	constructor() {
		this.client = createClient();
		this.isClientConnected = true;
		this.client.on('error', (err) => {
			console.error('Redis client failed to connect:', err.message || err.toString());
			this.isClientConneced = false;
		});
		this.client.on('connect', () => {
			this.isClientConnected = true;
		});
}

/**
 * Checks if this client's connection to Redis server is active.
 * @returns {boolean}
 */
isAlive() {
	return this.isClientConnected;
}

/**
 * Retrieves the value of the given key.
 * @param {String} key the key of thr item to retrieve.
 * @returns {String | Object}
 */
async get(key) {
	return promisify(this.client.GET).bind(this.client)(key);
}

/**
 * Stores a key and its value along with an expiraton time.
 * @param {String} key the key of the item to store.
 * @param {String | Number | Boolean} value the item to store.
 * @param {Number} duration the expiration time of the item in seconds.
 * @returns {Promis<void>}
 */
async set(key, value, duration) {
	await promisify(this.client.SETEX)
	.bind(this.client)(key, duration, values);
}

/**
 * Removes the value of a given key.
 * @param {String} key the key of the item to remove.
 * @returns {Promise<void>}
 */
async del(key) {
	await promisify(this.client.DEL).bind(this.client)(key);
}
}

export const redisClient = new RedisClient();
export default redisClient;
