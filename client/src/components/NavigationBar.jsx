import { Link } from "react-router-dom";

import { useAuth } from "./AuthProvider";
import { useRef } from "react";

export default function NavigationBar({}) {
	const { token } = useAuth();
	const isAuthenticated = useRef(token !== null);

	return (
		<nav className="flex justify-center items-center h-[100px]">
			<div className="flex justify-between items-center w-3/5 h-1/2 bg-white rounded-[12px] px-5">
				<Link to={`/`} className="tracking-wide">
					Culture Connect
				</Link>
				<div className="flex justify-between gap-5">
					{isAuthenticated.current ? (
						<>
							{/* add favoris */}
							<Link to={`/`} className="text-[#B91C1B]">
								Favoris
							</Link>
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
