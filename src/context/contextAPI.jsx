import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const ctx = createContext();

export default function ContextAPI({ children }) {
  const [name, setName] = useState("");

  return <ctx.Provider value={{ name, setName }}>{children}</ctx.Provider>;
}
