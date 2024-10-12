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
          onChange={(e) => setMethod(e.target.value)}
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
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
