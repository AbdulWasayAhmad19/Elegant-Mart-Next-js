// "use client";

// import React from "react";
// import CategoryPage from "../../CategoryPage";
// import Navbar from "@/app/Navbar";
// import Footer from "@/app/Footer";


// export default function CategoryWrapper({ params }: { params: { categoryName: string } }) {
//   const { categoryName } = params;
//   return <CategoryPage categoryNameParam={categoryName} />;
// }
"use client";

import React from "react";
import CategoryPage from "../../CategoryPage";
import Navbar from "@/app/Navbar";
import Footer from "@/app/Footer";

export default function CategoryWrapper({
  params,
}: {
  params: { categoryName: string };
}) {
  const { categoryName } = params;

  return (
    <>
      <Navbar /> {/* Top */}
      <main className="min-h-screen"> {/* Main content area */}
        <CategoryPage categoryNameParam={categoryName} />
      </main>
      <Footer /> {/* Bottom */}
    </>
  );
}
