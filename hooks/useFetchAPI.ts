const endpoint = "https://tyradex.app/api/v1";

export default async function useFetchAPI(path: string) {
  try {
    const response = await fetch(`${endpoint}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error in useFetchAPI:", error);
    throw error;
  }
}
