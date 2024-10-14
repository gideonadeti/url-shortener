"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow, format } from "date-fns";

import { Method } from "../types";
import { UrlData } from "../types";
import CreateForm from "./CreateForm";
import ReadForm from "./ReadForm";
import UpdateForm from "./UpdateForm";
import DeleteForm from "./DeleteForm";

export default function Main() {
  const [method, setMethod] = useState<Method>("create");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [urlData, setUrlData] = useState<UrlData | null>(null);
  const [message, setMessage] = useState<string>("");

  // Reset states when method changes
  useEffect(() => {
    resetStates();
  }, [method]);

  function resetStates() {
    setError("");
    setMessage("");
    setUrlData(null);
  }

  function startFetching() {
    resetStates();
    setLoading(true);
  }

  function stopFetching() {
    setLoading(false);
  }

  const handleSuccess = (data: Partial<UrlData>, message?: string) => {
    setLoading(false);
    setError("");
    setMessage(message || "");
    setUrlData(data as UrlData);
  };

  const handleError = (err: Error, defaultMsg: string) => {
    console.error(err);
    setError(err.message || defaultMsg);
    setLoading(false);
  };

  return (
    <main className="container-fluid flex-grow-1 mt-5">
      <div
        className="container d-flex flex-column align-items-center"
        style={{ maxWidth: "540px" }}
      >
        <select
          className="form-select mb-3"
          value={method}
          onChange={({ target }) => setMethod(target.value as Method)}
        >
          <option value="create">Create</option>
          <option value="read">Read</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>

        {method === "create" && (
          <CreateForm
            onSuccess={handleSuccess}
            onError={(err) =>
              handleError(err, "An error occurred. Please try again.")
            }
            startFetching={startFetching}
            stopFetching={stopFetching}
          />
        )}

        {method === "read" && (
          <ReadForm
            onSuccess={handleSuccess}
            onError={(err) =>
              handleError(err, "An error occurred. Please try again.")
            }
            setLoading={setLoading}
          />
        )}

        {method === "update" && (
          <UpdateForm
            onSuccess={(data) =>
              handleSuccess(data, "Long URL updated successfully.")
            }
            onError={(err) =>
              handleError(err, "An error occurred. Please try again.")
            }
            setLoading={setLoading}
          />
        )}

        {method === "delete" && (
          <DeleteForm
            onSuccess={() =>
              handleSuccess({}, "Short URL deleted successfully.")
            }
            onError={(err) =>
              handleError(err, "An error occurred. Please try again.")
            }
            setLoading={setLoading}
          />
        )}

        <div className="d-flex flex-column align-items-center gap-1 mt-3">
          {loading && <div className="spinner-border" role="status"></div>}
          {error && <div className="text-danger">{error}</div>}
          {urlData && (
            <table className="table table-bordered">
              <tbody>
                {Object.entries(urlData).map(([key, value]) => (
                  <tr key={key}>
                    <td>
                      <strong>{key}</strong>
                    </td>
                    <td>
                      {["longUrl", "shortUrl"].includes(key) &&
                      typeof value === "string" ? (
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          {value}
                        </a>
                      ) : ["createdAt", "updatedAt"].includes(key) &&
                        typeof value === "string" ? (
                        `${format(
                          new Date(value),
                          "EEE, MMM d, yyyy, hh:mm:ss a"
                        )} (${formatDistanceToNow(new Date(value), {
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
