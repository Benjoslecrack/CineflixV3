import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/context";
import { useHistory } from "react-router-dom";
import PageHeader from "../components/page-header/PageHeader";

export default function Profile() {
  const [user, setUser] = useState(null);
  const { sharedState, dispatch } = useAppContext();

  const history = useHistory();

  useEffect(() => {
    setUser(sharedState.user);
  }, [sharedState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      profil_pic: `default${value}.jpg`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/update/${sharedState.user.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      console.log(response);
      if (response.ok) {
        // User
        const user = await response.json();
        console.log(user);
        // Mettre à jour les informations utilisateur dans le contexte
        dispatch("user", user);
        setUser(user);
        history.push("/");
      } else {
        console.error("Erreur lors de l'enregistrement des modifications");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le serveur", error);
    }
  };

  // En attente des données
  if (user === null) {
    return <div className="mt-[150px]">Chargement en cours ...</div>;
  }
  return (
    <>
      <PageHeader> Profil </PageHeader>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="font-bold" htmlFor="profil_pic">
            Profile Picture:
          </label>
          <div className="flex">
            <label className="mr-2">
              <input
                type="radio"
                name="profil_pic"
                value="0"
                checked={user.profil_pic === "images/default0.jpg"}
                onChange={handleImageChange}
              />
              <img
                src="images/default0.jpg"
                alt="Profile 0"
                style={{ height: "75px", width: "75px", borderRadius: "100%" }}
              />
            </label>
            <label className="mr-2">
              <input
                type="radio"
                name="profil_pic"
                value="1"
                checked={user.profil_pic === "images/default1.jpg"}
                onChange={handleImageChange}
              />
              <img
                src="images/default1.jpg"
                alt="Profile 1"
                style={{ height: "75px", width: "75px", borderRadius: "100%" }}
              />
            </label>
            <label>
              <input
                type="radio"
                name="profil_pic"
                value="2"
                checked={user.profil_pic === "images/default2.jpg"}
                onChange={handleImageChange}
              />
              <img
                src="images/default2.jpg"
                alt="Profile 2"
                style={{ height: "75px", width: "75px", borderRadius: "100%" }}
              />
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="font-bold" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}
