import { useState } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../../constants/api";
import { useAuth } from "../../components/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { TypographyH3 } from "../../components/ui/typography3";

export default function Register() {
  let [pseudonyme, setPseudonyme] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(null);

  const { setToken } = useAuth();
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await fetch(constants.USERS_API_PATH + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pseudonyme, email, password }),
    });

    if (!data.ok) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    const { token } = await data.json();
    setToken(token);

    navigate("/home");
  };

  return (
    <div className="flex flex-col">
      <div className="flex ml-8 mt-4">
        <Link to="/" className="text-lg">
          <TypographyH3>Culture Connect</TypographyH3>
        </Link>
      </div>
      <div className="flex h-screen">
        <Card className="w-full max-w-sm m-auto">
          <CardHeader>
            <CardTitle className="text-2xl">S'inscrire</CardTitle>
            <CardDescription>
              Entrez vos informations afin de créer un compte.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Pseudonyme</Label>
              <Input
                id="nickname"
                type="nickname"
                placeholder="User44"
                onChange={(e) => setPseudonyme(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error != null ? (
              <div className="text-red-500 text-sm">{error}</div>
            ) : null}
          </CardContent>
          <CardFooter className="grid gap-4">
            <Button className="w-full" onClick={handleSubmit}>
              Créer mon compte
            </Button>
            <div className="text-center text-sm">
              Vous avez un compte ?{" "}
              <Link to="/login" className="underline">
                Se connecter
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
