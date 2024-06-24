import { useState } from "react";

import { useNavigate } from "react-router-dom";

import constants from "../../constants/api";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { useAuth } from "../../components/AuthProvider";

export default function Login() {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	const { setToken } = useAuth();
	let navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = await fetch(constants.API_PATH + "/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (!data.ok) return;

		const { token } = await data.json();
		setToken(token.token);

		navigate("/home");
	};

	return (
		<div>
			<h1>Connexion</h1>

			<form onSubmit={handleSubmit}>
				<Input
					label="Email"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<Input
					label="Password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<Button label="Login" />
			</form>
		</div>
	);
}
