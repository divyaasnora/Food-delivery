import pizza from "../assets/pizza.jpg";
import momos from "../assets/momos.jpg";
import burger from "../assets/burger.jpg";

export default function Carousal() {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner" id="carousel">
        
        <div className="carousel-caption" style={{ zIndex: "10" }}>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
            />
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </form>
        </div>

        {/* Slide 1 */}
        <div className="carousel-item active">
          <img
            src={burger}
            className="d-block w-100"
            style={{
              height: "100vh",
              objectFit: "cover",
              filter: "brightness(30%)"
            }}
            alt="burger"
          />
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <img
            src={pizza}
            className="d-block w-100"
            style={{
              height: "100vh",
              objectFit: "cover",
              filter: "brightness(30%)"
            }}
            alt="pizza"
          />
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <img
            src={momos}
            className="d-block w-100"
            style={{
              height: "100vh",
              objectFit: "cover",
              filter: "brightness(30%)"
            }}
            alt="momos"
          />
        </div>

      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}