import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FiCheckCircle, FiStar, FiShield } from "react-icons/fi";

export default function ProPopup({ showProPopup, handleClose }) {
  return (
    <Dialog open={showProPopup} onClose={handleClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen p-4 bg-green-600/10 backdrop-blur-sm backdrop-blur-sm">
        <Dialog.Panel className="bg-white w-full max-w-md border border-gray-300 shadow-lg p-6 relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>

          {/* Header */}
          <Dialog.Title className="text-2xl font-bold text-center mb-4">
            AI Studio Pro
          </Dialog.Title>

          <Dialog.Description className="text-center text-gray-700 mb-6">
            Upgrade to Pro to unlock premium AI features, higher usage limits, and priority generation.
          </Dialog.Description>

          {/* Feature List */}
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <FiCheckCircle className="text-green-500 text-lg" />
              Unlimited AI requests
            </li>
            <li className="flex items-center gap-2">
              <FiStar className="text-yellow-400 text-lg" />
              Priority generation queue
            </li>
            <li className="flex items-center gap-2">
              <FiShield className="text-blue-500 text-lg" />
              Advanced AI features & tools
            </li>
          </ul>

          {/* Upgrade Button */}
          <div className="flex justify-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 w-full">
              Upgrade Now
            </button>
          </div>

          {/* Optional Badge */}
          <div className="absolute top-3 left-3 bg-yellow-100 text-yellow-800 px-2 py-1 text-xs font-semibold rounded-md">
            Recommended
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
