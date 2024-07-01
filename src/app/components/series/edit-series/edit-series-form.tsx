"use client";

import { supprtedColours } from "@/app/components/util";
import { ChangeEvent, FormEvent } from "react";

interface Props {
  modalId: string;
  id: number;
  initialName: string;
  newName: string;
  initialColour: string;
  selectedColour: keyof typeof supprtedColours;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleColourChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const EditSeriesForm = ({
  modalId,
  id,
  initialName,
  newName,
  initialColour,
  selectedColour,
  handleNameChange,
  handleColourChange,
}: Props) => {
  const colours = Object.keys(supprtedColours).map((c) => {
    return c.charAt(0).toUpperCase() + c.slice(1);
  });
  const initialColourSelect =
    initialColour.charAt(0).toUpperCase() + initialColour.slice(1);
  const selectedColourDisplay =
    supprtedColours[
      (selectedColour.charAt(0).toLowerCase() +
        selectedColour.slice(1)) as keyof typeof supprtedColours
    ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", newName);
    formData.append("colour", selectedColour);
    const res = await fetch(`/api/series/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) {
      console.error("Failed to update record");
    }
  };

  return (
    <form onSubmit={handleSubmit} id={`edit-series-form-${id}`} method="dialog">
      <div className="form-control">
        <label className="label" htmlFor="name">
          <span className="label-text text-lg">Name</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Series name"
          className="input input-bordered input-md bg-base-100"
          required
          defaultValue={initialName}
          onChange={handleNameChange}
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="colour">
          <span className="label-text text-lg">Colour</span>
        </label>
        <select
          id="colour"
          name="colour"
          className="select select-bordered select-md bg-base-100"
          defaultValue={initialColourSelect}
          onChange={handleColourChange}
        >
          <option disabled selected>
            Colour
          </option>
          {colours.map((colour) => (
            <option key={colour}>{colour}</option>
          ))}
        </select>
      </div>
      <div className={`w-full h-[20px] ${selectedColourDisplay} mt-1`} />
      <div className="flex justify-end mt-4">
        <div>
          <button
            type="submit"
            form={`edit-series-form-${id}`}
            className="btn btn-primary"
          >
            Confirm
          </button>
        </div>
        <div className="mt-0 ml-4">
          <button
            className="btn outline"
            onClick={(e) => {
              e.preventDefault();
              (document.getElementById(modalId) as any)?.close();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditSeriesForm;
