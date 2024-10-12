"use client";

import { useState } from "react";

export default function Main() {
  const [method, setMethod] = useState("create");
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
          <form className="w-100">
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
          <form className="w-100">
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
          <form className="w-100">
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
      </div>
    </main>
  );
}
