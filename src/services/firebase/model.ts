import * as firebase from 'firebase/app';

const PK_NAME = "key";

export class Model {

	constructor(val?: any) {
		if (val) {
			Object
				.keys(val)
				.filter(k => typeof(this[k]) != "function")
				.forEach(key => {
					this[key] = val[key]
				});
		}
	}

	key?: string = null;
	createdAt? = firebase.database.ServerValue.TIMESTAMP;
	lastUpdate: number;

	static toJSON(model: any): any {
		const data = {};
		
		Object
		.getOwnPropertyNames(model)
		.filter(k => k != PK_NAME)
		.filter(k => typeof(this[k]) != "function")
		.forEach(key => {
			let value = model[key].valueOf();
			
			data[key] = !Array.isArray(value) ? Model.normalize(value) 
											  : value.map(Model.normalize);
			
			// if (!data[key])
			// 	delete data[key];				
		});

		data['lastUpdate'] = firebase.database.ServerValue.TIMESTAMP;

		return data;
	}

	private static normalize(value: any) {
		if (value[PK_NAME]) {
			const pk = {};
			pk[PK_NAME] = value[PK_NAME];
			return pk;
		} else {
			return value;
		}
	}
}
