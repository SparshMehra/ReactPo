// Authors: Lakshay Bansal (A00467478), Marko Ostrovitsa (A00448932)
// Purpose: To display the Contact section of the Woodland Conservation website
import React from "react";
import dayBackground from "../../assets/forest1.png"; // Daytime forest image
import nightBackground from "../../assets/nightforest.png"; // Nighttime forest image
import { FaTree, FaLeaf, FaSeedling, FaMapMarkedAlt } from "react-icons/fa";
import { BsArrowRightCircle } from "react-icons/bs";
import Review from "../UI/Review";
import GridContainer from "../UI/GridContainer";
import HeadingAndText from "../UI/HeadingAndText";

const Homepage = ({ dark }) => {
  return (
    <div
      className={`flex flex-col min-h-screen bg-cover bg-center transition-all duration-500`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${
          dark ? nightBackground : dayBackground
        })`,
      }}
    >
      {/* Header Section */}
      <section className="text-center text-white py-20 px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-md">
          Woodland Conservation Area
        </h1>
        <p className="text-xl md:text-3xl max-w-3xl mx-auto drop-shadow-md">
          Immerse yourself in nature's wonders. Discover. Learn. Protect.
        </p>
        <button
          className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 mt-6 rounded-full shadow-lg font-semibold transition"
          onClick={() => alert("Explore Section Coming Soon!")}
        >
          Explore Now
        </button>
      </section>

      {/* Main Sections */}
      <section className="flex-1 text-gray-900 bg-white/80 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Interactive Cards */}
          <div className="text-center bg-green-100/70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaTree className="text-green-600 text-5xl mx-auto mb-4" />
            <HeadingAndText
              headingType="tertiaryHeading"
              hLabel=" Explore Nature"
              verticalGap="4"
              pLabel=" Discover trails, wildlife, and serene spots for relaxation."
            />
            <button
              className="text-green-600 hover:text-green-800 mt-4 inline-flex items-center"
              onClick={() => alert("Nature Exploration Section Coming Soon!")}
            >
              Learn More <BsArrowRightCircle className="ml-2" />
            </button>
          </div>
          <div className="text-center bg-blue-100/70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaLeaf className="text-blue-600 text-5xl mx-auto mb-4" />
            <HeadingAndText
              headingType="tertiaryHeading"
              hLabel=" Conservation Education"
              verticalGap="4"
              pLabel=" Attend workshops on sustainability and biodiversity."
            />
            <button
              className="text-blue-600 hover:text-blue-800 mt-4 inline-flex items-center"
              onClick={() => alert("Education Section Coming Soon!")}
            >
              Learn More <BsArrowRightCircle className="ml-2" />
            </button>
          </div>
          <div className="text-center bg-yellow-100/70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaSeedling className="text-yellow-600 text-5xl mx-auto mb-4" />
            <HeadingAndText
              headingType="tertiaryHeading"
              hLabel=" Volunteer & Support"
              verticalGap="4"
              pLabel="Join us in tree-planting events or contribute to our cause."
            />
            <button
              className="text-yellow-600 hover:text-yellow-800 mt-4 inline-flex items-center"
              onClick={() => alert("Volunteer Section Coming Soon!")}
            >
              Learn More <BsArrowRightCircle className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="bg-green-600/90 text-white py-16 px-8">
        <h2 className="primaryHeading text-center mb-6">Quick Facts</h2>
        {/* <div className=" mx-auto grid md:grid-cols-3 gap-8 text-center"> */}
        <GridContainer gridCols="3" gap="8" className="text-center ">
          <div>
            <HeadingAndText
              headingType="primaryHeading"
              hLabel="500+"
              verticalGap="1"
              pLabel=" Acres of Protected Land"
            />
          </div>
          <div>
            <HeadingAndText
              headingType="primaryHeading"
              hLabel="200+"
              verticalGap="1"
              pLabel=" Wildlife Species"
            />
          </div>
          <div>
            <HeadingAndText
              headingType="primaryHeading"
              hLabel="1000+"
              verticalGap="1"
              pLabel=" Annual Visitors"
            />
          </div>
        </GridContainer>
        {/* </div> */}
      </section>

      {/* Visitor Reviews Section */}
      <section className="py-12 px-6 bg-white">
        <h2 className="primaryHeading text-center mb-6">What Visitors Say</h2>
        <GridContainer>
          <Review
            label="A serene and beautiful place to connect with nature. My kids loved
          the guided tour!"
            author="Enuktwu"
          ></Review>
          <Review
            label="The workshops on conservation were enlightening and fun!"
            author="Inuit"
          ></Review>
        </GridContainer>
      </section>

      {/* Interactive Map Section */}
      <section className="bg-gray-900 text-white py-16 px-8">
        <div className="text-center mb-6">
          <FaMapMarkedAlt className="text-6xl mx-auto mb-4 text-green-400" />
          <HeadingAndText
            headingType="primaryHeading"
            hLabel="Interactive Map"
            verticalGap="2"
            pLabel=" Plan your visit with our interactive site map. Explore trails,
            picnic areas, and more."
          />
        </div>
        <button
          className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full shadow-lg font-semibold transition mx-auto block"
          onClick={() => alert("Map Feature Coming Soon!")}
        >
          View Map
        </button>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-green-700 text-white py-16 px-8 text-center">
        <HeadingAndText
          headingType="primaryHeading"
          hLabel="Become a Conservation Partner"
          verticalGap="2"
          pLabel=" Help us protect the environment. Become a member today and make a
          difference."
        />
        <button
          className="bg-white text-green-600 font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-lg hover:bg-gray-200 transition"
          onClick={() => alert("Membership Coming Soon!")}
        >
          Join Us
        </button>
      </section>
    </div>
  );
};

export default Homepage;
