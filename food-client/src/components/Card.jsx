export default function Card({ item }) {
  return (
    <div className="container mt-5">
      <div
        className="card"
        style={{ width: "18rem", fontFamily: "-apple-system" }}
      >
        {/* ✅ Dynamic Image */}
        <img src={item.img} className="card-img-top" alt={item.name} />

        <div className="card-body">
          {/* ✅ Dynamic Title */}
          <h5 className="card-title">{item.name}</h5>

          {/* ✅ Dynamic Description */}
          <p className="card-text">
            {item.description || "Delicious food"}
          </p>

          <div className="container w-100">
            
            {/* Quantity */}
            <select className="m-2 h-100 bg-success text-white rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            {/* Size */}
            <select className="m-2 h-100 bg-success text-white rounded">
              <option value="half">Half</option>
              <option value="full">Full</option>
            </select>

            {/* Price */}
            <span className="ms-2">
              ₹{item.options?.[0]?.half}
            </span>

          </div>
        </div>
      </div>
    </div>
  );
}