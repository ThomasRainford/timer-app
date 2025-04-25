interface Props {
  colour: string;
}

const ColourDisplay = ({ colour }: Props) => {
  return <div className={`w-full h-[20px] ${colour} rounded mt-1`} />;
};

export default ColourDisplay;
