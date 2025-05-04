import { RxCross2 } from "react-icons/rx";

export const ErrorMessage = ({ message }) => (
  <div className="mt-4 flex justify-center items-center mx-auto text-center text-red-500 font-semibold">

       <p><RxCross2></RxCross2></p> <span>{message || 'City could not be found. Please try again.'}</span>
</div>  );
  