export const handleApiError = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}; 