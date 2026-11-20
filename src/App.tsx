import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Demo from "./pages/Demo";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "instant" });
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
