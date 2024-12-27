export type QueryProjectionType<Type> = {
	[Key in keyof Type]?: Type[Key] extends (infer U)[]
		? U extends object
			? QueryProjectionType<U>[]          // Apply projection rules to each item in the array if it's an object
			: 0 | 1                             // Otherwise, just 0 or 1 for arrays of primitives
		: Type[Key] extends object
			? QueryProjectionType<Type[Key]>    // Recurse if the field is a non-array object
			: 0 | 1;                            // Otherwise, 0 or 1 for non-nested fields
};

export type QueryFilterType<Type> = Partial<Type>

export type QueryOrderType<Type> = {
	[Key in keyof Type]?: Type[Key] extends any[]
		? never                             	// You cannot order by field with type array
		: Type[Key] extends object
			? QueryOrderType<Type[Key]>         // Recurse if the field is a non-array object
			: -1 | 1;                           // Otherwise, 1 for ascending or -1 for descending for non-nested fields
}

export type QueryOptionsType<Type> = {
	filter?: QueryFilterType<Type>,
	projection?: QueryProjectionType<Type>,
	order?: QueryOrderType<Type>,
	page?: number,
	limit?: number,
};

export type UpdateOptionsType = Partial<{
	upsert: boolean,
	returnNew: boolean,
}>

export type MetadataType = {
	total: number,
	page?: number,
	totalPage?: number,
}

export type OutputTypeList<Type> = {
	data: Array<Partial<Type>>,
	metadata: MetadataType
}

export type OutputType<Type> = {
	data: Partial<Type> | null
}
