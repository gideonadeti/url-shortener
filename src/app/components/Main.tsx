"use client";

import { useState, useRef } from "react";

export default function Main() {
  const [method, setMethod] = useState("create");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [readData, setReadData] = useState<{
    id: string;
    longUrl: string;
    shortUrl: string;
    usageCount: number;
    createdAt: string;
    updatedAt: string;
  }>();
  const [message, setMessage] = useState("");

  const createFormRef = useRef<HTMLFormElement>(null);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const longUrl = formData.get("longUrl") as string;

    if (!longUrl) {
      setError("Please enter long URL.");
      return;
    } else if (longUrl.length < 100) {
      setError("Long URL must be at least 100 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      const { shortUrl } = await response.json();
      setShortUrl(shortUrl);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const shortUrl = formData.get("shortUrl") as string;

    if (!shortUrl) {
      setError("Please enter short URL.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api:${shortUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setReadData(data);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const shortUrl = formData.get("shortUrl") as string;
    const longUrl = formData.get("longUrl") as string;

    if (!shortUrl) {
      setError("Please enter short URL.");
      return;
    } else if (!longUrl) {
      setError("Please enter long URL.");
      return;
    } else if (longUrl.length < 100) {
      setError("Long URL must be at least 100 characters.");
      return;
    }

    try {
      setLoading(true);

      await fetch(`/api:${shortUrl}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      setMessage("Long URL updated successfully.");
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-fluid flex-grow-1 mt-5">
      <div
        className="container d-flex flex-column align-items-center"
        style={{ maxWidth: "540px" }}
      >
        <select
          className="form-select mb-3"
          onChange={({ target }) => setMethod(target.value)}
        >
          <option value="create">Create</option>
          <option value="read">Read</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
        {method === "create" && (
          <form className="w-100" ref={createFormRef} onSubmit={handleCreate}>
            <div className="form-floating mb-3">
              <input
                type="url"
                className="form-control"
                name="longUrl"
                id="longUrl"
                placeholder=""
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
        )}
        {method === "read" && (
          <form className="w-100" onSubmit={handleRead}>
            <div className="form-floating mb-3">
              <input
                type="url"
                className="form-control"
                name="shortUrl"
                id="shortUrl"
                placeholder=""
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
        )}
        {method === "update" && (
          <form className="w-100" onSubmit={handleUpdate}>
            <div className="form-floating mb-3">
              <input
                type="url"
                className="form-control"
                name="shortUrl"
                id="shortUrl"
                placeholder=""
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
            <div className="form-floating mb-3">
              <input
                type="url"
                className="form-control"
                name="longUrl"
                id="longUrl"
                placeholder=""
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
        )}
        {method === "delete" && (
          <form className="w-100">
            <div className="form-floating mb-3">
              <input
                type="url"
                className="form-control"
                name="shortUrl"
                id="shortUrl"
                placeholder=""
              />
              <label htmlFor="shortUrl">
                Paste or enter short URL{" "}
                <small className="text-danger form-text">
                  (Note: This cannot be undone)
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
        )}

        <div>
          {error && <div className="text-danger">{error}</div>}
          {loading && <div className="spinner-border"></div>}
          {shortUrl && (
            <div className="alert alert-success">
              Short URL:{" "}
              <a href={shortUrl} target="_blank" rel="noreferrer noopener">
                {shortUrl}
              </a>
            </div>
          )}
          {readData && (
            <div className="alert alert-success">
              id: {readData.id}
              Long URL:{" "}
              <a
                href={readData.longUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {readData.longUrl}
              </a>
              Short URL:{" "}
              <a
                href={readData.shortUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {readData.shortUrl}
              </a>
              usageCount: {readData.usageCount}
              createdAt: {readData.createdAt}
              updatedAt: {readData.updatedAt}
            </div>
          )}
          {message && <div className="text-success">{message}</div>}
        </div>
      </div>
    </main>
  );
}
