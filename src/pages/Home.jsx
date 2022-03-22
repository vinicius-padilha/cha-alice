import "../styles/Home.css"
import List from '../../public/presence_list.json'
import { useNavigate } from "react-router";

const presenceList = List.presence_list;

export function Home() {
  const navigate = useNavigate();
  
  const handleConfirm = (item) => {
    navigate("/suggestion", { state: item });
  }

  return (
    <div className="home container">
      <img src="/logo-vertical.png" alt="Chá da Alice" />

      <p>Selecione seu nome para <br />
        confirmar presença e receber a  <br />
        sugestão de presente:</p>

      <ul>
        {
          presenceList.map(item => (
            <li key={item.uuid} name={item.uuid} onClick={() => handleConfirm(item)}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  )
}