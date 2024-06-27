import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { TypographyH1 } from "../components/ui/typography1";
import constants from "../constants/api";
import { useAuth } from "../components/AuthProvider";
import List from "../components/List";

export default function Favorites() {
  const { getToken } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    fetch(`${constants.USERS_API_PATH}/favorites`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(r => r.json())
      .then(r => {
        setFavoriteIds(r.map(a => a._id))
      });
  }, []);

  useEffect(() => {
    fetch(`${constants.USERS_API_PATH}/favorites`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setFavorites(r);
      });
  }, []);

  return (
    <>
      <NavigationBar />

      <div className="mx-auto w-2/3 mt-4 flex flex-col gap-8">
      <TypographyH1>Vos favoris</TypographyH1>

        <List items={favorites} favoriteIds={favoriteIds} />
      </div>
    </>
  );
}
