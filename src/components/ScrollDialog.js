import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DetailsUser = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les détails de l'utilisateur après l'authentification
    const fetchUserData = async () => {
      try {
        const storedToken = localStorage.getItem('token');

        // Remplacez "your_api_endpoint" par l'URL de votre API qui renvoie les détails de l'utilisateur
        const response = await axios.get('your_api_endpoint', {
          headers: {
            Authorization: `Bearer ${storedToken}`, // Remplacez yourAuthToken par le token d'accès obtenu lors de l'authentification
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error('Erreur lors de la récupération des données utilisateur');
        }
      } catch (error) {
        console.error('Erreur réseau', error);
      }
    };

    // Appel de la fonction pour récupérer les détails de l'utilisateur
    fetchUserData();
  }, []); // La dépendance vide signifie que cela ne s'exécute qu'une seule fois après le rendu initial

  return (
    <div>
      {userData ? (
        <div>
          <h2>{userData.firstname}</h2>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Chargement des détails de l'utilisateur...</p>
      )}
    </div>
  );
};

export default DetailsUser;
