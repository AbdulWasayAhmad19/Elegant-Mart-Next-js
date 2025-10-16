import Navbar from "../Navbar";
import Footer from "../Footer";
import AllProducts from "../All-Products";

export default function allProducts() {

  return (
    <>
      <Navbar />
      <main>
        <AllProducts />
      </main>
      <Footer />
    </>
  );
}