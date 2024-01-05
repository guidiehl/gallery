import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

/**
 * This function is used to get a user-friendly error message based on the status code of an HTTP response.
 * It accepts an error object as a parameter, which can be of any type.
 * It initializes an errorMessage string and a statusCode number.
 * If the error is an instance of AxiosError, it extracts the status code from the error's response.
 * It then uses a switch statement to map status codes to user-friendly error messages and returns it.
 */
export function getErrorMessage(error: unknown): string {
 
    let errorMessage: string;

    let statusCode = 0;

    if (error instanceof AxiosError) {        
        statusCode = error.response?.status ?? 0;        
    } 

    switch (statusCode) {
        case 400:
            errorMessage = 'Richiesta non valida';
            break;
        case 401:
            errorMessage = 'Non autorizzato';
            break;
        case 403:
            errorMessage = 'Accesso negato';
            break;
        case 404:
            errorMessage = 'Risorsa non trovata';
            break;
        case 500:
            errorMessage = 'Errore interno del server';
            break;
        case 502:
            errorMessage = 'Bad Gateway';
            break;
        case 503:
            errorMessage = 'Servizio non disponibile';
            break;
        case 504:
            errorMessage = 'Gateway Timeout';
            break;
        default:
            errorMessage = 'Si è verificato un errore';
    }

    return errorMessage;
}

/**
 * This function is a custom hook that uses the useQuery hook to fetch data from a given URL.
 * The query function is an async function that tries to get the data from the URL using the axios HTTP client.
 * If the request is successful, it returns the data as an array of type T.
 * If the request fails, it throws the error.
 * The useQuery hook returns an object with the data.
 */
export function useCustomQuery<T>({ url }: { url: string; }) {
    return useQuery<T[] | null>({
      queryKey: [url],
      queryFn: async (): Promise<T[]> => {
        try {
          const res = await axios.get(url);

          const data: T[] = res.data;

          return data;
        } catch (error) {
          throw error;
        }
      },
    });
}