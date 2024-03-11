import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "@/globals.css";
//////////////// electron components ////////////////
const electron = window.electron;
import TitleBar from "@/electron/TitleBar";
/////////////////////////////////////////////////////

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    {typeof electron !== "undefined" && <TitleBar />}
    <App />
  </>,
)
