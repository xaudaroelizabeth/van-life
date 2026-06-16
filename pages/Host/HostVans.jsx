import React from "react";
import { Link } from "react-router-dom";
import { getHostVans } from "../../api.js";

export default function HostVans() {
  const [vans, setVans] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [fadeIn, setFadeIn] = React.useState(false);

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      setFadeIn(false);

      try {
        const data = await getHostVans();
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);

        requestAnimationFrame(() => {
          setFadeIn(true);
        }, 50);
      }
    }

    loadVans();
  }, []);

  const hostVansEls = vans.map((van) => (
    <Link to={van.id} key={van.id} className="host-van-link-wrapper">
      <div className="host-van-single" key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));

  if (loading) {
    return (
      <section className={fadeIn ? "fade-in" : ""}>
        <div className="loading">
          <h1>
            Loading<span className="dot dot1">.</span>
            <span className="dot dot2">.</span>
            <span className="dot dot3">.</span>
          </h1>
        </div>
      </section>
    );
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        {vans.length > 0 ? (
          <section>{hostVansEls}</section>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
}
