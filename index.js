'use strict';

// var debug = require('debug');
var each = require('co-each');
var Doth = require('doth');
var doth = new Doth(); doth.strict = true;

var assert = require('assert');


module.exports = function* _monkPopulate(targetCollection, list, fields, pathToForeignKey) {
  assert(typeof targetCollection.findById === 'function', 'First parameter to populate must be a co-monk collection with a .findById method (which was not found).');
  assert(Array.isArray(list), 'Second parameter to populate must be a list of items to expand, not ' + typeof list);
  assert(Array.isArray(fields), 'Third parameter to populate must be a list of fields to expand, not ' + typeof fields);
  assert(typeof pathToForeignKey === 'string', 'Fourth parameter to populate must be a dotted path to the foreign key (string).');
  
  
  var ids = list.map(function (item) {
    return fields.map(function (field) {
      var path = _normalizePath(field, pathToForeignKey);
      return doth.get(item, path);
    });
  }).flatten().unique().compact(true);
  
  
  var collectionObjects = {};
  yield each(ids, function* _expandIdGenerator(id) {
    collectionObjects[id] = yield targetCollection.findById(id);
    assert(collectionObjects[id] !== null, 'Object with id ' + id + ' does not exist in collection. Check _id and collection name (missing s?).');
  });
  
  
  // var attrName = pathToForeignKey.pop();
  // pathToForeignKey will now not contain the leaf
  
  list.forEach(function (item) {
    fields.forEach(function (field) {
      var path = _normalizePath(field, pathToForeignKey);
      // in-line replace
      doth.replace(item, path, function (id) { return collectionObjects[id]; });
    });
  });
  
  return list;
};


function _normalizePath(field, pathToForeignKey) {
  var path = '';
  
  if (field !== '') {
    path = field + '[]' + '.';
  }
  
  path = path + pathToForeignKey;
  return path;
}
