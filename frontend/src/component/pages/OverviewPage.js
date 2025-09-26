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
        const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
        const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

        if (!NEWS_API_KEY || !GEMINI_API_KEY) {
          console.error("Missing API keys! Check your environment variables.");
          setLoading(false);
          return;
        }

        // Fetch latest automotive news
        const newsRes = await fetch(
          `https://newsapi.org/v2/everything?q=(car OR vehicle OR EV OR "vehicle price" OR "vehicle technology" OR "future release")&language=en&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_API_KEY}`
        );
        const newsData = await newsRes.json();
        const articles = newsData.articles || [];

        if (!articles.length) {
          console.warn("No articles fetched from NewsAPI.");
          setCards([]);
          setLoading(false);
          return;
        }

        // Log fetched articles for debugging
        console.log("Fetched articles:", articles);

        // Summarize with Gemini AI
        const prompt = `
Summarize these articles into JSON cards with fields: 
title, date, summary (include vehicle price, technology used, future releases), cta, url, category.
Articles data:
${JSON.stringify(articles)}
`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: prompt }] }]
            })
          }
        );

        const geminiData = await geminiRes.json();
        console.log("Gemini response:", geminiData);

        let aiText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        aiText = aiText.replace(/```json|```/g, "").trim();

        let parsedCards = [];
        try {
          parsedCards = JSON.parse(aiText);
          if (!Array.isArray(parsedCards) || parsedCards.length === 0) {
            throw new Error("Parsed Gemini JSON is empty or invalid.");
          }
        } catch (err) {
          console.warn("Failed to parse Gemini AI response. Using fallback cards.", err);
          parsedCards = articles.map((a) => ({
            title: a.title,
            date: a.publishedAt,
            summary: a.description || "No summary available",
            cta: "Read Full Article",
            url: a.url,
            category: "Automobile News"
          }));
        }

        setCards(parsedCards);
      } catch (err) {
        console.error("Error fetching or summarizing articles:", err);
        setCards([]);
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
          Stay updated with the latest trends in vehicles, pricing, technology, and future releases — summarized live using AI.
        </p>
      </section>

      {/* GRID SECTION */}
      <section className="overview-grid">
        {loading ? (
          <p className="loading-text">Fetching live insights…</p>
        ) : !cards.length ? (
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
