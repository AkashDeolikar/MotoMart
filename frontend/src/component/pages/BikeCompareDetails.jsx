// BikeCompareDetails.jsx
import React, { useState, useEffect } from "react";
import "./cardetailsNew.css"; // reuse the same CSS
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const LoaderOverlay = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="detailsOverlay">
      <div className="detailsSpinner"></div>
      <p className="detailsLoadingText">Loading, please wait...</p>
    </div>
  );
};

const MessageBar = ({ text, kind, onDismiss }) => {
  if (!text) return null;
  return (
    <div className={`detailsSnackbar ${kind}`}>
      <span>{text}</span>
      <button onClick={onDismiss} className="detailsClose">✖</button>
    </div>
  );
};

const ConfirmBox = ({ open, title, text, onYes, onNo }) => {
  if (!open) return null;
  return (
    <div className="detailsModalBackdrop">
      <div className="detailsModal">
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="detailsModalActions">
          <button onClick={onNo} className="detailsCancelBtn">Cancel</button>
          <button onClick={onYes} className="detailsDeleteBtn">Confirm</button>
        </div>
      </div>
    </div>
  );
};

const formatValue = (value) => {
  if (!value) return "-";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") {
    return Object.entries(value)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");
  }
  return String(value);
};

const BikeCompareDetails = () => {
  const [brand, setBrand] = useState("");
  const [bike, setBike] = useState("");
  const [variant, setVariant] = useState("");
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const [snackbar, setSnackbar] = useState({ text: "", kind: "" });
  const [bikeDataset, setBikeDataset] = useState({});

  const navigate = useNavigate();

  // Auth check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
      else setAuthChecked(true);
    });
    return () => unsub();
  }, [navigate]);

  // Fake loading
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // Fetch bikes
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await fetch("https://motomartbackend.onrender.com/api/bikes");
        const data = await res.json();
        const structured = {};
        data.forEach((b) => {
          if (!structured[b.brand]) structured[b.brand] = {};
          structured[b.brand][b.model] = {
            common: b.common_details,
            variants: b.variants,
          };
        });
        setBikeDataset(structured);
      } catch (err) {
        console.error("Bike fetch failed:", err);
      }
    };
    fetchBikes();
  }, []);

  // Lock body scroll for modal
  useEffect(() => {
    if (showCompare) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
  }, [showCompare]);

  const notify = (msg, kind = "info") => {
    setSnackbar({ text: msg, kind });
    setTimeout(() => setSnackbar({ text: "", kind: "" }), 3500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!brand || !bike || !variant) {
      notify("Please select brand, bike, and variant.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const common = bikeDataset[brand]?.[bike]?.common;
      const details = bikeDataset[brand]?.[bike]?.variants?.[variant];
      if (common && details) {
        setInfo({
          ...common,
          ...details,
          brand,
          bike,
          chosenVariant: variant,
        });
      } else {
        notify("Variant not found.", "error");
        setInfo(null);
      }
      setSubmitting(false);
    }, 1000);
  };

  const addToCompare = () => {
    if (!info) return;
    if (compareList.length >= 2) {
      notify("You can compare max 2 bikes.", "error");
      return;
    }
    const already = compareList.some(
      (b) => b.brand === brand && b.bike === bike && b.chosenVariant === variant
    );
    if (already) {
      notify("Already in compare list.", "info");
      return;
    }
    setCompareList((prev) => [...prev, info]);
    notify(`${brand} ${bike} ${variant} added!`, "success");
  };

  const clearCompare = () => setShowClear(true);

  const confirmClear = () => {
    setCompareList([]);
    setShowCompare(false);
    setShowClear(false);
    notify("Comparison cleared!", "success");
  };

  if (!authChecked || Object.keys(bikeDataset).length === 0) {
    return <LoaderOverlay loading={true} />;
  }

  const brands = Object.keys(bikeDataset);
  const bikes = brand ? Object.keys(bikeDataset[brand] || {}) : [];
  const variants = brand && bike
    ? Object.keys(bikeDataset[brand]?.[bike]?.variants || {})
    : [];

  const allKeys = new Set();
  compareList.forEach((b) => {
    Object.keys(b).forEach((k) => {
      if (!["brand", "bike", "chosenVariant", "image"].includes(k)) {
        allKeys.add(k);
      }
    });
  });

  return (
    <div className="detailsBox">
      <LoaderOverlay loading={isLoading} />
      <h2 className="detailsHeading">Find Your Bike</h2>

      {/* Form */}
      <form onSubmit={handleSearch} className="detailsForm">
        <div className="detailsField">
          <label>Brand</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">Select</option>
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="detailsField">
          <label>Bike</label>
          <select value={bike} onChange={(e) => setBike(e.target.value)} disabled={!brand}>
            <option value="">Select</option>
            {bikes.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="detailsField">
          <label>Variant</label>
          <select value={variant} onChange={(e) => setVariant(e.target.value)} disabled={!bike}>
            <option value="">Select</option>
            {variants.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
        <button className="detailsButton" disabled={submitting}>
          {submitting ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Bike Info */}
      {info && (
        <div className="detailsCard">
          <h4>{brand} {bike} - {variant}</h4>
          {info.image && <img src={info.image} alt={bike} className="detailsImage" />}
          <p><b>Engine:</b> {info.engine}</p>
          <p><b>Price:</b> {info.pricing}</p>
          <button onClick={addToCompare} className="detailsButtonAlt">
            Add to Compare ({compareList.length}/2)
          </button>
        </div>
      )}

      {/* Compare list */}
      {compareList.length > 0 && (
        <div className="detailsCompareBox">
          <h4>Compare List</h4>
          <ul>
            {compareList.map((b, i) => (
              <li key={i}>{b.brand} {b.bike} - {b.chosenVariant}</li>
            ))}
          </ul>
          <button
            className="detailsButton"
            onClick={() => setShowCompare(true)}
            disabled={compareList.length < 2}
          >
            Compare
          </button>
          <button className="detailsButtonClear" onClick={clearCompare}>Clear</button>
        </div>
      )}

      {/* Confirm clear */}
      <ConfirmBox
        open={showClear}
        title="Clear Comparison"
        text="Do you want to remove all bikes from comparison?"
        onYes={confirmClear}
        onNo={() => setShowClear(false)}
      />

      <MessageBar
        text={snackbar.text}
        kind={snackbar.kind}
        onDismiss={() => setSnackbar({ text: "", kind: "" })}
      />

      {/* Comparison Modal */}
      {showCompare && (
        <div className="detailsModalBackdrop">
          <div className="detailsModal detailsCompareModal">
            <div className="detailsModalActions">
              <button
                onClick={() => setShowCompare(false)}
                className="detailsCancelBtn"
              >
                Close
              </button>
            </div>
            <h3>Bike Comparison</h3>

            <table className="detailsCompareTable">
              <thead>
                <tr>
                  <th scope="col" className="detailsKeyCell">Feature</th>
                  {compareList.map((b, i) => (
                    <th scope="col" key={i} className="detailsHeaderCell">
                      {b.image && (
                        <img
                          src={b.image}
                          alt={`${b.brand} ${b.bike}`}
                          className="detailsCompareImg"
                        />
                      )}
                      <div>
                        <b>{b.brand}</b> {b.bike} <br />
                        <small>{b.chosenVariant}</small>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from(allKeys).map((key) => (
                  <tr key={key}>
                    <th scope="row" className="detailsKeyCell">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                    {compareList.map((b, i) => (
                      <td key={i}>{formatValue(b[key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="detailsModalActions">
              <button
                onClick={() => setShowCompare(false)}
                className="detailsCancelBtn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BikeCompareDetails;
