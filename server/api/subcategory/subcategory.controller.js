/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  update
 * DELETE  /api/users/:id          ->  destroy
 */

'use strict';

var  _ = require('lodash');
var sqldb = require('../../sqldb');
var Subcategory = sqldb.Subcategory;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log("Error",err)
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity){
      if (entity.dataValues) {
        res.status(statusCode).json(entity.dataValues);
      } else {
        res.status(statusCode).json(entity);
      }
    }

  };
}

function responseWithResultHack(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity.dataValues); // entity.dataValues is a developer hack for the moment, sequelize model create options raw is not working
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Subcategorys
exports.index =  function(req, res) {
  Subcategory.findAll({raw: true})
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Subcategory from the DB
exports.show = function(req, res) {
  Subcategory.find({
    where: {
      id: req.params.id
    },
    raw: true
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Subcategory in the DB
exports.create = function(req, res) {
  req.body.fk_category = req.body.category_id;
  Subcategory.create(req.body,{raw: false})
    .then(responseWithResultHack(res, 201))
    .catch(handleError(res));
}

// Updates an existing Subcategory in the DB
exports.update = function(req, res) {
  if (req.body.id) {
    delete req.body.id;
  }
  console.log(req.params.id)
  Subcategory.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Subcategory from the DB
exports.destroy = function (req, res) {
  Subcategory.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Deletes a Multiple Subcategory from the DB
exports.destroyBulk = function(req, res) {
  console.log(req.query)
  req.body.ids = [];
  var i;
  for(i in req.query){
    console.log(req.query[i])
    req.body.ids.push(req.query[i])
  }
  console.log("req.query[i]",req.body.ids);
  Subcategory.destroy({where:{ id: req.body.ids }})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));;

};

