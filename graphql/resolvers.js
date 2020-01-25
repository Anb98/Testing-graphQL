const resolverFunctions = {
	Query: {
		hello: (obj, arg, context, info) => {
			return 'world';
		},

		alguien:(obj, arg, context, info)=>{
			console.log("Path to params selected", info.fieldNodes[0].selectionSet.selections);
			
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