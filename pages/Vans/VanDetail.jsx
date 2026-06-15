import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getVan } from "../../api.js";

export default function VanDetail() {
  const [van, setVan] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { id } = useParams();
  const location = useLocation();
  const [fadeIn, setFadeIn] = React.useState(false);

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVan(id);
        console.log(data);
        setVan(data);
      } catch (err) {
        setError(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    }
    loadVans();
  }, [id]);

  React.useEffect(() => {
    if (!loading && van) {
      setFadeIn(true);
    }
  }, [loading, van]);

  if (loading) {
    return (
      <div className="loading">
        <h1>
          Loading<span className="dot dot1">.</span>
          <span className="dot dot2">.</span>
          <span className="dot dot3">.</span>
        </h1>
      </div>
    );
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  return (
    <div className={`van-detail-container ${fadeIn ? "fade-in" : ""}`}>
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>

      {van && (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      )}
    </div>
  );
}
