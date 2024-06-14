import { useState } from "react";

import Button from "../../components/Button";
import Input from "../../components/Input";

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

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

    // TODO: handle the token
    console.log(await data.json());
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
