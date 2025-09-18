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
      <p className="overview-date">{date}</p>
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
        // 1️⃣ Fetch latest news from NewsAPI
        const newsRes = await fetch(
          `https://newsapi.org/v2/everything?q=(car OR bike OR motorcycle OR vehicle OR transport OR road OR highway OR petrol OR diesel OR fuel OR EV OR electric OR automotive OR mobility)&language=en&sortBy=publishedAt&pageSize=5&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        const newsData = await newsRes.json();
        const articles = newsData.articles || [];

        if (articles.length === 0) {
          setCards([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Ask Gemini to summarize news into clean JSON cards
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `Here are the latest automotive/transport/EV/AI-related news articles:\n${JSON.stringify(
                        articles.slice(0, 5)
                      )}\n\nSummarize them into JSON array of cards with fields:
                      { "title": "...", "date": "...", "summary": "...", "cta": "Read Full Article", "url": "...", "category": "..." }.`
                    }
                  ]
                }
              ]
            })
          }
        );

        const geminiData = await geminiRes.json();
        let aiText =
          geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // clean markdown fences if present
        aiText = aiText.replace(/```json|```/g, "").trim();

        let parsed;
        try {
          parsed = JSON.parse(aiText);
        } catch {
          parsed = [];
        }

        setCards(parsed);
      } catch (err) {
        console.error("Error fetching insights:", err);
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
          <span>AI + Real-Time Market Insights</span>
        </motion.h1>
        <p className="overview-hero-subtext">
          Stay updated with the latest trends in vehicles, transport, EVs, and
          policies — summarized live using Google AI.
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
