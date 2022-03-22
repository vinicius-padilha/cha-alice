import "../styles/Home.css"
import Select from 'react-select'
import List from '../../public/presence_list.json'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const presenceList = List.presence_list;

export function Home() {
  const navigate = useNavigate();
  const params = useParams();

  const personList = presenceList.filter(item => item.uuid === params.uuid);
  const person = personList[0];

  const handleConfirm = () => {
    navigate("/suggestion", { state: person });
  }

  return (
    <div className="home container">
      <img src="/logo-vertical.png" alt="Chá da Alice" />

      <h2>Olá, {person?.name ?? 'Convidado'}</h2>

      {/* <p>Sua presença já foi confirmada! ✔️ 👼🏻</p> */}

      <p>Confirme presença clicando no<br /> botão abaixo e receba a sugestão<br /> de presente.</p>

      {/* <button onClick={handleConfirm}>ver sugestão de presente</button> */}

      <button onClick={handleConfirm}>confirmar presença</button>
    </div>
  )
}