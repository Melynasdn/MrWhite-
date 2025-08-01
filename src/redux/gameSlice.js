import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    players:[],
    realWord:'',
    fakeWords:[],
    difficulty:'easy',
    currentPlayerIndex:0,
    phase:'setup', // setup, reveal, clue, vote, result
    votes: []
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initializeGame: (state, action) => {
            state.players = action.payload.players;
            state.realWord = action.payload.realWord;
            state.fakeWords = action.payload.fakeWords;
            state.difficulty = action.payload.difficulty;
            state.currentPlayerIndex = 0;
            state.phase = 'reveal'; 
        },
        nextPlayer: (state) => {
            if(state.currentPlayerIndex < state.players.length - 1){
                state.currentPlayerIndex += 1;
            }
        },
        goToPhase: (state, action) => {
            state.phase = action.payload.phase;
        },
        addToVote: (state, action) => {
            state.votes.push(action.payload); // payload = {voter , voted}

        },
        resetVotes: (state) => {
            state.votes = [];
        },
        resetGame: (state) => {
  state.players = [];
  state.realWord = '';
  state.fakeWord = '';
  state.difficulty = 'easy';
  state.currentPlayerIndex = 0;
  state.phase = 'setup';
  state.votes = [];
}


    }
});

export const {initializeGame, nextPlayer, goToPhase, addToVote, resetVotes, resetGame } = gameSlice.actions;
export default gameSlice.reducer;