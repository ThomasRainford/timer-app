import CreateSeriesForm from "@/app/components/series/create-series/create-series-form";

const Create = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-base-content">Create Series</h1>
      </div>
      <div className="w-full md:w-[70%] lg:w-[50%] ">
        <CreateSeriesForm />
      </div>
    </>
  );
};

export default Create;
