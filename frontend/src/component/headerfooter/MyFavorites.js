import React, { useEffect, useMemo, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import "./favorite.css";

const API_BASE = "https://motomartbackend.onrender.com/api/favorites";
const endpointList = (uid) => `${API_BASE}/${uid}`;
const endpointDeleteOne = (id) => `${API_BASE}/delete/${id}`;
const endpointDeleteMany = `${API_BASE}/delete-multiple`;

const LoadingSkeleton = () => (
  <div className="fav-grid">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="fav-card skeleton-card" />
    ))}
  </div>
);

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
  const abortRef = useRef(null);

  // ---------- helpers ----------
  const showNote = (message, type = "success", ms = 3000) => {
    const id = Date.now() + Math.random();
    setNotices((p) => [...p, { id, message, type }]);
    setTimeout(() => setNotices((p) => p.filter((x) => x.id !== id)), ms);
  };

  const apiFetch = async (url, options = {}) => {
    // cancel previous inflight request of same “channel”
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
      } catch (e) {
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

  const refetch = async () => {
    if (!user) return;
    try {
      const res = await apiFetch(endpointList(user.uid), { method: "GET" });
      const data = (await parseJSON(res)) ?? [];
      setFavorites(Array.isArray(data) ? data : []);
    } catch {
      // keep quiet on refetch
    }
  };

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
    if (!window.confirm(`Remove "${title || "this item"}" from your favorites?`)) return;
    if (!user) return showNote("❌ Please log in again.", "error");

    setBusy(true);
    try {
      const res = await apiFetch(endpointDeleteOne(id), { method: "DELETE" });
      const body = (await parseJSON(res)) ?? (await res.text());
      if (!res.ok) throw new Error(typeof body === "string" ? body : JSON.stringify(body));

      await refetch(); // trust server
      setSelected((p) => p.filter((x) => x !== id));
      showNote("✅ Removed from favorites.");
    } catch (e) {
      showNote("❌ Failed to remove.", "error");
    } finally {
      setBusy(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!hasSelection) return;
    if (!window.confirm(`Delete ${selected.length} selected item(s)?`)) return;
    if (!user) return showNote("❌ Please log in again.", "error");

    setBusy(true);
    try {
      // Primary: POST { ids: [...] }
      let res = await apiFetch(endpointDeleteMany, {
        method: "POST",
        body: JSON.stringify({ ids: selected }),
      });
      let data = await parseJSON(res);

      // Fallbacks if backend expects different shapes
      if (!res.ok || !payloadSuccess(data)) {
        // Try POST with plain array
        res = await apiFetch(endpointDeleteMany, {
          method: "POST",
          body: JSON.stringify(selected),
        });
        data = await parseJSON(res);
      }
      if (!res.ok || !payloadSuccess(data)) {
        // Try DELETE with querystring (servers that ignore DELETE bodies)
        const qs = encodeURIComponent(selected.join(","));
        res = await apiFetch(`${endpointDeleteMany}?ids=${qs}`, { method: "DELETE" });
        data = await parseJSON(res);
      }

      if (!res.ok || !payloadSuccess(data)) {
        throw new Error(
          typeof data === "string" ? data : JSON.stringify(data || { error: "Bulk delete failed" })
        );
      }

      await refetch(); // trust server
      setSelected([]);
      showNote("✅ Selected items removed.");
    } catch (e) {
      showNote("❌ Bulk delete failed on server.", "error");
    } finally {
      setBusy(false);
    }
  };

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
      <Notification items={notices} />

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
          <br/>
          <span className="count-pill">
            {selected.length} selected / {favorites.length} total
          </span>
        </div>

        <button
          className="bulk-remove-btn"
          onClick={handleBulkDelete}
          disabled={!hasSelection || busy}
          aria-disabled={!hasSelection || busy}
        >
          {busy ? "Removing…" : `Remove Selected (${selected.length || 0})`}
        </button>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
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
                onClick={() => handleDeleteOne(fav._id, fav.title)}
                disabled={busy}
                aria-label={`Remove ${fav.title} from favorites`}
              >
                X {/* REMOVE */}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
