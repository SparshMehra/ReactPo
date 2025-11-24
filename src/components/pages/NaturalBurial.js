/**
 * Homepage Component
 *
 * @file NaturalBurial.js
 * @author: S M Riyad Farhan (A00470224)
 * @description Modern Natural Burial page with improved transition and audio
 *
 * Features:
 * - Clear design for readability
 * - Accordion sections for content organization
 * - Text-to-speech integration for accessibility
 * - Responsive layout with Tailwind CSS
 * 
 *
 * @param {boolean} dark - Current dark mode state
 * @returns {JSX.Element} Natural Burial page with comprehensive animations and modern UI
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Speaker from "../UI/Speaker";

const NaturalBurial = () => {
  const [accordionState, setAccordionState] = useState({
    whatIsNaturalBurial: false,
    benefits: false,
    process: false,
    environmental: false,
  });

  // Toggle accordion state
  const toggleAccordion = (section) => {
    setAccordionState((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const additionStyles = "bg-yellow-400 ml-4 rounded-full p-5";
  const smallAdditionStyles = "bg-yellow-400 ml-4 rounded-full p-2 text-lg w-10 h-10 flex items-center justify-center";

  return (
    <div className="p-8 bg-white dark:bg-darkerBlue text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <div className="flex items-center justify-center w-full mb-10">
        <h1 className="primaryHeading text-center flex-1">Natural Burial</h1>
        <Speaker
          content={`Welcome to our Natural Burial page. Natural burial is an environmentally conscious way to return to the earth, honoring both the deceased and the environment. At St. Margaret's Bay Area Woodland Conservation Site, we offer a peaceful and sustainable option for those seeking to rest in harmony with nature. `}
          additionalStyles={additionStyles}
        />
      </div>

      {/* Introduction Section */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="secondaryHeading mb-6">A Return to Nature</h2>
        <p className="leading-relaxed mb-8">
          Natural burial represents a meaningful choice for those who wish to
          return to the earth in the most environmentally responsible way. This
          practice honors the cycles of nature while creating a lasting legacy
          within our woodland conservation site.
        </p>
      </div>

      {/* Accordion Section */}
      <div className="w-full max-w-4xl mb-12">
        {/* What is Natural Burial */}
        <div className="mb-4">
          <button
            className="flex justify-between w-full p-4 bg-gray-100 dark:bg-gray-800 text-2xl font-semibold rounded-lg shadow-md focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => toggleAccordion("whatIsNaturalBurial")}
          >
            <span className="secondaryHeading">What is Natural Burial?</span>
            {accordionState.whatIsNaturalBurial ? (
              <AiOutlineMinus className="text-3xl" />
            ) : (
              <AiOutlinePlus className="text-3xl" />
            )}
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              accordionState.whatIsNaturalBurial ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-b-lg shadow-md">
              
                <Speaker
                  content={' Natural burial is a simple, affordable, and environmentally responsible way to be laid to rest. It typically involves: burial in a biodegradable casket, shroud, or other natural container. There is no embalming or chemical preservatives, and no concrete vaults or liners; bodies are placed directly in the earth to allow natural decomposition, often with native plantings or trees to mark the resting place. '}
                  additionalStyles={smallAdditionStyles}

                />
              <p className="mb-4">
                Natural burial is a simple, affordable, and environmentally
                responsible way to be laid to rest. It typically involves:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  Burial in a biodegradable casket, shroud, or other natural
                  container
                </li>
                <li>No embalming or chemical preservatives</li>
                <li>No concrete vaults or liners</li>
                <li>
                  Direct placement in the earth, allowing natural decomposition
                </li>
                <li>Native plantings or trees to mark the resting place</li>
              </ul>
              <p>
                This approach creates a living memorial while allowing your body
                to nourish the ecosystem you've loved.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-4">
          <button
            className="flex justify-between w-full p-4 bg-gray-100 dark:bg-gray-800 text-2xl font-semibold rounded-lg shadow-md focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => toggleAccordion("benefits")}
          >
            <span className="secondaryHeading">Benefits of Natural Burial</span>
            {accordionState.benefits ? (
              <AiOutlineMinus className="text-3xl" />
            ) : (
              <AiOutlinePlus className="text-3xl" />
            )}
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              accordionState.benefits ? "max-h-screen" : "max-h-0"
            }`}
          >
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-b-lg shadow-md">
              <Speaker 
                content={' Choosing natural burial offers numerous benefits: it minimizes environmental impact by avoiding toxic chemicals and non-biodegradable materials; it is often more affordable than traditional burial methods; it allows for a personal legacy by contributing to the conservation site\'s biodiversity; and it fosters a spiritual connection with nature through the cycle of life and renewal. '}
                  additionalStyles={smallAdditionStyles}

              />
              <div className="space-y-3">
                <div>
                  <h3 className="tertiaryHeading mb-2">Environmental Impact</h3>
                  <p>
                    Natural burial eliminates the need for toxic embalming
                    fluids and reduces carbon emissions through simplified
                    practices.
                  </p>
                </div>
                <div>
                  <h3 className="tertiaryHeading mb-2">Economic Benefits</h3>
                  <p>
                    Natural burial is typically more affordable than
                    conventional funeral arrangements, eliminating costs for
                    vaults and extensive services.
                  </p>
                </div>
                <div>
                  <h3 className="tertiaryHeading mb-2">Personal Legacy</h3>
                  <p>
                    Your body becomes part of the ecosystem, supporting plant
                    life and contributing to the conservation site's biodiversity.
                  </p>
                </div>
                <div>
                  <h3 className="tertiaryHeading mb-2">Spiritual Connection</h3>
                  <p>
                    Many find deep meaning in returning to nature and being
                    part of the endless cycle of life and renewal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Process */}
        <div className="mb-4">
          <button
            className="flex justify-between w-full p-4 bg-gray-100 dark:bg-gray-800 text-2xl font-semibold rounded-lg shadow-md focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => toggleAccordion("process")}
          >
            <span className="secondaryHeading">The Natural Burial Process</span>
            {accordionState.process ? (
              <AiOutlineMinus className="text-3xl" />
            ) : (
              <AiOutlinePlus className="text-3xl" />
            )}
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              accordionState.process ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-b-lg shadow-md">
              <Speaker
                content={' The natural burial process is straightforward and respectful. It typically involves preparing the body without embalming, selecting a biodegradable container, holding a memorial service at the woodland site, and placing the body in a shallow grave to facilitate natural decomposition. A living memorial, such as a native tree or wildflower planting, often marks the burial site, creating a lasting tribute that contributes to the health of the ecosystem. '}
                  additionalStyles={smallAdditionStyles}
              />
              <ol className="list-decimal list-inside space-y-3">
                <li className="mb-2">
                  <strong className="tertiaryHeading">Preparation:</strong> The body is kept cool without
                  embalming. Simple washing and dressing in natural fabrics is
                  common.
                </li>
                <li className="mb-2">
                  <strong className="tertiaryHeading">Selection of Container:</strong> Choose from
                  biodegradable caskets, shrouds, or wooden boxes made from
                  sustainably sourced materials.
                </li>
                <li className="mb-2">
                  <strong className="tertiaryHeading">Memorial Service:</strong> Hold a meaningful ceremony
                  at our woodland site, celebrating the person's life in a
                  natural setting.
                </li>
                <li className="mb-2">
                  <strong className="tertiaryHeading">Burial:</strong> The body is placed in a shallow grave
                  (typically 3-4 feet deep) to facilitate decomposition and root
                  contact.
                </li>
                <li className="mb-2">
                  <strong className="tertiaryHeading">Living Memorial:</strong> A native tree or wildflower
                  planting marks the burial site, creating a living memorial for
                  generations.
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="mb-4">
          <button
            className="flex justify-between w-full p-4 bg-gray-100 dark:bg-gray-800 text-2xl font-semibold rounded-lg shadow-md focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => toggleAccordion("environmental")}
          >
            <span className="secondaryHeading">Our Environmental Commitment</span>
            {accordionState.environmental ? (
              <AiOutlineMinus className="text-3xl" />
            ) : (
              <AiOutlinePlus className="text-3xl" />
            )}
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              accordionState.environmental ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-b-lg shadow-md">
              <Speaker
              content={' The natural burial process is designed to minimize environmental impact while promoting ecological health. At our woodland conservation site, we have implemented several practices to ensure that our natural burial grounds support local biodiversity and ecosystem function. '}
              additionalStyles={smallAdditionStyles}
              />
              <p className="mb-4">
                At St. Margaret's Bay Area Woodland Conservation Site, we've
                carefully designed our natural burial grounds to integrate
                seamlessly with the existing ecosystem:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Designated areas that respect wildlife habitats and migration
                  patterns
                </li>
                <li>
                  Selection of native plant species that enhance biodiversity
                </li>
                <li>
                  Preservation of natural water cycles and soil health
                </li>
                <li>
                  Ongoing monitoring to ensure ecological balance and recovery
                </li>
                <li>
                  Educational opportunities for visitors to learn about
                  conservation and natural burial practices
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-4xl mt-12 mb-8 bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
        <h2 className="secondaryHeading mb-4">Interested in Natural Burial?</h2>
        <p className="mb-4">
          For more information about natural burial options at our woodland
          conservation site, please <Link to="/contact" className="text-blue-600 underline">contact us</Link> or visit our contact page.
        </p>
        <p>
          We're here to help you make this meaningful choice for yourself or your
          loved ones.
        </p>
      </div>
    </div>
  );
};

export default NaturalBurial;
