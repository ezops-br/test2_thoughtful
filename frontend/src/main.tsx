import { createRoot } from "react-dom/client"
import Router from "./router"
import "./index.css"

createRoot(document.getElementById("root") as HTMLElement).render(<Router />)
