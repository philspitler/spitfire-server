'use strict';

var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var inflection = require( 'inflection' );

var api = function (config) {
  // GET listing.
  router.get('/:resource', function (req, res) {
    var db = mongojs(config.database, [req.params.resource]);
    db[req.params.resource].find(function (err, docs) {
      res.json(docs);
    });
  });

  // GET nested listing.
  router.get('/:resource1/:id/:resource2', function (req, res) {
    var db = mongojs(config.database, [req.params.resource2]);
    var query = {};
    query[inflection.singularize(req.params.resource1) + '_id'] = req.params.id;
    db[req.params.resource2].find(query, function (err, docs) {
      res.json(docs);
    });
  });

  // GET document.
  router.get('/:resource/:id', function (req, res) {
    var db = mongojs(config.database, [req.params.resource]);
    db[req.params.resource].findOne({
      _id:mongojs.ObjectId(req.params.id)
    }, function (err, doc) {
      res.json(doc);
    });
  });

  // POST document.
  router.post('/:resource', function (req, res) {
    var db = mongojs(config.database, [req.params.resource]);
    db[req.params.resource].insert(req.body, function (err, doc) {
      res.json(doc);
    });
  });

  // POST nested document
  router.post('/:resource1/:id/:resource2', function (req, res) {
    var db = mongojs(config.database, [req.params.resource2]);
    req.body[inflection.singularize(req.params.resource1)+'_id'] = req.params.id;
    db[req.params.resource2].insert(req.body, function (err, doc) {
      res.json(doc);
    });
  });

  // PUT document.
  router.put('/:resource/:id', function (req, res) {
    var db = mongojs(config.database, [req.params.resource]);
    db[req.params.resource].update({
      _id:mongojs.ObjectId(req.params.id)
    }, req.body, function (err, updated) {
      db[req.params.resource].findOne({
        _id:mongojs.ObjectId(req.params.id)
      }, function (err, doc) {
        res.json(doc);
      });
    });
  });

  // DELETE document.
  router.delete('/:resource/:id', function (req, res) {
    var db = mongojs(config.database, [req.params.resource]);
    db[req.params.resource].findOne({
      _id:mongojs.ObjectId(req.params.id)
    }, function (err, doc) {
      db[req.params.resource].remove({
        _id:mongojs.ObjectId(req.params.id)
      }, req.body, function (err, updated) {
        doc.removed = true;
        res.json(doc);
      });
    });
  });

  return router;
};
module.exports = api;
