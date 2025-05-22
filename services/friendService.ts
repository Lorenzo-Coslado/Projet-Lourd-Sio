import hostService from "./hostService";

const { API_URL } = hostService;

const friendService = {
  getFriends: async (userId: number) => {
    try {
      const response = await fetch(`${API_URL}/friends/${userId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors de la récupération des amis"
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  addFriendRequest: async (senderId: number, receiverId: number) => {
    try {
      const response = await fetch(`${API_URL}/friends/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId, receiverId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors de l'envoi de la demande d'ami"
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  acceptFriendRequest: async (userId1: number, userId2: number) => {
    const minId = Math.min(userId1, userId2);
    const maxId = Math.max(userId1, userId2);
    try {
      const response = await fetch(`${API_URL}/friends/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId1: minId, userId2: maxId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors de l'acceptation de la demande d'ami"
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  rejectFriendRequest: async (userId1: number, userId2: number) => {
    const minId = Math.min(userId1, userId2);
    const maxId = Math.max(userId1, userId2);
    try {
      const response = await fetch(`${API_URL}/friends/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId1: minId, userId2: maxId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors du refus de la demande d'ami"
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  deleteFriend: async (userId1: number, userId2: number) => {
    const minId = Math.min(userId1, userId2);
    const maxId = Math.max(userId1, userId2);
    try {
      const response = await fetch(`${API_URL}/friends/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId1: minId, userId2: maxId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la suppression de l'ami");
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default friendService;
