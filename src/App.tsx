import { FC, useState } from "react";
import "./styles/App.css";
import { FIREBASE_CONFIG, signIn } from "./models/Auth";
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { Form } from "./components/Form";

const firebase = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(firebase);

export const App: FC = () => {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    date: "",
    start: "",
    end: "",
    whatsapp: "",
  });
  const accessToken = localStorage.getItem("authToken");
  const sendWhatsApp = (eventLink: string) => {
    const message = `Hola! Has creado el evento: "${eventDetails.name}" en tu calendario, agendado el ${eventDetails.date} desde ${eventDetails.start} hasta ${eventDetails.end}. Aquí puedes verlo: ${eventLink}`;
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${
      eventDetails.whatsapp
    }&text=${encodeURI(message)}&app_absent=0`;
    window.open(whatsappUrl);
    setEventDetails({ name: "", date: "", start: "", end: "", whatsapp: "" });
  };

  const createGoogleEvent = async (token?: string) => {
    const authToken = token ?? accessToken;
    fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: eventDetails.name,
        start: {
          dateTime: `${eventDetails.date}T${eventDetails.start}:00`,
          timeZone: "Europe/Madrid",
        },
        end: {
          dateTime: `${eventDetails.date}T${eventDetails.end}:00`,
          timeZone: "Europe/Madrid",
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => sendWhatsApp(data.htmlLink))
      .catch((error) => console.log(error));

    return true;
  };

  const handleCreate = async (e: { preventDefault: () => void }) => {
    if (
      eventDetails.name.length < 2 ||
      eventDetails.date.length < 2 ||
      eventDetails.start.length < 2 ||
      eventDetails.end.length < 2 ||
      eventDetails.whatsapp.length < 2
    )
      return alert("Debes completar todos los campos para crear el evento");
    if (accessToken && accessToken !== "") {
      try {
        createGoogleEvent();
      } catch (error) {
        console.log(error);
        signIn(e, auth, createGoogleEvent);
      }
    } else
      try {
        signIn(e, auth, createGoogleEvent);
      } catch (e: unknown) {
        console.log(e);
      }
  };

  return (
    <div>
      <h1>Google Calendar Event Creator</h1>
      {(!accessToken || accessToken === "") && (
        <div className="card">
          <span style={{ marginBottom: 10 }}>
            Si nunca has usado esta extensión, por favor acepta los permisos
            primero
          </span>
          <button onClick={(e) => signIn(e, auth)}>Comenzar</button>
        </div>
      )}
      <Form eventDetails={eventDetails} setEventDetails={setEventDetails} />
      <button onClick={handleCreate}>Crear evento</button>
    </div>
  );
};
