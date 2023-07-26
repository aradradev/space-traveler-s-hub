import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets, toggleReservation } from '../redux/rockets/rocketsSlice';

const Rockets = () => {
  const rockets = useSelector((state) => state.rockets.rockets);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  const toggleReserved = (id) => {
    const rocket = rockets.find((r) => r.id === id);
    if (rocket) {
      dispatch(
        toggleReservation({ rocketId: id, isReserved: !rocket.reserved }),
      );
    }
  };

  return (
    <section className="container-rocket">
      <ul className="cards">
        {rockets.map((list) => (
          <li className="card" key={list.id}>
            <img src={list.flickr_images[0]} alt={list.name} />
            <div className="card-txt">
              <h3>{list.name}</h3>
              <p>
                {list.reserved && <span className="reserved">Reserved</span>}
                {list.text}
              </p>
              <button
                type="button"
                className="btn"
                onClick={() => toggleReserved(list.id)}
              >
                {list.reserved ? (
                  <span className="cancel">Cancel Reservation</span>
                ) : (
                  <span className="reserve">Reserve Rocket</span>
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Rockets;
