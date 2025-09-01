type RadioProps = React.InputHTMLAttributes<HTMLInputElement>;

const Radio = (props: RadioProps) => {
  return (
    <input
      type="radio"
      {...props}
      className="appearance-none h-5 w-5 mr-2
      rounded-full border-[2px] border-blue-300 checked:bg-white
      relative
      before:content-[''] before:absolute 
      before:inset-1 before:rounded-full 
      before:bg-blue-800 before:scale-0
      checked:before:scale-100
      cursor-pointer
      transition"
    />
  );
};

export default Radio;
