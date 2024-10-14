# URL Shortener

A web app and API for creating, managing, and tracking short URLs.

## Features

- **Create** short URLs.
- **Read** details of short URLs.
- **Update** short URLs.
- **Delete** short URLs.
- **Track** click counts on short URLs.

---

## Web App Usage

The web app has a select option for choosing different actions (Create, Read, Update, Delete).

1. **Create**: Enter a long URL (50+ characters) to generate a short URL.
2. **Read**: Enter a short URL to retrieve its details.
3. **Update**: Enter a short URL and a new long URL. Returns a success message.
4. **Delete**: Enter a short URL. Returns a success message.

### Notes

- Results are displayed in a tabular format.
- Errors are handled gracefully.

---

## API Usage

Base URL: `https://gideonadeti-url-shortener.vercel.app`

### Endpoints

1. **GET `/:shortId`**: Redirects to the long URL if found, or returns an error in JSON. Increases `usageCount`.

2. **POST `/api`**:
   - Request:

     ```json
     { "longUrl": "https://example.com" }
     ```

   - Response:

     ```json
     { "shortUrl": "https://gideonadeti-url-shortener.vercel.app/abc123" }
     ```

3. **GET `/api/:shortId`**: Returns details of the short URL.

   ```json
   {
     "id": "abc123",
     "longUrl": "https://example.com/some/really/really/really/really/long/url",
     "shortUrl": "https://gideonadeti-url-shortener.vercel.app/abc123",
     "usageCount": 1,
     "createdAt": "2022-01-01T00:00:00.000Z",
     "updatedAt": "2022-01-01T00:00:00.000Z"
   }
   ```

4. **PUT `/api/:shortId`**: Updates the long URL.
   - Request:

     ```json
     { "longUrl": "https://new-example.com" }
     ```

   - Response:

     ```json
     { "message": "URL updated successfully." }
     ```

5. **DELETE `/api/:shortId`**: Deletes the short URL.
   - Response:

     ```json
     { "message": "URL deleted successfully." }
     ```

6. **ERROR**: Returns an error in JSON.

   ```json
   {
     "error": "An error occurred."
   }
   ```

## Contributing & Issues

Contributions are welcome! If you have any suggestions, feature requests, or bug reports, create a pull request or open an issue.
