import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./overview.css";

const OverviewCard = ({ title, date, action, children }) => (
  <motion.article
    className="overview-card"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="overview-card-text">
      <p className="overview-date">{new Date(date).toLocaleDateString()}</p>
      <h2>{title}</h2>
      <div className="overview-action">{action}</div>
      {children && <p>{children}</p>}
    </div>
  </motion.article>
);

const OverviewPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsAndSummaries = async () => {
      try {
        // Fetch latest automotive news, prices, technology, and future releases
        const newsRes = await fetch(
          `https://newsapi.org/v2/everything?q=(car OR vehicle OR motorcycle OR EV OR electric OR "vehicle price" OR "vehicle technology" OR "future release")&language=en&sortBy=publishedAt&pageSize=5&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        const newsData = await newsRes.json();
        const articles = newsData.articles || [];

        if (articles.length === 0) {
          setCards([]);
          return;
        }

        // Ask Gemini AI to summarize articles into structured cards
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-latest:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `Summarize these articles into JSON cards with fields: title, date, summary (include price, technology, future releases), cta, url, category:\n${JSON.stringify(
                        articles.slice(0, 5)
                      )}`
                    }
                  ]
                }
              ]
            })
          }
        );

        const geminiData = await geminiRes.json();
        let aiText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // Clean markdown/code fences
        aiText = aiText.replace(/```json|```/g, "").trim();

        // Safe JSON parse
        let parsed = [];
        try {
          parsed = JSON.parse(aiText);
        } catch (err) {
          console.warn("Failed to parse Gemini AI response:", err);
          // fallback: basic cards from news
          parsed = articles.map((a) => ({
            title: a.title,
            date: a.publishedAt,
            summary: a.description || "",
            cta: "Read Full Article",
            url: a.url,
            category: "Automobile News"
          }));
        }

        setCards(parsed);
      } catch (err) {
        console.error("Error fetching insights:", err);
        setCards([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchNewsAndSummaries();
  }, []);

  return (
    <main className="overview-container">
      {/* HERO SECTION */}
      <section className="overview-hero">
        <motion.h1
          className="overview-hero-title"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          The Journey of Motion: <br />
          <span>AI + Real-Time Auto Market Insights</span>
        </motion.h1>
        <p className="overview-hero-subtext">
          Stay updated with the latest trends in vehicles, pricing, technology, and future releases — summarized live using AI.
        </p>
      </section>

      {/* GRID SECTION */}
      <section className="overview-grid">
        {loading ? (
          <p className="loading-text">Fetching live insights…</p>
        ) : cards.length === 0 ? (
          <p className="error-text">No insights available at the moment.</p>
        ) : (
          cards.map((card, i) => (
            <OverviewCard
              key={i}
              title={card.title}
              date={card.date}
              action={
                <a
                  href={card.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overview-btn"
                >
                  {card.cta || "Read More →"}
                </a>
              }
            >
              {card.summary}
            </OverviewCard>
          ))
        )}
      </section>
    </main>
  );
};

export default OverviewPage;
