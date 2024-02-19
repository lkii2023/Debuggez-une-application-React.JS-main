import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Si une catégorie est sélectionnée, filtrer tous les événements pour afficher UNIQUEMENT les événements de la même catégorie
  const filteredEvents =
    (!type
      ? data?.events
      : data?.events.filter((event) => event.type === type)) || [];

  const pageEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);
  const typeList = Array.from(new Set(data?.events.map((event) => event.type)));

  return (
    <>
      {error && <div>Une erreur produite</div>}
      {data === null ? (
        "Chargement"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={(value) => changeType(value)}
          />
          <div
            id="events"
            className="ListContainer"
          >
            {pageEvents.map((event) => (
              <Modal
                key={event.id}
                Content={<ModalEvent event={event} />}
              >
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              <a
                // eslint-disable-next-line react/no-array-index-key
                key={n}
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
