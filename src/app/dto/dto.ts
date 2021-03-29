export interface VocabResponse {
    id: number;
    polish: string;
    english: string;
}

export interface DidGuessRequest {
    id: number;
    didGuess: boolean;
}

export interface FreshVocabRequest {
    polish: string;
    english: string;
    startNow: boolean;
}

export interface FreshVocabResponse {
    message: string;
}
