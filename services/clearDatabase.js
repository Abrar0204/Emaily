import { User } from '../models/User.js';
const clearUsers = async () => {
	try {
		const user = await User.deleteMany();
		console.log('Users Cleared');
	} catch (err) {
		console.log(err);
	}
};

export default clearUsers;
