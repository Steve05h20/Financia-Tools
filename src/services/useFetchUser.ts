import { ref } from 'vue'
import type { IUser } from "@/models/user.interface"

const API_URL = "https://money-pie-3.fly.dev/api/v1/users";

enum ErrorMessage {
  USER_NOT_FOUND = "Utilisateur non trouvé",
  USER_DETAILS_NOT_FOUND = "Données pour l'utilsateur non trouvées",
  SERVER_ERROR = "Erreur lors de la récupération des détails bancaires",
  INVALID_USER_ID = "Le paramètre userId doit être un nombre entier positif"
}

const handleErrorResponse = (status: number, errorData: {message: string} ): never => {
  if (status === 404) {
    if (errorData.message?.includes("not found")) {
      throw new Error(ErrorMessage.USER_NOT_FOUND);
    }
    if (errorData.message?.includes("does not have any saved user details")) {
      throw new Error(ErrorMessage.USER_DETAILS_NOT_FOUND);
    }
  }
  throw new Error(ErrorMessage.SERVER_ERROR);
};

const validateUserId = (userId: number): void => {
  if (typeof userId !== 'number' || userId < 0 || !Number.isInteger(userId)) {
    throw new Error(ErrorMessage.INVALID_USER_ID)
  }
}

const validateEmail = (email: string): void => {
  console.assert(
    typeof email === 'string' && email.includes('@'),
    "L'email doit être une chaîne de caractères valide"
  );
};

export default function useFetchUser() {
  const user = ref<IUser | undefined>()
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function GET_USER_BY_ID(userId: number): Promise<void> {
    validateUserId(userId);
    error.value = null;
    try {
      loading.value = true;
      const response = await fetch(`${API_URL}/${userId}`);
      switch (response.status) {
        case 200: {
          const data = await response.json();
          console.log('Données utilisateur reçues:', data);
          if (!data) {
            throw new Error(ErrorMessage.USER_NOT_FOUND);
          }
          user.value = data;
          break;
        }
        default: {
          const errorData = await response.json();
          handleErrorResponse(response.status, errorData);
        }
      }
    } catch (err: unknown) {
      user.value = undefined;
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR;
    } finally {
      loading.value = false;
    }
  }

  async function GET_USER_BY_EMAIL( email: string): Promise<void> {
    validateEmail(email);
    error.value = null;
    try {
      loading.value = true;
      const response = await fetch(`${API_URL}/email/${email}`);
      switch (response.status) {
        case 200: {
          const data = await response.json();
          console.log('Données utilisateur reçues:', data);
          if (!data) {
            throw new Error(ErrorMessage.USER_NOT_FOUND);
          }
          user.value = data;
          break;
        }
        default: {
          const errorData = await response.json();
          handleErrorResponse(response.status, errorData);
        }
      }
    } catch (err: unknown) {
      user.value = undefined;
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR;
    } finally {
      loading.value = false;
    }
  }

  const POST_USER = async (newUser: IUser): Promise<void> => {
    error.value = null;
    try {
      loading.value = true;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      switch (response.status) {
        case 200:
        case 201: {
          const data = await response.json();
          user.value = data;
          break;
        }
        default: {
          const errorData = await response.json();
          handleErrorResponse(response.status, errorData);
        }
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR;
    } finally {
      loading.value = false;
    }
  }

  const PUT_USER_BY_ID = async (userId: number, userData: IUser): Promise<void> => {
    validateUserId(userId);
    error.value = null;
    try {
      loading.value = true;
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      switch (response.status) {
        case 200: {
          const data = await response.json();
          user.value = data;
          break;
        }
        default: {
          const errorData = await response.json();
          handleErrorResponse(response.status, errorData);
        }
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR;
    } finally {
      loading.value = false;
    }
  }


  const DELETE_USER_BY_ID = async (userId: number): Promise<void> => {
    validateUserId(userId);
    error.value = null;
    try {
      loading.value = true;
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "DELETE",
      });
      switch (response.status) {
        case 200: {
          user.value = undefined;
          break;
        }
        default: {
          const errorData = await response.json();
          handleErrorResponse(response.status, errorData);
        }
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR;
    } finally {
      loading.value = false;
    }
  }


  return {
    user,
    loading,
    error,
    GET_USER_BY_ID,
    GET_USER_BY_EMAIL,
    POST_USER,
    PUT_USER_BY_ID,
    DELETE_USER_BY_ID,
  }
}

