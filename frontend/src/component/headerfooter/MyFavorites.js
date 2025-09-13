import React, { useEffect, useMemo, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import ConfirmDialog from "../utility/ConfirmDialog";
import "./favorite.css";

const API_BASE = "https://motomartbackend.onrender.com/api/favorites";
const endpointList = (uid) => `${API_BASE}/${uid}`;
const endpointDeleteOne = (id) => `${API_BASE}/delete/${id}`;
const endpointDeleteMany = `${API_BASE}/delete-multiple`;

/* LOADER */
const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="app-loading-overlay">
      <div className="app-glass-loader">
        <div className="app-spinner"></div>
        <p className="app-loading-text">
          <i className="bi bi-lightning-charge-fill"></i> Please wait... loading details
        </p>
      </div>
    </div>
  );
};

/* TOAST NOTIFICATIONS */
const Notification = ({ items }) => (
  <div className="notification-container">
    {items.map((n) => (
      <div key={n.id} className={`notification ${n.type}`}>{n.message}</div>
    ))}
  </div>
);

export default function MyFavorites() {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selected, setSelected] = useState([]);
  const [busy, setBusy] = useState(false);

  const [notices, setNotices] = useState([]);
  const [confirm, setConfirm] = useState({ open: false, type: null, id: null, title: "" });
  const abortRef = useRef(null);

  // ---------- helpers ----------
  const showNote = (message, type = "success", ms = 3000) => {
    const id = Date.now() + Math.random();
    setNotices((p) => [...p, { id, message, type }]);
    setTimeout(() => setNotices((p) => p.filter((x) => x.id !== id)), ms);
  };

  const apiFetch = async (url, options = {}) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    const signal = options.signal || abortRef.current.signal;

    const headers = {
      ...(options.headers || {}),
      ...(options.body && !options.headers?.["Content-Type"]
        ? { "Content-Type": "application/json" }
        : {}),
      ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
    };

    return fetch(url, { ...options, headers, signal });
  };

  const parseJSON = async (res) => {
    try {
      return await res.json();
    } catch {
      return null;
    }
  };

  const payloadSuccess = (data) => {
    if (!data) return false;
    if (data.success === true) return true;
    if (typeof data.deletedCount === "number" && data.deletedCount > 0) return true;
    if (Array.isArray(data.removedIds) && data.removedIds.length > 0) return true;
    return false;
  };

  // ---------- auth & initial load ----------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setIdToken(null);
        setFavorites([]);
        setIsLoading(false);
        return;
      }
      setUser(u);
      try {
        const token = await u.getIdToken(true);
        setIdToken(token);
      } catch {
        setIdToken(null);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    let mounted = true;

    const load = async () => {
      setIsLoading(true);
      try {
        const res = await apiFetch(endpointList(user.uid), { method: "GET" });
        const data = (await parseJSON(res)) ?? [];
        if (!mounted) return;
        setFavorites(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) showNote("❌ Failed to load favorites.", "error");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, idToken]);

  // ---------- selection ----------
  const toggleOne = (id) => {
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const allSelected = selected.length > 0 && selected.length === favorites.length;
  const hasSelection = selected.length > 0;

  const toggleAll = () => {
    if (favorites.length === 0) return;
    if (allSelected) setSelected([]);
    else setSelected(favorites.map((f) => f._id));
  };

  // ---------- actions ----------
  const handleDeleteOne = async (id, title) => {
    if (!user) return showNote("❌ Please log in again.", "error");

    const oldFavorites = [...favorites];
    setFavorites((prev) => prev.filter((f) => f._id !== id));
    setSelected((p) => p.filter((x) => x !== id));
    setBusy(true);

    try {
      const res = await apiFetch(endpointDeleteOne(id), { method: "DELETE" });
      const body = (await parseJSON(res)) ?? (await res.text());
      if (!res.ok) throw new Error(typeof body === "string" ? body : JSON.stringify(body));
      showNote("✅ Removed from favorites.");
    } catch {
      setFavorites(oldFavorites);
      showNote("❌ Failed to remove.", "error");
    } finally {
      setBusy(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!hasSelection) return;
    if (!user) return showNote("❌ Please log in again.", "error");

    const oldFavorites = [...favorites];
    setFavorites((prev) => prev.filter((f) => !selected.includes(f._id)));
    setBusy(true);

    try {
      const res = await apiFetch(endpointDeleteMany, {
        method: "POST",
        body: JSON.stringify({ ids: selected }),
      });
      const data = await parseJSON(res);

      if (!res.ok || !payloadSuccess(data)) throw new Error("Bulk delete failed");

      setSelected([]);
      showNote("✅ Selected items removed.");
    } catch {
      setFavorites(oldFavorites);
      showNote("❌ Bulk delete failed on server.", "error");
    } finally {
      setBusy(false);
    }
  };

  // ---------- confirm handlers ----------
  const askDeleteOne = (id, title) => setConfirm({ open: true, type: "one", id, title });
  const askBulkDelete = () => setConfirm({ open: true, type: "bulk" });

  const handleConfirm = async () => {
    if (confirm.type === "one") {
      await handleDeleteOne(confirm.id, confirm.title);
    } else if (confirm.type === "bulk") {
      await handleBulkDelete();
    }
    setConfirm({ open: false, type: null, id: null, title: "" });
  };

  const handleCancel = () => setConfirm({ open: false, type: null, id: null, title: "" });

  const isEmpty = useMemo(() => !isLoading && favorites.length === 0, [isLoading, favorites]);

  // ---------- render ----------
  if (!user) {
    return (
      <div className="fav-page empty-state">
        <Notification items={notices} />
        <img src="/assets/empty-fav.svg" alt="Login required" />
        <p>Please log in to view your favorites.</p>
      </div>
    );
  }

  return (
    <div className="fav-page">
      {/* Gradient Background Layer */}
      <div className="fav-gradient-container">
        <div className="fav-gradient-wrapper">
          <div className="fav-gradient-shape"></div>
          <div className="fav-gradient-shape"></div>
          <div className="fav-gradient-shape"></div>
          <div className="fav-gradient-shape"></div>
        </div>
      </div>
      <Notification items={notices} />
      <ConfirmDialog
        open={confirm.open}
        title="Confirm Delete"
        message={
          confirm.type === "one"
            ? `Remove "${confirm.title}" from your favorites?`
            : `Delete ${selected.length} selected items?`
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      {/* Sticky bulk/action bar */}
      <div className="fav-header">
        <div className="fav-header-left">
          <label className="select-all">
            <input
              type="checkbox"
              onChange={toggleAll}
              checked={allSelected}
              disabled={isLoading || busy || favorites.length === 0}
            />
            <span>Select All</span>
          </label>
          <br />
          <span className="count-pill">
            {selected.length} selected / {favorites.length} total
          </span>
        </div>

        <button
          className={`bulk-remove-btn ${selected.length > 0 ? "active" : ""}`}
          onClick={askBulkDelete}
          disabled={!hasSelection || busy}
          aria-disabled={!hasSelection || busy}
        >
          <span className="material-symbols-outlined">delete</span>
          {selected.length > 0 && <span className="fab-badge">{selected.length}</span>}
        </button>
      </div>

      {isLoading ? (
        <LoadingOverlay isLoading={isLoading} />
      ) : isEmpty ? (
        <div className="empty-state">
          <img src="/assets/empty-fav.svg" alt="No favorites" />
          <h3>No favorites yet</h3>
          <p>Start exploring and add vehicles you love.</p>
        </div>
      ) : (
        <div className="fav-grid">
          {favorites.map((fav) => (
            <div key={fav._id} className="fav-card">
              <input
                type="checkbox"
                className="fav-checkbox"
                title="Select this favorite"
                checked={selected.includes(fav._id)}
                onChange={() => toggleOne(fav._id)}
                disabled={busy}
              />
              <img src={fav.image} alt={fav.title} loading="lazy" />
              <div className="fav-info">
                <h3>{fav.title}</h3>
                <p className="price">{fav.details?.price}</p>
                <ul className="features">
                  {(fav.details?.features || []).slice(0, 4).map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
                {fav.details?.link && (
                  <a
                    href={fav.details.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link-button"
                  >
                    Visit Official Page
                  </a>
                )}
              </div>
              <button
                className="remove-btn"
                onClick={() => askDeleteOne(fav._id, fav.title)}
                disabled={busy}
                aria-label={`Remove ${fav.title} from favorites`}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
