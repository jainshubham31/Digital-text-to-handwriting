/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const request = require('request');

it('Main page content', (done) => {
  request('http://localhost:5000', (error, response, body) => {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

it('Main page status', (done) => {
  request('http://localhost:5000', (error, response, body) => {
    expect(response.statusCode).to.equal(200);
    done();
  });
});

it('About page content', (done) => {
  request('http://localhost:5000/about', (error, response, body) => {
    expect(response.statusCode).to.equal(404);
    done();
  });
});

it('Conect to database', (done) => {
  request('http://localhost:5000/about', (error, response, body) => {
    expect(response.statusCode).to.equal(404);
    done();
  });
});
