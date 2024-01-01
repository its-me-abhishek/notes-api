### API Documentation

#### Base URL: `/`

### 1. Welcome Message

- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Retrieve a welcome message for the Note API.
- **Response:**
  - Status Code: `200 OK`
  - Body: Text containing the welcome message.
    ```json
    "Welcome to the Note API"
    ```

### 2. Create a New Note

- **Endpoint:** `/notes`
- **Method:** `POST`
- **Description:** Create a new note.
- **Request Body Format:**
  - JSON object with `title` and `content` properties.
    ```json
    {
      "title": "Note Title",
      "content": "Note Content"
    }
    ```
- **Response:**
  - Status Code: `201 Created`
  - Body: JSON object representing the created note.
    ```json
    {
      "_id": "generatedId",
      "title": "Note Title",
      "content": "Note Content"
    }
    ```

### 3. Retrieve All Notes

- **Endpoint:** `/notes`
- **Method:** `GET`
- **Description:** Retrieve a list of all notes.
- **Response:**
  - Status Code: `200 OK`
  - Body: Array of JSON objects representing notes.
    ```json
    [
      {
        "_id": "noteId1",
        "title": "Note Title 1",
        "content": "Note Content 1"
      },
      {
        "_id": "noteId2",
        "title": "Note Title 2",
        "content": "Note Content 2"
      },
      // ... more notes
    ]
    ```

### 4. Retrieve a Single Note by ID

- **Endpoint:** `/notes/:id`
- **Method:** `GET`
- **Description:** Retrieve a single note by its ID.
- **Response:**
  - Status Code: `200 OK` if the note is found.
  - Status Code: `404 Not Found` if the note is not found.
  - Body: JSON object representing the note.
    ```json
    {
      "_id": "noteId",
      "title": "Note Title",
      "content": "Note Content"
    }
    ```

### 5. Update a Note by ID

- **Endpoint:** `/notes/:id`
- **Method:** `PUT`
- **Description:** Update a note by its ID.
- **Request Body Format:**
  - JSON object with `title` and `content` properties.
    ```json
    {
      "title": "Updated Note Title",
      "content": "Updated Note Content"
    }
    ```
- **Response:**
  - Status Code: `200 OK` if the note is updated successfully.
  - Status Code: `404 Not Found` if the note is not found.
  - Body: JSON object representing the updated note.
    ```json
    {
      "_id": "noteId",
      "title": "Updated Note Title",
      "content": "Updated Note Content"
    }
    ```

### 6. Delete a Note by ID

- **Endpoint:** `/notes/:id`
- **Method:** `DELETE`
- **Description:** Delete a note by its ID.
- **Response:**
  - Status Code: `200 OK` if the note is deleted successfully.
  - Status Code: `404 Not Found` if the note is not found.
  - Body: JSON object with a success message.
    ```json
    {
      "message": "Note deleted successfully"
    }
    ```

### Error Responses

- **Status Code: `400 Bad Request`**
  - Body: JSON object with an error message.
    ```json
    {
      "error": "Title and content are required"
    }
    ```
- **Status Code: `400 Bad Request`**
  - Body: JSON object with an error message.
    ```json
    {
      "error": "Title and content must be within specified lengths"
    }
    ```
- **Status Code: `401 Unauthorized`**
  - Body: Text with an unauthorized message.
    ```
    Unauthorized Access
    ```
- **Status Code: `500 Internal Server Error`**
  - Body: JSON object with an error message.
    ```json
    {
      "error": "Internal Server Error"
    }
    ```
