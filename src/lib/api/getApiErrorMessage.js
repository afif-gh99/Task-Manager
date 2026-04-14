export const getApiErrorMessage = (error, fallbackMessage) => {
  const responseData = error?.response?.data;

  if (typeof responseData?.message === "string" && responseData.message.trim()) {
    return responseData.message;
  }

  if (responseData?.errors && typeof responseData.errors === "object") {
    const validationMessages = Object.values(responseData.errors)
      .flat()
      .filter(Boolean);

    if (validationMessages.length > 0) {
      return validationMessages[0];
    }
  }

  return fallbackMessage;
};
