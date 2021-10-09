import { EntityManager } from "../..";
import { isUndefined } from "../../../utils/validations/is-undefined";
import { MetadataUtil } from "../../../utils/metadata-util";
import { CustomClass } from "../../types/metadata-type";
import { DatabaseEntity } from "../../../types/database-entity";

interface Injectables {
	entityManager: EntityManager<any, any>;
}

export interface ConvertDatabaseToEntityParams {
	entity: CustomClass;
	data: DatabaseEntity;
}

export const convertDatabaseToEntity = (
	{ entityManager }: Injectables,
	{ entity, data }: ConvertDatabaseToEntityParams,
) => {
	const entityMetadata = entityManager.getEntityMetadata(entity);

	return entityMetadata.columns.reduce((acc, columnMetadata) => {
		if (isUndefined(data)) return acc;

		const value = data[columnMetadata.databaseName];

		if (isUndefined(value)) return acc;

		if (MetadataUtil.isCustomMetadataType(columnMetadata.type)) {
			const subEntityMetadata = entityManager.getEntityMetadata(
				columnMetadata.type,
			);

			if (columnMetadata.isArray) {
				acc[columnMetadata.name] = value.map((val: CustomClass) =>
					convertDatabaseToEntity(
						{
							entityManager,
						},
						{
							entity: subEntityMetadata,
							data: val,
						},
					),
				);

				return acc;
			}

			acc[columnMetadata.name] = convertDatabaseToEntity(
				{
					entityManager,
				},
				{
					entity: subEntityMetadata,
					data: value,
				},
			);

			return acc;
		}

		acc[columnMetadata.name] = value;

		return acc;
	}, {} as DatabaseEntity);
};
