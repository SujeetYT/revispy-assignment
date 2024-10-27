
const Options = () => {

  const name = "John"; // first name of the user
  return (
    <div className="w-full flex justify-end items-center py-2 px-8">
      <ul className="flex gap-6">
        <li className="font-light text-sm text-[#333333]">Help</li>
        <li className="font-light text-sm text-[#333333]">Orders & Returns</li>
        <li className="font-light text-sm text-[#333333]">Hi, {name}</li>
      </ul>
    </div>
  );
};

export default Options;