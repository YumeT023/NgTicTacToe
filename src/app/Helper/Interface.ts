export interface Square {
    point: string[];
    class: boolean[];
}

export interface Message {
    player: string;
    message: string;
    isError?: boolean;
}