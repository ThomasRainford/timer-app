interface Props {
  icon: React.ReactNode;
  onClick: () => void;
  hoverColour: string;
}

const TimerActionButton = ({ icon, onClick, hoverColour }: Props) => {
  return (
    <div
      className={`btn btn-outline btn-square ${hoverColour}`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default TimerActionButton;
