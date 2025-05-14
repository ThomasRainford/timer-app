import { PlusIcon } from "../components/icons";

const Loading = () => {
  return (
    <div className="flex flex-col h-auto overflow-y-hidden px-2 md:px-4 mt-2">
      <div className="mb-4">
        <button className="btn btn-primary w-full md:w-[30%] text-md" disabled>
          <PlusIcon size={6} />
          Create New Series
        </button>
      </div>
      <div className="skeleton h-[228px] md:w-[450px] lg:w-[360px] mt-2"></div>
    </div>
  );
};

export default Loading;
