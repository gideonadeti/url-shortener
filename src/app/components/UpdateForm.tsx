import React, { useRef } from "react";

import { UrlData } from "../types";

interface UpdateFormProps {
  onSuccess: (data: Partial<UrlData>, message?: string) => void;
  onError: (error: Error) => void;
  setLoading: (loading: boolean) => void;
}

export default function UpdateForm({
  onSuccess,
  onError,
  setLoading,
}: UpdateFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const shortUrl = formData.get("shortUrl") as string;
    const longUrl = formData.get("longUrl") as string;

    if (!shortUrl) {
      onError(new Error("Please enter a short URL."));
      return;
    } else if (!longUrl) {
      onError(new Error("Please enter a long URL."));
      return;
    } else if (longUrl.length < 50) {
      onError(new Error("Long URL must be at least 50 characters."));
      return;
    }

    const shortId = shortUrl.split("/").pop();

    if (!shortId) {
      onError(new Error("Invalid short URL."));
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api/${shortId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();

      onSuccess({}, data.message);

      formRef.current?.reset();
    } catch (error) {
      console.error(error);

      onError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="w-100" onSubmit={handleUpdate} ref={formRef}>
      <div className="form-floating mb-3">
        <input
          type="url"
          className="form-control"
          name="shortUrl"
          id="shortUrl"
          placeholder="Enter short URL"
          required
        />
        <label htmlFor="shortUrl">Paste or enter short URL</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="url"
          className="form-control"
          name="longUrl"
          id="longUrl"
          placeholder="Enter new long URL"
          required
        />
        <label htmlFor="longUrl">
          Paste or enter new long URL{" "}
          <small className="form-text">
            (Note: Old long URL will be replaced)
          </small>
        </label>
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
