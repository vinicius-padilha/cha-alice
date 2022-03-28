import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import '../styles/List.css'

export function List() {
  const db = getFirestore();
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [docSnap, setDocSnap] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const docSnap = await getDocs(collection(db, "presence_list"));
        
        let list = [];
        
        docSnap.forEach((doc) => list.push(doc.data()));

        setDocSnap(list)
      } catch (err) {
        console.warn('Error in load person data', err)
      } finally {
        setIsLoadingScreen(false)
      }
    })();
  }, []);

  if (isLoadingScreen) return <p style={{ textAlign: "center" }}>Carregando...</p>

  return (
    <div className="list container">
      <img src="/logo-horizontal.png" alt="Chá da Alice" />

      <h2>Lista de confirmados</h2>

      <p>Total: {docSnap.length}</p>

      <ul className="presence-list">
        {
          docSnap.map((item) => (
            <li className="item" key={item.person.name}><b style={{ marginRight: 5 }}>{item.person.name}</b> - {item.person.suggestion.map((child, index) => index + 1 === item.person.suggestion.length ? child.title : `${child.title} / `)}</li>
          ))
        }
      </ul>
    </div>
  )
}