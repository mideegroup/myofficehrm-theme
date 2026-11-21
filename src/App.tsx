import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Toaster } from "./components/ui/sonner";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Ui from "./pages/Ui";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
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
        <Route path="/ui" element={<Ui />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Toaster />
    </Layout>
  );
}
