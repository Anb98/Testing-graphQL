const resolverFunctions = {
	Query: {
		hello: (obj, arg, context, info) => {
			// console.log('info.fieldNodes :', info.fieldNodes);
			return 'world';
		},

		alguien:(obj, arg, context, info)=>{
			const campos = getFieldNames(info.fieldNodes);
			
			return {
				edad:98,
				nombre:'abdiel',
				apellido:'martinez',
				pais:{
					id:3,
					nombre:'el salvador'
				}
			};
		}
	}
};

module.exports = resolverFunctions;