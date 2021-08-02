import { MetadataType } from "../../utils/metadata/is-metadata-type";

export interface ColumnOptions extends BaseColumnOptions {
	type?: MetadataType;
}

export type PrimaryColumnOptions = BaseColumnOptions;

export interface BaseColumnOptions {
	name?: string;
}

export interface PrimaryGeneratedColumnOptions extends BaseColumnOptions {
	type?: "uuid";
}

export type CreateDateColumnOptions = BaseColumnOptions;

export type UpdateDateColumnOptions = BaseColumnOptions;
