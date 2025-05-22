import hostService from "./hostService";

const { API_URL } = hostService;

const userService = {
  getUsers: async (userId: number) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors de la récupération des utilisateurs"
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
