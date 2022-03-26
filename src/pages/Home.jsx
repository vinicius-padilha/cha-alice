import "../styles/Home.css"
import List from '../../public/presence_list.json'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const presenceList = List.presence_list;

export function Home() {
  const db = getFirestore();
  const navigate = useNavigate();
  const params = useParams();

  const personList = presenceList.filter(item => item.uuid === params.uuid);
  const person = personList[0];

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [docSnap, setDocSnap] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const docSnap = await getDocs(collection(db, "presence_list"));
        
        docSnap.forEach((doc) => doc.data().person.uuid === params.uuid && setDocSnap(doc.data()));
      } catch (err) {
        console.warn('Error in load person data', err)
      } finally {
        setIsLoadingScreen(false)
      }
    })();
  }, []);

  const goToSuggestion = () => {
    navigate("/suggestion", { state: person });
  }
  
  const handleConfirm = async () => {
    setIsLoading(true);
    
    try {
      await addDoc(collection(db, "presence_list"), {person, status: 'confirmed'});
    } catch (err) {
      console.warn('Error in confirm presence', err)
    } finally {
      setIsLoading(false);
    }

    goToSuggestion()
  }

  if (isLoadingScreen) return <p style={{ textAlign: "center" }}>Carregando...</p>

  return (
    <div className="home container">
      <img src="/logo-vertical.png" alt="Chá da Alice" />

      <h2>Olá, {person?.name ?? 'Convidado'}</h2>
      
      {docSnap?.status === 'confirmed' ? (
        <>
          <p>Sua presença já foi confirmada! ✔️ 👼🏻</p>

          <button onClick={goToSuggestion}>ver sugestão de presente</button>
        </>
      ) : (
        <>
          <p>Confirme presença clicando no<br /> botão abaixo e receba a sugestão<br /> de presente.</p>
          
          <button onClick={handleConfirm} disabled={isLoading}>{isLoading ? 'carregando...' : 'confirmar presença'}</button>
        </>
      )}
    </div>
  )
}