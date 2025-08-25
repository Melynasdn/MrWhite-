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
        resetGame: (state, action) => {
            const { keepPlayers } = action.payload || {};

              state.votes = [];
              state.round = 1;

              if (!keepPlayers) {
                     state.players = []; 
              } else {
                 state.players = state.players.map(player => ({
                 ...player,
                  role: null,
                word: null,
    }));
  }
}



    }
});

export const {initializeGame, nextPlayer, goToPhase, addToVote, resetVotes, resetGame } = gameSlice.actions;
export default gameSlice.reducer;