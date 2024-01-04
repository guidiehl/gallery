import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

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