import hostService from "./hostService";

const { API_URL } = hostService;

const apiService = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la connexion");
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription");
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  getFavoris: async (userId: number) => {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors de la récupération des favoris"
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  addFavoris: async (userId: number, pokemon_id: number) => {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pokemon_id }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'ajout aux favoris");
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  removeFavoris: async (userId: number, pokemon_id: number) => {
    try {
      const response = await fetch(
        `${API_URL}/user/${userId}/favorites/${pokemon_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors de la suppression des favoris"
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  checkisFavorite: async (userId: number, pokemon_id: number) => {
    try {
      const response = await fetch(
        `${API_URL}/user/${userId}/favorites/${pokemon_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors de la vérification des favoris"
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
