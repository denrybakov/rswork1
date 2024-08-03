import { useState } from "react"
import { initialState } from "./initialState"

export const useStore = () => {
  const [state, setState] = useState(initialState)
  return {
    getStore: () => state,
    setStore: (key, value) => {
      setState(prevState => ({ ...prevState, [key]: value }))
    },
    resetStore: () => {
      setState(initialState)
    }
  };
};

