import axios from 'axios';

const backendApi = axios.create({
  baseURL: process.env.BACKEND_URL
})

export const BackendApi = {

  addPlayer: (player) => backendApi.post("/api/player", player),
  removePlayer: (name) => backendApi.delete(`/api/player/${name}`),
  getPlayers: () => backendApi.get(`/api/player`),
  getScores: () => backendApi.get(`/api/scores`)

}
