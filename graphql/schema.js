const {gql} = require('apollo-server-express');

const schema = gql`
	type Query {
		hello: String
		alguien: Persona
	}

	type Persona {
		nombre: String
		apellido: String
		edad: Int
		pais: Pais
	}

	type Pais {
		id: Int
		nombre: String
	}
`;

module.exports = schema;
