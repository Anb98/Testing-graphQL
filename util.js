const getFieldNames = (fieldNodes)=>{
	if(!Array.isArray(fieldNodes) || fieldNodes.length === 0 )
		return false;

	const fields = [];

	for (const field of fieldNodes) {
		if(!field.selectionSet)	// no hay mas subnodos
			fields.push(field.name.value);

		else
			fields.push({
				entity: field.name.value,
				fields: getFieldNames(field.selectionSet.selections)
			});
	}


	return fields;
};

module.exports = {getFieldNames};