const authController = {
	login: async (user) => {
		const data = await fetch("http://localhost:8082/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: user.email,
				password: user.password,
			}),
		});

		if (!data.ok)
			return Promise.reject("Bad response from users micro-service");

		return await data.json();
	},
	register: async (user) => {
		const data = await fetch("http://localhost:8082/api/users/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				pseudonyme: user.pseudonyme,
				email: user.email,
				password: user.password,
			}),
		});

		if (!data.ok)
			return Promise.reject("Bad response from users micro-service");

		return await data.json();
	},
};

export default authController;
