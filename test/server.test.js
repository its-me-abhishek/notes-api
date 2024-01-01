const request = require('supertest');
const app = require('../server');

describe('Notes Api', () => {
    it('is unauthorised', async () => {
        const response = await request(app).get('/notes');
        expect(response.status).toBe(401); // request should be unauthorized
    });

    it('is authorised', async () => {
        const response = await request(app).get('/notes').auth('username', '1234');
        expect(response.status).toBe(200); // request should be authorized
    });

    it('can retrieve welcome message', async () => {
        const response = await request(app).get('/').auth('username', '1234');
        expect(response.text).toBe('Welcome to the Note API'); // Get home page
    });

    const validNoteId = 'validnoteid';
    const nonExistentNoteId = 'nonexistentnoteid';
    const invalidNoteId = 'invalidnoteid';
    it('should return the note with a valid ID', async () => {
        const response = await request(app).get(`/notes/${validNoteId}`).auth('username', '1234');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', validNoteId);
    });

    it('should return 404 if the note ID is not found', async () => {
        const response = await request(app).get(`/notes/${nonExistentNoteId}`).auth('username', '1234');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Note not found' });
    });

    it('should return 500 if an internal server error occurs', async () => {
        const response = await request(app).get(`/notes/${invalidNoteId}`).auth('username', '1234');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });

    it('should update the note with a valid ID', async () => {
        const response = await request(app)
            .put(`/notes/${validNoteId}`)
            .auth('username', '1234')
            .send({ title: 'Updated Title', content: 'Updated Content' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', validNoteId);
        expect(response.body.title).toBe('Updated Title');
        expect(response.body.content).toBe('Updated Content');
    });

    it('should delete the note with a valid ID', async () => {
        const response = await request(app).delete(`/notes/${validNoteId}`).auth('username', '1234');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Note deleted successfully' });
    });
});
