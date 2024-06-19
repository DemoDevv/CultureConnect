import { Link } from "react-router-dom";

import { useAuth } from "./AuthProvider";
import { useState } from "react";

export default function NavigationBar({}) {
  const { token } = useAuth();
  let [isAuthenticated, _] = useState(token !== null);

  return (
    <nav className="flex justify-center items-center h-[100px]">
      <div className="flex justify-between items-center w-3/5 h-1/2 bg-white rounded-[12px] px-5">
        <span>Culture Connect</span>
        <div className="flex justify-between gap-5">
          {isAuthenticated ? (
            <>
              <Link to={`/`}>Accueil</Link>
              {/* add favoris */}
            </>
          ) : (
            <>
              <Link to={`/login`}>Connexion</Link>
              <Link to={`/register`} className="text-[#B91C1B]">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
