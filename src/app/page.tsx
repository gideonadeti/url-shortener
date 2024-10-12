import Header from "./components/Header";
import Main from "./components/Main";

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Main />
    </div>
  );
}
