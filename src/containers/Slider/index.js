import { Fragment, useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData(); // get data from JASON
  const [index, setIndex] = useState(0); // set the state of my index to 0
  const byDateDesc = data?.focus.sort((evtA, evtB) =>// it get the events from focus (array of 3)
  new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );
  const nextCard = () => {

    if (byDateDesc !== undefined) { // to fix "can not read propietes of undefined" , this way is gonna give me true in case of diferent values
    setTimeout(
      () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0), // need to add -1, like this we get the last element of the array and not the length of the array (if indx < to 2 1+ else 0)
      5000
    );

  }
  };

  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => ( // this event is an index  from focus not from object event itself
        <Fragment key={event.title}>
          <div
              className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${_.title}`} // change envent.id for _ .title 
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // i need the number of index of the state
                  readOnly //  warning in console / dont want to be change by the user
                />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Slider;
