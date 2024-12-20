import React from "react";
import { FiSend } from "react-icons/fi";

const ChatForm = ({
  input,
  sendMessage,
  setInput,
  startListening,
  useUnaApi,
  handleGeneralClick,
  handleUnaClick,
  placeholder,
}) => {
  return (
    <form
      onSubmit={sendMessage}
      className="flex flex-col sm:w-9/12 w-11/12 fixed sm:bottom-20 bottom-20 lg:bottom-20 left-1/2 transform -translate-x-1/2 rounded-xl overflow-hidden sm:h-28 h-24"
    >
      <div className="flex text-xs sm:text-sm h-12 gap-4">
        <button
          type="button"
          onClick={handleGeneralClick}
          className={`sm:w-4/12 md:w-3/12 w-4/12 border-none mb-2 px-2 py-2 rounded-full cursor-pointer transition-colors font-semibold duration-300 ease-in-out shadow-md ${
            useUnaApi
              ? "bg-[#f1f1f1] hover:bg-[#f1f1f1c8]  text-[#0a4c5a]"
              : "text-[#f1f1f1] bg-[#0a4c5a] hover:bg-[#083a45]"
          }`}
        >
          أسئلة عامة
        </button>
        <button
          type="button"
          onClick={handleUnaClick}
          className={`sm:w-4/12 md:w-3/12 w-4/12 border-none mb-2 px-2 py-2 rounded-full cursor-pointer transition-colors font-semibold duration-300 ease-in-out shadow-md ${
            !useUnaApi
              ? "bg-[#f1f1f1] hover:bg-[#f1f1f1c8] text-[#0a4c5a]"
              : "text-[#f1f1f1] bg-[#0a4c5a] hover:bg-[#083a45]"
          }`}
        >
          (UNA) أسئلة
        </button>
      </div>
      {/* <form onSubmit={sendMessage} className="chat-input-form"> */}

      <div className="form-question-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-10/12 sm:h-14 h-12 my-auto rounded-full px-7 py-2 text-right outline-none bg-[#f1f1f1]"
        />
        <div className="flex justify-between ml-2">
          <button
            type="submit"
            className="h-10 w-10 rounded-full mr-1 my-auto  bg-[#156d7c] hover:bg-[#174952]"
          >
            {/* <button type="submit" className="send-button"> */}
            {/* <FiSend /> */}
            <img
              src="../send.png"
              alt="ميكروفون"
              className="sm:w-4 sm:h-4 w-3 h-3 m-auto"
            />
          </button>
          <button
            className="h-10 w-10 rounded-full my-auto  bg-[#156d7c] hover:bg-[#174952]"
            // className="h-10 w-10 rounded-full my-auto "
            // className=" bg-[#156d7c]  hover:bg-[#174952] h-14 my-auto rounded-r-xl w-6/12"
            type="button"
            onMouseDown={startListening}
            // className="microphone-button"
          >
            <img
              src="../microphone.png"
              alt="ميكروفون"
              // className="sm:w-5 sm:h-5 w-4 h-4 m-auto"
              className="sm:w-4 sm:h-4 w-3 h-3 m-auto"
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatForm;
{
  /* <div className="">
{/* <div className="api-toggle-buttons-container "> */
}
