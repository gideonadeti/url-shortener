import React, { useRef } from "react";

import { UrlData } from "../types";

interface ReadFormProps {
  onSuccess: (data: UrlData) => void;
  onError: (error: Error) => void;
  setLoading: (loading: boolean) => void;
}

export default function ReadForm({
  onSuccess,
  onError,
  setLoading,
}: ReadFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleRead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const shortUrl = formData.get("shortUrl") as string;

    if (!shortUrl) {
      onError(new Error("Please enter a short URL."));
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
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        onError(new Error("Something went wrong."));
        return;
      }

      const data = await response.json();

      onSuccess(data.url);

      formRef.current?.reset();
    } catch (error) {
      console.error(error);

      onError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="w-100" onSubmit={handleRead} ref={formRef}>
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
