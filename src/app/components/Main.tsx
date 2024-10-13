"use client";

import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow, format } from "date-fns";

interface ReadData {
  id: string;
  longUrl: string;
  shortUrl: string;
  shortId: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function Main() {
  const [method, setMethod] = useState("create");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [readData, setReadData] = useState<ReadData>();
  const [message, setMessage] = useState("");

  const createFormRef = useRef<HTMLFormElement>(null);
  const readFormRef = useRef<HTMLFormElement>(null);

  // Whenever user changes method, reset states
  useEffect(() => {
    setError("");
    setMessage("");
    setShortUrl("");
    setReadData(undefined);
  }, [method]);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const longUrl = formData.get("longUrl") as string;

    if (!longUrl) {
      setError("Please enter long URL.");
      return;
    } else if (longUrl.length < 50) {
      setError("Long URL must be at least 50 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      setShortUrl("");
      setReadData(undefined);

      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      const shortUrl = await response.json();
      setShortUrl(shortUrl);
      createFormRef.current?.reset();
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

    const shortId = shortUrl.split("/").pop();

    if (!shortId) {
      setError("Invalid short URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      setShortUrl("");
      setReadData(undefined);

      const response = await fetch(`/api/${shortId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      setReadData(data);
      readFormRef.current?.reset();
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
    } else if (longUrl.length < 50) {
      setError("Long URL must be at least 50 characters.");
      return;
    }

    const shortId = shortUrl.split("/").pop();

    if (!shortId) {
      setError("Invalid short URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      setShortUrl("");
      setReadData(undefined);

      const response = await fetch(`/api/${shortId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update URL.");
      }

      setMessage("Long URL updated successfully.");
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const shortUrl = formData.get("shortUrl") as string;

    if (!shortUrl) {
      setError("Please enter short URL.");
      return;
    }

    const shortId = shortUrl.split("/").pop();

    if (!shortId) {
      setError("Invalid short URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      setShortUrl("");
      setReadData(undefined);

      const response = await fetch(`/api/${shortId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update URL.");
      }

      setMessage("Short URL deleted successfully.");
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
          <form className="w-100" onSubmit={handleRead} ref={readFormRef}>
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
          <form className="w-100" onSubmit={handleDelete}>
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

        <div className="d-flex flex-column align-items-center gap-1">
          {loading && <div className="spinner-border"></div>}
          {error && <div className="text-danger">{error}</div>}
          {shortUrl && (
            <div>
              Short URL:{" "}
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-decoration-none"
              >
                {shortUrl}
              </a>
            </div>
          )}
          {readData && (
            <table className="table table-bordered">
              <tbody>
                {Object.entries(readData).map(([key, value]) => (
                  <tr key={key}>
                    <td>
                      <strong>{key}</strong>
                    </td>
                    <td>
                      {typeof value === "string" &&
                      (key === "longUrl" || key === "shortUrl") ? (
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          {value}
                        </a>
                      ) : key === "createdAt" || key === "updatedAt" ? (
                        `${format(
                          value,
                          "EEE, MMM d, yyyy, hh:mm:ss a"
                        )} (${formatDistanceToNow(value, {
                          addSuffix: true,
                        })})`
                      ) : (
                        value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {message && <div className="text-success">{message}</div>}
        </div>
      </div>
    </main>
  );
}
