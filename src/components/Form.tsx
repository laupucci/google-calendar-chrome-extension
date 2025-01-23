import { FC } from "react";
import { CustomInput } from "./CustomInput";

type Props = {
  eventDetails: {
    name: string;
    date: string;
    start: string;
    end: string;
    whatsapp: string;
  };
  setEventDetails: (
    value: React.SetStateAction<{
      name: string;
      date: string;
      start: string;
      end: string;
      whatsapp: string;
    }>
  ) => void;
};
export const Form: FC<Props> = ({ eventDetails, setEventDetails }) => {
  return (
    <div>
      <CustomInput
        className="event event--name"
        type="text"
        title="Nombre del evento"
        value={eventDetails.name}
        onChange={(e) =>
          setEventDetails((prevState) => ({
            ...prevState,
            name: e.target.value,
          }))
        }
      />
      <CustomInput
        className="event event--time"
        type="date"
        title="Fecha del evento"
        value={eventDetails.date}
        onChange={(e) =>
          setEventDetails((prevState) => ({
            ...prevState,
            date: e.target.value,
          }))
        }
      />
      <div className="row">
        <CustomInput
          className="event event--time"
          type="time"
          title="Hora de comienzo"
          value={eventDetails.start}
          onChange={(e) =>
            setEventDetails((prevState) => ({
              ...prevState,
              start: e.target.value,
            }))
          }
        />
        <CustomInput
          className="event event--time"
          type="time"
          title="Hora de finalización"
          value={eventDetails.end}
          onChange={(e) =>
            setEventDetails((prevState) => ({
              ...prevState,
              end: e.target.value,
            }))
          }
        />
      </div>
      <CustomInput
        className="event event--time"
        type="text"
        title="Whatsapp"
        value={eventDetails.whatsapp}
        onChange={(e) =>
          setEventDetails((prevState) => ({
            ...prevState,
            whatsapp: e.target.value,
          }))
        }
      />
    </div>
  );
};
