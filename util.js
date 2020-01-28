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

const readDB = async (parentNode, childNodes, key)=>{
	const admin = require('firebase-admin');
	const serviceAccount = require('./firebase-adminsdk.json');

	
	const database = 'pruebas-69f8f';
	if(!admin.apps.length)
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: `https://${database}.firebaseio.com`
		});


	const getValues = async (parentRef, children, parentName)=>{
		const results = [];
		const snapShots = [];
		for (const node of children) {
			if(typeof node === "object"){
				results.push(getValues(parentRef.child(node.entity), node.fields, node.entity));
			}else{
				snapShots.push(parentRef.child(node).once('value'));
			}
		}
		

		const [values, subValues] = await Promise.all([
			Promise.all(snapShots),
			Promise.all(results),
		]);

		const res = {};
		const obj = {};
		values.forEach(el=> obj[el.key] = el.val());

		if(parentName)
			res[parentName]=obj;
		else
			Object.assign(res, obj);


		for (const subValue of subValues) {
			if(parentName)
				Object.assign(res[parentName], subValue);
			else
				Object.assign(res, subValue);
		}

		return res;
	}


	const mainRef = admin.database().ref(parentNode).child(key);
	return await getValues(mainRef, childNodes)
};

module.exports = {getFieldNames, readDB};