'use strict';

var express = require('express');
var router = express.Router();
var Spitfire = require('spitfire');

var api = function (config) {
  var spitfire = new Spitfire(config.database);
  // GET listing.
  router.get('/:resource', function (req, res) {
    console.log(req.params.resource);
    spitfire.getResources(req.params.resource, function (docs) {
      res.json(docs);
    });
  });

  // GET nested listing.
  router.get('/:resource1/:id/:resource2', function (req, res) {
    spitfire.getNestedResources(req.params.resource1, req.params.id, req.params.resource2, function (docs) {
      res.json(docs);
    });
  });

  // GET document.
  router.get('/:resource/:id', function (req, res) {
    spitfire.getResource(req.params.resource, req.params.id, function (docs) {
      res.json(docs);
    });
  });

  // POST document.
  router.post('/:resource', function (req, res) {
    spitfire.createResource(req.params.resource, function (doc) {
      res.json(doc);
    });
  });

  // POST nested document
  router.post('/:resource1/:id/:resource2', function (req, res) {
    spitfire.createNestedResource(req.params.resource1, req.params.id, req.params.resource2, req.body, function (doc) {
      res.json(doc);
    });
  });

  // PUT document.
  router.put('/:resource/:id', function (req, res) {
    spitfire.updateResource(req.params.resource, req.params.id, req.body, function (doc) {
      res.json(doc);
    });
  });

  // DELETE document.
  router.delete('/:resource/:id', function (req, res) {
    spitfire.deleteResource(req.params.resource, req.params.id, function (doc) {
      res.json(doc);
    });
  });

  return router;
};
module.exports = api;
