import { ChevronLeft, ChevronRight } from "lucide-react";

const Note = () => {
  return (
    <div className="bg-[#F4F4F4] flex  justify-center items-center gap-6 p-1">
      <ChevronLeft />
      <p>Get 10% off on business sign up</p>
      <ChevronRight />
    </div>
  );
};

export default Note;