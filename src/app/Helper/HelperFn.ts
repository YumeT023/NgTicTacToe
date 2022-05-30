export const calculateWinner = (square: string[]): Array<number> | null => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
    for (let i in lines) {
        const [a, b, c] = lines[i];
        if (square[a] && square[a] === square[b] && square[a] === square[c])
            return lines[i];
    }

    return null;
}