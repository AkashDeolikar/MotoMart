// CarDetailsNew.jsx
import React, { useState, useEffect } from "react";
import "./cardetailsNew.css";
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

// Helper to format values
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

const CarDetails = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const [snackbar, setSnackbar] = useState({ text: "", kind: "" });
  const [carDataset, setCarDataset] = useState({});

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

  // Fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("https://motomartbackend.onrender.com/api/cars");
        const data = await res.json();
        const structured = {};
        data.forEach((c) => {
          if (!structured[c.brand]) structured[c.brand] = {};
          structured[c.brand][c.model] = {
            common: c.common_details,
            variants: c.variants,
          };
        });
        setCarDataset(structured);
      } catch (err) {
        console.error("Car fetch failed:", err);
      }
    };
    fetchCars();
  }, []);

  // Lock/unlock background scroll when modal opens
  useEffect(() => {
    if (showCompare) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showCompare]);

  const notify = (msg, kind = "info") => {
    setSnackbar({ text: msg, kind });
    setTimeout(() => setSnackbar({ text: "", kind: "" }), 3500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!brand || !model || !variant) {
      notify("Please select brand, model, and variant.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const common = carDataset[brand]?.[model]?.common;
      const details = carDataset[brand]?.[model]?.variants?.[variant];
      if (common && details) {
        setInfo({
          ...common,
          ...details,
          brand,
          model,
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
      notify("You can compare max 2 cars.", "error");
      return;
    }
    const already = compareList.some(
      (c) => c.brand === brand && c.model === model && c.chosenVariant === variant
    );
    if (already) {
      notify("Already in compare list.", "info");
      return;
    }
    setCompareList((prev) => [...prev, info]);
    notify(`${brand} ${model} ${variant} added!`, "success");
  };

  const clearCompare = () => setShowClear(true);

  const confirmClear = () => {
    setCompareList([]);
    setShowCompare(false);
    setShowClear(false);
    notify("Comparison cleared!", "success");
  };

  if (!authChecked || Object.keys(carDataset).length === 0) {
    return <LoaderOverlay loading={true} />;
  }

  const brands = Object.keys(carDataset);
  const models = brand ? Object.keys(carDataset[brand] || {}) : [];
  const variants = brand && model
    ? Object.keys(carDataset[brand]?.[model]?.variants || {})
    : [];

  // Collect all feature keys for comparison
  const allKeys = new Set();
  compareList.forEach((c) => {
    Object.keys(c).forEach((k) => {
      if (!["brand", "model", "chosenVariant", "image"].includes(k)) {
        allKeys.add(k);
      }
    });
  });

  return (
    <div className="detailsBox">
      <LoaderOverlay loading={isLoading} />
      <h2 className="detailsHeading">Find Your Car</h2>

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
          <label>Model</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand}>
            <option value="">Select</option>
            {models.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="detailsField">
          <label>Variant</label>
          <select value={variant} onChange={(e) => setVariant(e.target.value)} disabled={!model}>
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

      {/* Car Info */}
      {info && (
        <div className="detailsCard">
          <h4>{brand} {model} - {variant}</h4>
          {info.image && <img src={info.image} alt={model} className="detailsImage" />}
          <p><b>Fuel:</b> {info.fuelType}</p>
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
            {compareList.map((c, i) => (
              <li key={i}>{c.brand} {c.model} - {c.chosenVariant}</li>
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
        text="Do you want to remove all cars from comparison?"
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
            <h3>Car Comparison</h3>
            

            <table className="detailsCompareTable">
              <thead>
                <tr>
                  <th scope="col" className="detailsKeyCell">Feature</th>
                  {compareList.map((c, i) => (
                    <th scope="col" key={i} className="detailsHeaderCell">
                      {c.image && (
                        <img
                          src={c.image}
                          alt={`${c.brand} ${c.model}`}
                          className="detailsCompareImg"
                        />
                      )}
                      <div>
                        <b>{c.brand}</b> {c.model} <br />
                        <small>{c.chosenVariant}</small>
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
                    {compareList.map((c, i) => (
                      <td key={i}>{formatValue(c[key])}</td>
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

export default CarDetails;
