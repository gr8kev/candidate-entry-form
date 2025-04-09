import Home from "./assets/components/Home/Home";
import Layout from "./assets/layout/layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CandidateForm from "./assets/components/Form/candidateForm";
import DisplayBoard from "./assets/components/Dashboard/DisplayBoard";

export default function App() {
  return (
    <div className="pt-2 mt-5">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<CandidateForm />} />
            <Route path="/dashboard" element={<DisplayBoard />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}
