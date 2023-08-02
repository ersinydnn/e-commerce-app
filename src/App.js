import { useState } from "react";
import Header from "./components/header";
import Lightbox from "./components/lightbox";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { data } from "./data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import minus from "./images/icon-minus.svg";
import plus from "./images/icon-plus.svg";

function App() {
  const [products] = useState(data);
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [slideIndex, setSlideIndex] = useState(1);
  const [showLightbox, setShowLightbox] = useState(false);

  const { mainImage } = products[value];

  const nextSlide = () => {
    if (slideIndex !== products.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === products.length) {
      setSlideIndex(1);
    }
  };

  const previousSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(products.length);
    }
  };

  const handleMinus = () => {
    setAmount(amount - 1);
    if (amount <= 0) setAmount(0);
  };
  const handlePlus = () => {
    setAmount(amount + 1);
  };

  return (
    <>
      <Header />
      {showLightbox && (
        <Lightbox
          products={products}
          slideIndex={slideIndex}
          nextSlide={nextSlide}
          previousSlide={previousSlide}
          setShowLightbox={setShowLightbox}
        />
      )}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:mt-10 lg:place-items-center">
        <article>
          <div className="lg:hidden">
            {products.map((item, index) => (
              <div
                key={index}
                className={slideIndex === index + 1 ? "relative" : "hidden"}
              >
                <img
                  src={item.mainImage}
                  alt=""
                  className="w-full lg:rounded-2xl cursor-pointer"
                  onClick={() => setShowLightbox(true)}
                />
                <ul className="lg:hidden">
                  <li>
                    <button
                      onClick={previousSlide}
                      className="bg-white rounded-full p-5 shadow absolute left-4 top-1/2 -translate-y-1/2"
                    >
                      <FaChevronLeft />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={nextSlide}
                      className="bg-white rounded-full p-5 shadow absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <FaChevronRight />
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <img
              src={mainImage}
              alt=""
              className="w-full lg:w-4/5 lg:rounded-2xl cursor-pointer"
              onClick={() => setShowLightbox(true)}
            />
          </div>

          <ul className="hidden lg:flex items-center justify-start gap-5 space-x-8 mt-5 flex-wrap">
            {products.map((item, index) => (
              <li
                key={item.id}
                onClick={() => setValue(index)}
                className={`${
                  index === value && "border-2 border-orange-400 opacity-80"
                } border-2 cursor-pointer rounded-2xl  overflow-hidden`}
              >
                <img src={item.thumbnail} alt="" className="w-20 rounded-xl " />
              </li>
            ))}
          </ul>
        </article>

        <article className="px-8 pb-10 lg:max-w-md">
          <h2 className="bg-white py-1 px-2 text-orange-400 uppercase tracking-wide text-sm font-bold inline-block  mb-10">
            Sneaker Company
          </h2>
          <h1 className="text-slate-900 mb-10 font-bold text-3xl lg:text-4xl">
            Fall Limited Edition Sneakers
          </h1>
          <p className="text-slate-600 mb-10 leading-relaxed">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className="flex flex-wrap items-center justify-between lg:flex-col lg:items-start lg:gap-2">
            <ul className="flex items-center gap-5">
              <li className="text-slate-900 font-bold text-2xl">$125.00</li>
              <li className="bg-orange-100 py-1 px-2 text-orange-400 tracking-wide text-sm font-bold inline-block rounded shadow">
                50%
              </li>
            </ul>
            <p className="text-gray-300 font-bold text-sm">
              <s>$250.00</s>
            </p>
          </div>
          <div className=" mt-10 lg:flex items-center justify-between gap-4">
            <div className="flex items-center justify-between bg-slate-100 py-2 px-4 rounded shadow lg:flex-1">
              <button className="cursor-pointer" onClick={handleMinus}>
                <img src={minus} alt="" />
              </button>
              <div className="font-bold">{amount}</div>
              <button className="cursor-pointer" onClick={handlePlus}>
                <img src={plus} alt="" />
              </button>
            </div>

            <div className="lg:flex-1 flex-grow">
              <button className="flex items-center justify-center gap-4 bg-orange-500 py-2 px-4 text-white font-bold rounded-lg shadow mt-5 w-full lg:mt-0 hover:bg-orange-600 transition-all duration-200">
                <AiOutlineShoppingCart /> Add to cart
              </button>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
export default App;
