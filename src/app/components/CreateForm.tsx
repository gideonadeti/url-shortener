import React, { useRef } from "react";

import { UrlData } from "../types";

interface CreateFormProps {
  onSuccess: (data: Partial<UrlData>, message?: string) => void;
  onError: (error: Error) => void;
  startFetching: () => void;
  stopFetching: () => void;
}

export default function CreateForm({
  onSuccess,
  onError,
  startFetching,
  stopFetching,
}: CreateFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const longUrl = formData.get("longUrl") as string;

    if (!longUrl) {
      onError(new Error("Please enter a long URL."));
      return;
    } else if (longUrl.length < 50) {
      onError(new Error("Long URL must be at least 50 characters."));
      return;
    }

    try {
      startFetching();

      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();

      onSuccess(data, "");

      formRef.current?.reset();
    } catch (error) {
      onError(error as Error);
    } finally {
      stopFetching();
    }
  }

  return (
    <form className="w-100" ref={formRef} onSubmit={handleCreate}>
      <div className="form-floating mb-3">
        <input
          type="url"
          className="form-control"
          name="longUrl"
          id="longUrl"
          placeholder="Enter long URL"
        />
        <label htmlFor="longUrl">Paste or enter long URL</label>
        <button
          type="submit"
          className="btn position-absolute top-0 bottom-0 end-0 border border-start-0 rounded-end bg-white"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          <i className="bi-play fs-3"></i>
        </button>
      </div>
    </form>
  );
}
