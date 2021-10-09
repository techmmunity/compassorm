import { EntityManager } from "../..";
import { CustomClass } from "../../types/metadata-type";
import { getColumnDatabaseName } from "../../../utils/convert/get-column-database-name";
import { getMultipleLevelColumnName } from "../../../utils/convert/get-multiple-level-column-name";
import { isMultipleLevelsColumn } from "../../../utils/convert/is-multiple-levels-column";
import { Order } from "../../../types/order";

interface Injectables {
	entityManager: EntityManager<any, any>;
}

export interface FormatOrderParams {
	entity: CustomClass;
	orderBy: Record<string, Order>;
}

export const formatOrder = (
	{ entityManager }: Injectables,
	{ entity, orderBy }: FormatOrderParams,
): Record<string, Order> => {
	const entries = Object.entries(orderBy).map(([columnName, order]) => {
		if (isMultipleLevelsColumn(columnName)) {
			const formattedColumnName = getMultipleLevelColumnName({
				entity,
				entityManager,
				originalColumnsNames: columnName.split("."),
			});

			return [formattedColumnName, order];
		}

		const formattedColumnName = getColumnDatabaseName({
			entityManager,
			entity,
			columnName,
			errorOptions: {
				ifLastFieldIsSubEntity: {
					message: "Invalid order",
					getDetails: (errorColumnName: string) => [
						`Column "${errorColumnName}" is a subEntity, and cannot be used to ordering. Use a column of this subEntity`,
					],
				},
			},
		});

		return [formattedColumnName, order];
	});

	return Object.fromEntries(entries);
};
