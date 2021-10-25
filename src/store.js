import { readable, writable } from "svelte/store";
import ReconnectingWebSocket from "reconnecting-websocket";

const PLAYER = 1;
const MATCH = 2;
const BATCH = 3;

const socket = new ReconnectingWebSocket("wss://aoe2recs.com/dashboard/api/");

function websocketState(socket) {
  const { subscribe, set } = writable(true);
  socket.addEventListener("open", () => {
    set(true);
  });
  socket.addEventListener("close", () => {
    set(false);
  });
  return {
    subscribe,
  };
}

function updateStore(curr, data) {
  if (data.data === null) {
    const { [data.target_id]: remove, ...rest } = curr;
    return rest;
  } else {
    return { ...curr, [data.target_id]: data.data };
  }
}

function createStore(socket, event_class) {
  const { subscribe, set, update } = writable({});
  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.cls === event_class && data.source === 0) {
      update((curr) => updateStore(curr, data));
    }
  });
  const reset = () => {
    set({});
  };
  return {
    subscribe,
    update,
    reset,
  };
}

export const players = createStore(socket, PLAYER);
export const matches = createStore(socket, MATCH);
export const connection = websocketState(socket);
export const theme = writable(localStorage.getItem("theme") || "dark");
export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date().getTime() / 1000);
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  if (data.cls === BATCH) {
    data.data.forEach((subevent) => {
      if (subevent.cls === PLAYER) {
        players.update((curr) => updateStore(curr, subevent));
      } else if (subevent.cls === MATCH) {
        matches.update((curr) => updateStore(curr, subevent));
      }
    });
  }
});

socket.addEventListener("close", (event) => {
  matches.reset();
  players.reset();
});
