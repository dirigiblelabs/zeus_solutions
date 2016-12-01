/* globals $ */
/* eslint-env node, dirigible */

var database = require('db/database');
var datasource = database.getDatasource();
var solutionsDaoExtensionsUtils = require('zeus/solutions/solutionsDaoExtensionUtils');
var user = require("net/http/user");

// Create an entity
exports.create = function(entity) {
    var connection = datasource.getConnection();
    try {
        var sql = 'INSERT INTO ZEUS_SOLUTIONS (SOL_ID,SOL_NAME,SOL_DESCRIPTION,SOL_DATE,SOL_AREA,SOL_IN_SCOPE,SOL_OUT_SCOPE,SOL_KEY_DELIVERABLES,SOL_TARGETS,SOL_TIMELINE,SOL_TEAMS,SOL_FINANCIALS,SOL_CONSTRAINTS,SOL_RISKS,SOL_CREATED_AT,SOL_CREATED_BY) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        var statement = connection.prepareStatement(sql);
        var i = 0;
        var id = datasource.getSequence('ZEUS_SOLUTIONS_SOL_ID').next();
        statement.setInt(++i, id);
        statement.setString(++i, entity.sol_name);
        statement.setString(++i, entity.sol_description);
        if (entity.sol_date !== null) {
            var js_date_sol_date =  new Date(Date.parse(entity.sol_date));
            statement.setTimestamp(++i, js_date_sol_date);
        } else {
            statement.setTimestamp(++i, null);
        }
        statement.setString(++i, entity.sol_area);
        statement.setString(++i, entity.sol_in_scope);
        statement.setString(++i, entity.sol_out_scope);
        statement.setString(++i, entity.sol_key_deliverables);
        statement.setString(++i, entity.sol_targets);
        statement.setString(++i, entity.sol_timeline);
        statement.setString(++i, entity.sol_teams);
        statement.setString(++i, entity.sol_financials);
        statement.setString(++i, entity.sol_constraints);
        statement.setString(++i, entity.sol_risks);
        statement.setTimestamp(++i, new Date());
        statement.setString(++i, user.getName());
		solutionsDaoExtensionsUtils.beforeCreate(connection, entity);
        statement.executeUpdate();
        solutionsDaoExtensionsUtils.afterCreate(connection, entity);
    	return id;
    } finally {
        connection.close();
    }
};

// Return a single entity by Id
exports.get = function(id) {
	var entity = null;
    var connection = datasource.getConnection();
    try {
        var sql = 'SELECT * FROM ZEUS_SOLUTIONS WHERE SOL_ID = ?';
        var statement = connection.prepareStatement(sql);
        statement.setInt(1, id);

        var resultSet = statement.executeQuery();
        if (resultSet.next()) {
            entity = createEntity(resultSet);
        }
    } finally {
        connection.close();
    }
    return entity;
};

// Return all entities
exports.list = function(limit, offset, sort, desc) {
    var result = [];
    var connection = datasource.getConnection();
    try {
        var sql = 'SELECT ';
        if (limit !== null && offset !== null) {
            sql += ' ' + datasource.getPaging().genTopAndStart(limit, offset);
        }
        sql += ' * FROM ZEUS_SOLUTIONS';
        if (sort !== null) {
            sql += ' ORDER BY ' + sort;
        }
        if (sort !== null && desc !== null) {
            sql += ' DESC ';
        }
        if (limit !== null && offset !== null) {
            sql += ' ' + datasource.getPaging().genLimitAndOffset(limit, offset);
        }
        var statement = connection.prepareStatement(sql);
        var resultSet = statement.executeQuery();
        while (resultSet.next()) {
            result.push(createEntity(resultSet));
        }
    } finally {
        connection.close();
    }
    return result;
};

// Update an entity by Id
exports.update = function(entity) {
    var connection = datasource.getConnection();
    try {
        var sql = 'UPDATE ZEUS_SOLUTIONS SET SOL_NAME = ?,SOL_DESCRIPTION = ?,SOL_DATE = ?,SOL_AREA = ?,SOL_IN_SCOPE = ?,SOL_OUT_SCOPE = ?,SOL_KEY_DELIVERABLES = ?,SOL_TARGETS = ?,SOL_TIMELINE = ?,SOL_TEAMS = ?,SOL_FINANCIALS = ?,SOL_CONSTRAINTS = ?,SOL_RISKS = ? WHERE SOL_ID = ?';
        var statement = connection.prepareStatement(sql);
        var i = 0;
        statement.setString(++i, entity.sol_name);
        statement.setString(++i, entity.sol_description);
        if (entity.sol_date !== null) {
            var js_date_sol_date =  new Date(Date.parse(entity.sol_date));
            statement.setTimestamp(++i, js_date_sol_date);
        } else {
            statement.setTimestamp(++i, null);
        }
        statement.setString(++i, entity.sol_area);
        statement.setString(++i, entity.sol_in_scope);
        statement.setString(++i, entity.sol_out_scope);
        statement.setString(++i, entity.sol_key_deliverables);
        statement.setString(++i, entity.sol_targets);
        statement.setString(++i, entity.sol_timeline);
        statement.setString(++i, entity.sol_teams);
        statement.setString(++i, entity.sol_financials);
        statement.setString(++i, entity.sol_constraints);
        statement.setString(++i, entity.sol_risks);
        var id = entity.sol_id;
        statement.setInt(++i, id);
		solutionsDaoExtensionsUtils.beforeUpdate(connection, entity);
        statement.executeUpdate();
        solutionsDaoExtensionsUtils.afterUpdate(connection, entity);
    } finally {
        connection.close();
    }
};

// Delete an entity
exports.delete = function(entity) {
    var connection = datasource.getConnection();
    try {
    	var sql = 'DELETE FROM ZEUS_SOLUTIONS WHERE SOL_ID = ?';
        var statement = connection.prepareStatement(sql);
        statement.setString(1, entity.sol_id);
        solutionsDaoExtensionsUtils.beforeDelete(connection, entity);
        statement.executeUpdate();
        solutionsDaoExtensionsUtils.afterDelete(connection, entity);
    } finally {
        connection.close();
    }
};

// Return the entities count
exports.count = function() {
    var count = 0;
    var connection = datasource.getConnection();
    try {
    	var sql = 'SELECT COUNT(*) FROM ZEUS_SOLUTIONS';
        var statement = connection.prepareStatement(sql);
        var rs = statement.executeQuery();
        if (rs.next()) {
            count = rs.getInt(1);
        }
    } finally {
        connection.close();
    }
    return count;
};

// Returns the metadata for the entity
exports.metadata = function() {
	var metadata = {
		name: 'zeus_solutions',
		type: 'object',
		properties: [
		{
			name: 'sol_id',
			type: 'integer',
			key: 'true',
			required: 'true'
		},
		{
			name: 'sol_name',
			type: 'string'
		},
		{
			name: 'sol_description',
			type: 'string'
		},
		{
			name: 'sol_date',
			type: 'timestamp'
		},
		{
			name: 'sol_area',
			type: 'string'
		},
		{
			name: 'sol_in_scope',
			type: 'string'
		},
		{
			name: 'sol_out_scope',
			type: 'string'
		},
		{
			name: 'sol_key_deliverables',
			type: 'string'
		},
		{
			name: 'sol_targets',
			type: 'string'
		},
		{
			name: 'sol_timeline',
			type: 'string'
		},
		{
			name: 'sol_teams',
			type: 'string'
		},
		{
			name: 'sol_financials',
			type: 'string'
		},
		{
			name: 'sol_constraints',
			type: 'string'
		},
		{
			name: 'sol_risks',
			type: 'string'
		},
		{
			name: 'sol_created_at',
			type: 'timestamp'
		},
		{
			name: 'sol_created_by',
			type: 'string'
		},
		]
	};
	return metadata;
};

// Create an entity as JSON object from ResultSet current Row
function createEntity(resultSet) {
    var result = {};
	result.sol_id = resultSet.getInt('SOL_ID');
    result.sol_name = resultSet.getString('SOL_NAME');
    result.sol_description = resultSet.getString('SOL_DESCRIPTION');
    if (resultSet.getTimestamp('SOL_DATE') !== null) {
        result.sol_date = new Date(resultSet.getTimestamp('SOL_DATE').getTime());
    } else {
        result.sol_date = null;
    }
    result.sol_area = resultSet.getString('SOL_AREA');
    result.sol_in_scope = resultSet.getString('SOL_IN_SCOPE');
    result.sol_out_scope = resultSet.getString('SOL_OUT_SCOPE');
    result.sol_key_deliverables = resultSet.getString('SOL_KEY_DELIVERABLES');
    result.sol_targets = resultSet.getString('SOL_TARGETS');
    result.sol_timeline = resultSet.getString('SOL_TIMELINE');
    result.sol_teams = resultSet.getString('SOL_TEAMS');
    result.sol_financials = resultSet.getString('SOL_FINANCIALS');
    result.sol_constraints = resultSet.getString('SOL_CONSTRAINTS');
    result.sol_risks = resultSet.getString('SOL_RISKS');
    if (resultSet.getTimestamp('SOL_CREATED_AT') !== null) {
        result.sol_created_at = new Date(resultSet.getTimestamp('SOL_CREATED_AT').getTime());
    } else {
        result.sol_created_at = null;
    }
    result.sol_created_by = resultSet.getString('SOL_CREATED_BY');
    return result;
}

