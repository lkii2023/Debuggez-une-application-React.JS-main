import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // Modification de l'ordre de tri pour afficher les événements dans l'ordre décroissant
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );

  useEffect(() => {
    // Utilisation de setInterval pour déclencher périodiquement le changement de l'index
    const intervalId = setInterval(() => {
      // Utilisation de l'opérateur modulo (%) pour faire défiler les événements de manière cyclique
      setIndex((prevIndex) => (prevIndex + 1) % (data?.focus.length || 1));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img
            src={event.cover}
            alt="forum"
          />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((item, radioIdx) => (
            <input
              key={item.title} // Ajout de la modification de la clé pour la rendre unique
              type="radio"
              name="radio-button"
              checked={index === radioIdx} // Remplace "idx" par "index" car "idx" correspond à l'index de la première itération de la fonction map, mais nous avons besoin de l'index de la diapositive actuelle.
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
