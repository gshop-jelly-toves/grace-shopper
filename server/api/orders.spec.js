const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const agent = supertest.agent(app);
const { promisify } = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const path = require('path');


describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders', () => {
    describe('/books', () => {
      let author, book, chapter;

      beforeEach(async () => {
        author = await Author.create({
          firstName: 'Testy',
          lastName: 'McTesterson',
        });
      });

      beforeEach(async () => {
        chapter = await Chapter.create({
          title: 'First',
          text: 'Once upon a time, the end.',
          number: 1,
        });
      });

      beforeEach(async () => {
        book = await Book.create({
          title: 'Best Book Ever',
          authorId: author.id,
        });
        await book.addChapter(chapter);
        await Book.create({
          title: 'Worst Book Ever',
          authorId: author.id,
        });
      });

      it('GET all', async () => {
        const response = await agent.get('/api/books').expect(200);
        expect(response.body).to.be.instanceof(Array);
        expect(response.body).to.have.length(2);
      });

      it('POST one', async () => {
        const response = await agent
          .post('/api/books')
          .send({
            title: 'Book Made By Test',
            authorId: author.id,
          })
          .expect(201);
        expect(response.body.title).to.equal('Book Made By Test');
        expect(response.body.id).to.be.a('number');
        const b = await Book.findById(response.body.id);
        expect(b).to.not.equal(null);
        expect(response.body).to.eql(toPlainObject(b));
      });

      it('GET one', async () => {
        const response = await agent.get(`/api/books/${book.id}`).expect(200);
        expect(response.body.title).to.equal(book.title);
      });

      it("GET one that doesn't exist", async () => {
        await agent.get('/api/books/12345').expect(404);
      });

      it('GET one using invalid ID', async () => {
        await agent.get('/api/books/clearlynotanid').expect(500);
      });

      it('PUT one', async () => {
        const response = await agent
          .put(`/api/books/${book.id}`)
          .send({
            title: 'Book Updated By Test',
          })
          .expect(200);
        expect(response.body.title).to.equal('Book Updated By Test');
        const b = await Book.findById(book.id);
        expect(b).to.not.equal(null);
        expect(response.body).to.eql(toPlainObject(b));
      });

      it("PUT one that doesn't exist", async () => {
        await agent
          .put('/api/books/54321')
          .send({ title: 'Attempt To Update Book Title' })
          .expect(404);
      });

      it('PUT one using invalid ID', async () => {
        await agent
          .put('/api/books/clearlynotanid')
          .send({ title: 'Attempt To Update Book Title' })
          .expect(500);
      });

      it('DELETE one', async () => {
        await agent.delete(`/api/books/${book.id}`).expect(204);
        const b = await Book.findById(book.id);
        expect(b).to.equal(null);
      });

      it("DELETE one that doesn't exist", async () => {
        await agent.delete('/api/books/13579').expect(404);
      });

      it('DELETE one using invalid ID', async () => {
        await agent.delete('/api/books/clearlynotanid').expect(500);
      });

      it('GET with query string filter', async () => {
        const response = await agent
          // remember that in query strings %20 means a single whitespace character
          .get('/api/books?title=Best%20Book%20Ever')
          .expect(200);
        expect(response.body).to.be.instanceof(Array);
        expect(response.body).to.have.length(1);
      });

      /* ================================================================
   ----------------------------------------------------------------
   EVERYTHING AFTER THIS POINT IS NOT MANDATORY (THOUGH ENCOURAGED)
   ----------------------------------------------------------------
   ================================================================ */

      describe('/chapters', () => {
        let addedChapter, chapterBook;

        beforeEach(async () => {
          chapterBook = await Book.findOne({});
        });

        beforeEach(async () => {
          addedChapter = await Chapter.create({
            title: 'Added Chapter',
            number: 1,
            text: 'Once upon a time...',
          });
          await chapterBook.addChapter(addedChapter);
        });

        xit('GET all', async () => {
          const response = await agent
            .get(`/api/books/${chapterBook.id}/chapters`)
            .expect(200);
          // this should be an array of *chapters* not books
          expect(response.body).to.be.instanceof(Array);
          expect(response.body).to.have.length(2);
        });

        xit('POST one', async () => {
          // take a look at the Sequelize docs for adding and/or creating associations
          // it is helpful here!
          const response = await agent
            .post(`/api/books/${chapterBook.id}/chapters`)
            .send({
              title: 'Chapter Made By Test',
              text: 'A chapter made by a test',
              number: 11,
            })
            .expect(201);
          const createdChapter = response.body;
          expect(createdChapter.title).to.equal('Chapter Made By Test');
          const b = await Book.findById(chapterBook.id);
          const chapters = await b.getChapters();
          const containsChapter = chapters.some(function(ch) {
            return ch.id === createdChapter.id;
          });
          expect(containsChapter).to.equal(true);
          const c = await Chapter.findById(createdChapter.id);
          expect(c).to.not.equal(null);
          expect(response.body).to.eql(toPlainObject(c));
        });

        xit('GET one', async () => {
          const chapId = addedChapter.id;
          const response = await agent
            .get(`/api/books/${chapterBook.id}/chapters/${chapId}`)
            .expect(200);
          expect(response.body.id).to.equal(chapId);
        });

        xit("GET one that doesn't exist", async () => {
          await agent
            .get(`/api/books/${chapterBook.id}/chapters/24680`)
            .expect(404);
        });

        xit('GET one using invalid ID', async () => {
          await agent
            .get(`/api/books/${chapterBook.id}/chapters/clearlynotanid`)
            .expect(500);
        });

        xit('PUT one', async () => {
          const chapId = addedChapter.id;
          const response = await agent
            .put(`/api/books/${chapterBook.id}/chapters/${chapId}`)
            .send({
              title: 'Chapter Updated By Test',
            })
            .expect(200);
          expect(response.body.title).to.equal('Chapter Updated By Test');
          const c = await Chapter.findById(chapId);
          expect(c).to.not.equal(null);
          expect(response.body).to.eql(toPlainObject(c));
        });

        xit("PUT one that doesn't exist", async () => {
          await agent
            .put(`/api/books/${chapterBook.id}/chapters/98765`)
            .send({
              title: 'Attempt To Update Chapter Title',
            })
            .expect(404);
        });

        xit('PUT one using invalid ID', async () => {
          await agent
            .put(`/api/books/${chapterBook.id}/chapters/clearlynotanid`)
            .send({
              title: 'Attempt To Update Chapter Title',
            })
            .expect(500);
        });

        xit('DELETE one', async () => {
          // take a look at the Sequelize docs for removing associations
          // it is helpful here!
          const chapId = addedChapter.id;
          await agent
            .delete(`/api/books/${chapterBook.id}/chapters/${chapId}`)
            .expect(204);
          const c = await Chapter.findById(chapId);
          expect(c).to.equal(null);
          const b = await Book.findById(chapterBook.id);
          const chapters = await b.getChapters();
          chapters.forEach(function(ch) {
            expect(ch.id).to.not.equal(chapId);
          });
        });

        xit("DELETE one that doesn't exist", async () => {
          await agent
            .delete(`/api/books/${chapterBook.id}/chapters/12345`)
            .expect(404);
        });

        xit('DELETE one using invalid ID', async () => {
          await agent
            .delete(`/api/books/${chapterBook.id}/chapters/clearlynotanid`)
            .expect(500);
        });
      });
    });
  });
});
