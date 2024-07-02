"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col align-middle justify-center prose h-[100%] px-4 overflow-y-hidden">
      <h2 className="text-2xl text-center mb-4">Something went wrong!</h2>
      <div className="flex justify-center">
        <button
          className="btn btn-error"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
