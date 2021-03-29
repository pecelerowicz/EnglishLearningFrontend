export interface VocabResponse {
    id: number;
    polish: string;
    english: string;
}

export interface DidGuessRequest {
    id: number;
    didGuess: boolean;
}
