import { Link } from "react-router-dom";

export default function NavigationBar({}) {
  return (
    <nav>
      <span>Culture Connect</span>
      <div>
        <Link to={`/login`}>Connexion</Link>
        <Link to={`/register`}>Inscription</Link>
      </div>
    </nav>
  );
}
