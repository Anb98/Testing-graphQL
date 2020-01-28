const {readDB, getFieldNames} = require('./../util')

const resolverFunctions = {
	Query: {
		user:async (obj, {uid}, context, info)=>{

			const [{fields}] = getFieldNames(info.fieldNodes);
			const result = await readDB('User', fields, uid);
			
			return result;
		}
	}
};

module.exports = resolverFunctions;