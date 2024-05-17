import { BoardType } from "../types/BoardTypes";

const BOARD_KEY = 'board';

export const getBoardFromLocalStorage = (data?: BoardType): BoardType => {
    const storedBoard = localStorage.getItem(BOARD_KEY);
    return storedBoard ? JSON.parse(storedBoard) : { ...data };
};

export const saveBoardToLocalStorage = (board: BoardType): void => {
    localStorage.setItem(BOARD_KEY, JSON.stringify(board));
};