interface Props {
  icon: React.ReactNode;
  onClick: () => void;
  hoverColour: string;
}

const TimerActionButton = ({ icon, onClick, hoverColour }: Props) => (
  <div className="flex items-center">
    <div
      className={`btn btn-outline btn-square ${hoverColour}`}
      onClick={onClick}
    >
      {icon}
    </div>
  </div>
);

export default TimerActionButton;
