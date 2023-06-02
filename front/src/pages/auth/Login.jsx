import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAppContext } from "../../context/context.js";

import PageHeader from "../../components/page-header/PageHeader";

import "./login.scss";

export default function Login() {
  // Consts
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [error, setError] = useState("");

  // Router
  const history = useHistory();

  // User
  const { dispatch } = useAppContext();

  // Fonction d'actions
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(email, password)) return;

    try {
      const response = await fetch(`http://localhost:8000/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // User
        const { user } = await response.json();
        console.log(user);
        // Enregistrer le token JWT dans le contexte utilisateur
        dispatch("user", user);
        // Rediriger l'utilisateur vers la page de trading-book
        history.push("/");
      } else {
        const errorJson = await response.text();
        console.log("Erreur: ", errorJson);
        // Afficher l'erreur de connexion dans le formulaire
        setError(errorJson);
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Unexpected token < in JSON
        console.log("There was a SyntaxError", error);
      } else {
        console.log("There was an error", error);
      }
    }
  };

  // Fonction validation du formulaire
  function validate(email, password, username) {
    // Champs vides
    let hasErrors = false;
    if (!email) {
      setErrorEmail("Veuillez saisir une adresse e-mail.");
      hasErrors = true;
    }

    if (!password) {
      console.log(password);
      setErrorPassword("Veuillez saisir un mot de passe.");
      hasErrors = true;
    }

    if (hasErrors) return false;

    // Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /['";\\]/;
    // regex de mot de passe contient :
    // au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial

    if (!emailRegex.test(email)) {
      hasErrors = true;
      setErrorEmail("L'adresse email n'est pas valide.");
    }

    if (passwordRegex.test(password)) {
      hasErrors = true;
      setErrorPassword("Le mot de passe n'est pas valide");
    }

    if (hasErrors) return false;

    return true; // retourne null si les trois sont valides
  }

  return (
    <>
      <PageHeader>Connexion</PageHeader>
      <div className="login-page">
        <form>
          <div className="mb-3">
            <label htmlFor="email">Adresse Mail</label>
            {errorEmail ? (
              <>
                <input
                  type="email"
                  className="form-input rounded-md w-full border-2 border-red-500"
                  id="email"
                  name="email"
                  placeholder="nom@exemple.fr"
                  autoComplete="on"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-red-500">{errorEmail}</p>
              </>
            ) : (
              <input
                type="email"
                className="form-input rounded-md w-full"
                id="email"
                name="email"
                placeholder="nom@exemple.fr"
                autoComplete="on"
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Mot de Passe</label>
            {errorPassword ? (
              <>
                <input
                  type="password"
                  className="form-input rounded-md w-full border-2 border-red-500"
                  id="password"
                  name="password"
                  placeholder="Votre mot de passe"
                  autoComplete="on"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-red-500">{errorPassword}</p>
              </>
            ) : (
              <input
                type="password"
                className="form-input rounded-md w-full"
                id="password"
                name="password"
                placeholder="Votre mot de passe"
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </div>
          <button
            className="btn-secondary w-full my-4 px-4 py-2 text-lg rounded-md"
            type="submit"
            onClick={handleSubmit}
          >
            Se connecter
          </button>
          <hr className="my-4" />
          <h2 className="text-sm font-bold mb-3">
            Ou utilisez une autre méthode
          </h2>
          <Link to="/auth/register">
            S'inscrire
          </Link>
          {error && (
            <div className="invalid-feedback text-red-500">{error}</div>
          )}
        </form>
      </div>
    </>
  );
}
