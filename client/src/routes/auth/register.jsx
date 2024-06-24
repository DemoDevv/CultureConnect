import { useState } from "react";

import { useNavigate } from "react-router-dom";

import constants from "../../constants/api";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { useAuth } from "../../components/AuthProvider";

export default function Register() {
	let [pseudonyme, setPseudonyme] = useState("");
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	const { setToken } = useAuth();
	let navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = await fetch(constants.API_PATH + "/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ pseudonyme, email, password }),
		});

		if (!data.ok) return;

		const { token } = await data.json();
		setToken(token.token);

		navigate("/home");
	};

	return (
		<div>
			<h1>Inscription</h1>

			<form onSubmit={handleSubmit}>
				<Input
					label="Pseudonyme"
					type="text"
					placeholder="Enter your username"
					value={pseudonyme}
					onChange={(event) => setPseudonyme(event.target.value)}
				/>
				<Input
					label="Email"
					type="text"
					placeholder="Enter your email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<Input
					label="Password"
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<Button label="Register" />
			</form>
		</div>
	);
}
