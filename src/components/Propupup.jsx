import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ProPopup({ show, handleClose, type }) {
  let title = "Action Required";
  let message = "";
  let buttonText = "";
  let buttonLink = "#";

  switch (type) {
    case "undefined":
      title = "Signup Required";
      message = "You need to signup to continue using AI features.";
      buttonText = "Signup";
      buttonLink = "/v1/auth/login";
      break;
    case "notVerified":
      title = "Verification Required";
      message = "Verify your account to get more access.";
      buttonText = "Verify Now";
      buttonLink = "/v1/auth/verification";
      break;
    case "rateLimit":
    default:
      title = "AI Studio Pro";
      message =
        "Upgrade to Pro to enjoy higher usage limits, priority AI generation, and advanced features.";
      buttonText = "Upgrade Now";
      buttonLink = "/v1/upgrade"; // Your upgrade page
      break;
  }

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={handleClose}>
        <div className="flex items-center justify-center min-h-screen p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <Dialog.Panel className="bg-white w-full max-w-md rounded-lg border border-gray-300 shadow-lg p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <Dialog.Title className="text-2xl font-bold text-center mb-4">
              {title}
            </Dialog.Title>
            <Dialog.Description className="text-center text-gray-700 mb-6">
              {message}
            </Dialog.Description>

            <div className="flex justify-center">
              <a
                href={buttonLink}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                {buttonText}
              </a>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
