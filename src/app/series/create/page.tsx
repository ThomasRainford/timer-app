import CreateSeriesForm from "@/app/components/series/create-series/create-series-form";

const Create = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-base-200 m-3 p-3 py-4 rounded h-full md:h-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-base-content">Create Series</h1>
      </div>
      <div className="w-full md:w-[70%] lg:w-[50%] ">
        <CreateSeriesForm />
      </div>
    </div>
  );
};

export default Create;
