// Type definitions for Breeze 1.4
// Project: http://www.breezejs.com/
// Definitions by: Boris Yankov <https://github.com/borisyankov/>, 
//				   IdeaBlade <https://github.com/IdeaBlade/Breeze/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


// Updated Jan 14 2011 - Jay Traband ( www.ideablade.com).
// Updated March 27 2013 - John Lantz (www.ideablade.com).
// Updated Aug 13 2013 - Steve Schmitt ( www.ideablade.com).

/// <reference path="../q/Q.d.ts" />

declare module breeze.core {

    interface ErrorCallback {
        (error: Error): void;
    }

    interface IEnum {
        contains(object: any): boolean;
        fromName(name: string): EnumSymbol;
        getNames(): string[];
        getSymbols(): EnumSymbol[];
    }

    class Enum implements IEnum {
        constructor (name: string, methodObj?: any);

        addSymbol(propertiesObj?: any): EnumSymbol;
        contains(object: any): boolean;
        fromName(name: string): EnumSymbol;
        getNames(): string[];
        getSymbols(): EnumSymbol[];
        static isSymbol(object: any): boolean;
        seal(): void;
    }

    class EnumSymbol {
        parentEnum: IEnum;

        getName(): string;
        toString(): string;
    }

    class Event {
        constructor (name: string, publisher: any, defaultErrorCallback?: ErrorCallback);

        static enable(eventName: string, target: any): void;
        static enable(eventName: string, target: any, isEnabled: boolean): void;
        static enable(eventName: string, target: any, isEnabled: Function): void;

        static isEnabled(eventName: string, target: any): boolean;
        publish(data: any, publishAsync?: boolean, errorCallback?: ErrorCallback): void;
        publishAsync(data: any, errorCallback?: ErrorCallback): void;
        subscribe(callback?: (data: any) => void ): number;
        unsubscribe(unsubKey: number): boolean;
    }

    export function objectForEach(obj: Object, kvfn: (key:string, value:any) => void): void;

    export function extend(target: Object, source: Object): Object;
    export function propEq(propertyName: string, value: any): (obj: Object) => boolean;
    export function pluck(propertyName: string): (obj: Object) => any;
    export function arrayEquals<T>(a1: T[], a2: T[], equalsFn: (e1: T, e2: T) => boolean): boolean;
    export function arrayFirst<T>(a1:T[], predicate: (e:T) => boolean): T;
    export function arrayIndexOf<T>(a1: T[], predicate: (e: T) => boolean): number;
    export function arrayRemoveItem<T>(array: T[], item: T, shouldRemoveMultiple: boolean): T;
    export function arrayRemoveItem<T>(array: T[], predicate: (e: T) => boolean, shouldRemoveMultiple: boolean): T;
    export function arrayZip<T, U, TResult>(a1: T[], a2: U[], callback: (e1: T, e2: U) => TResult): TResult[];

    export function requireLib(libnames: string, errMessage: string): Object;
    export function using(obj: Object, property: string, tempValue: any, fn: () => any): any;
    export function memoize(Function): any;
    export function getUuid(): string;
    export function durationToSeconds(duration: string): number;

    export function isDate(o: any): boolean;
    export function isGuid(o: any): boolean;
    export function isDuration(o: any): boolean;
    export function isFunction(o: any): boolean;
    export function isEmpty(o: any): boolean;
    export function isNumeric(o: any): boolean;

    export function stringStartsWith(str: string, prefix: string): boolean;
    export function stringEndsWith(str: string, suffix: string): boolean;
    export function formatString(format: string, ...args: any[]): string;
}

declare module breeze {

    interface Entity {
        entityAspect: EntityAspect;
        entityType: EntityType;
    }

    interface ComplexObject {
        complexAspect: ComplexAspect;
        complexType: ComplexType;
    }

    interface IProperty {
        name: string;
        parentType: IStructuralType;
        validators: Validator[];
        isDataProperty: boolean;
        isNavigationProperty: boolean;
    }

    interface IStructuralType {
        complexProperties: DataProperty[];
        dataProperties: DataProperty[];
        name: string;
        namespace: string;
        shortName: string;
        unmappedProperties: DataProperty[];
        validators: Validator[];
    }

    class AutoGeneratedKeyType {
        static Identity: AutoGeneratedKeyType;
        static KeyGenerator: AutoGeneratedKeyType;
        static None: AutoGeneratedKeyType;
    }

    class ComplexAspect {
        complexObject: ComplexObject;
        getEntityAspect(): EntityAspect;
        parent: Object;
        parentProperty: DataProperty;
        getPropertyPath(propName: string): string;
        originalValues: Object;
    }

    class ComplexType implements IStructuralType {
        complexProperties: DataProperty[];
        dataProperties: DataProperty[];
        name: string;
        namespace: string;
        shortName: string;
        unmappedProperties: DataProperty[];
        validators: Validator[];
        addProperty(dataProperty: DataProperty);
        getProperties(): DataProperty[];
    }

    class DataProperty implements IProperty {
        complexTypeName: string;
        concurrencyMode: string;
        dataType: DataTypeSymbol;
        defaultValue: any;
        fixedLength: boolean;
        isComplexProperty: boolean;
        isDataProperty: boolean;
        isInherited: boolean;
        isNavigationProperty: boolean;
        isNullable: boolean;
        isPartOfKey: boolean;
        isUnmapped: boolean;
        
        maxLength: number;
        name: string;
        nameOnServer: string;
        parentType: IStructuralType;
        relatedNavigationProperty: NavigationProperty;
        validators: Validator[];
        constructor (config: DataPropertyOptions);
    }

    interface DataPropertyOptions {
        complexTypeName?: string;
        concurrencyMode?: string;
        dataType?: DataTypeSymbol;
        defaultValue?: any;
        fixedLength?: boolean;
        isNullable?: boolean;
        isPartOfKey?: boolean;
        isUnmapped?: boolean;
        maxLength?: number;
        name?: string;
        nameOnServer?: string;
        validators?: Validator[];
    }

    class DataService {
        adapterInstance: DataServiceAdapter;
        adapterName: string;
        hasServerMetadata: boolean;
        serviceName: string;
        jsonResultsAdapter: JsonResultsAdapter;
        useJsonp: boolean;
        constructor(config: DataServiceOptions);
        using(config: DataServiceOptions): DataService;
    }

    interface DataServiceOptions {
        serviceName?: string;
        adapterName?: string;
        hasServerMetadata?: boolean;
        jsonResultsAdapter?: JsonResultsAdapter;
        useJsonp?: boolean;
    }

    class DataServiceAdapter {
        checkForRecomposition(interfaceInitializedArgs: { interfaceName: string; isDefault: boolean}): void;
        initialize(): void;
        fetchMetadata(metadataStore: MetadataStore, dataService: DataService): Q.Promise<any>;
        executeQuery(mappingContext: Object): Q.Promise<any>;
        saveChanges(saveContext: { resourceName: string }, saveBundle: Object): Q.Promise<SaveResult>;
        JsonResultsAdapter: JsonResultsAdapter;
    }

    class JsonResultsAdapter {
        name: string;
        extractResults: (data: {}) => {};
        visitNode: (node: {}, queryContext: QueryContext, nodeContext: NodeContext) => { entityType?: EntityType; nodeId?: any; nodeRefId?: any; ignore?: boolean; };
        constructor(config: {
            name: string;
            extractResults?: (data: {}) => {};
            visitNode: (node: {}, queryContext: QueryContext, nodeContext: NodeContext) => { entityType?: EntityType; nodeId?: any; nodeRefId?: any; ignore?: boolean; };
        });
    }

    interface QueryContext {
        url: string;
        query: any; // how to also say it could be an EntityQuery or a string
        entityManager: EntityManager;
        dataService: DataService;
        queryOptions: QueryOptions;
    }

    interface NodeContext {
        nodeType: string;
    }

    class DataTypeSymbol extends breeze.core.EnumSymbol {
         defaultValue: any;
         isNumeric: boolean;
         isDate: boolean;
    }
    interface DataType extends breeze.core.IEnum {
        Binary: DataTypeSymbol;
        Boolean: DataTypeSymbol;
        Byte: DataTypeSymbol;
        DateTime: DataTypeSymbol;
        DateTimeOffset: DataTypeSymbol;
        Decimal: DataTypeSymbol;
        Double: DataTypeSymbol;
        Guid: DataTypeSymbol;
        Int16: DataTypeSymbol;
        Int32: DataTypeSymbol;
        Int64: DataTypeSymbol;
        Single: DataTypeSymbol;
        String: DataTypeSymbol;
        Time: DataTypeSymbol;
        Undefined: DataTypeSymbol;
        toDataType(typeName: string): DataTypeSymbol;
        parseDateFromServer(date: any): Date;
        defaultValue: any;
        isNumeric: boolean;
    }
    var DataType: DataType;

    class EntityActionSymbol extends breeze.core.EnumSymbol {
    }
    interface EntityAction extends breeze.core.IEnum {
        AcceptChanges: EntityActionSymbol;
        Attach: EntityActionSymbol;
        AttachOnImport: EntityActionSymbol;
        AttachOnQuery: EntityActionSymbol;
        Clear: EntityActionSymbol;
        Detach: EntityActionSymbol;
        EntityStateChange: EntityActionSymbol;
        MergeOnImport: EntityActionSymbol;
        MergeOnSave: EntityActionSymbol;
        MergeOnQuery: EntityActionSymbol;
        PropertyChange: EntityActionSymbol;
        RejectChanges: EntityActionSymbol;
    }
    var EntityAction: EntityAction;

    class EntityAspect {
        entity: Entity;
        entityManager: EntityManager;
        entityState: EntityStateSymbol;
        isBeingSaved: boolean;
        originalValues: Object;

        propertyChanged: PropertyChangedEvent;
        validationErrorsChanged: ValidationErrorsChangedEvent;

        acceptChanges(): void;
        addValidationError(validationError: ValidationError): void;
        clearValidationErrors(): void;
        getKey(forceRefresh?: boolean): EntityKey;

        getValidationErrors(): ValidationError[];
        getValidationErrors(property: string): ValidationError[];
        getValidationErrors(property: IProperty): ValidationError[];
        hasValidationErrors: boolean;

        loadNavigationProperty(navigationProperty: string, callback?: Function, errorCallback?: Function): Q.Promise<QueryResult>;
        loadNavigationProperty(navigationProperty: NavigationProperty, callback?: Function, errorCallback?: Function): Q.Promise<QueryResult>;

        rejectChanges(): void;

        removeValidationError(validator: Validator): void;
        removeValidationError(validator: Validator, property: DataProperty): void;
        removeValidationError(validator: Validator, property: NavigationProperty): void;
        removeValidationError(validationError: ValidationError): void;

        setDeleted(): void;
        setDetached(): void;
        setModified(): void;
        setUnchanged(): void;
        validateEntity(): boolean;

        validateProperty(property: string, context?: any): boolean;
        validateProperty(property: DataProperty, context?: any): boolean;
        validateProperty(property: NavigationProperty, context?: any): boolean;
    }

    class PropertyChangedEventArgs {
        entity: Entity;
        propertyName: string;
        oldValue: any;
        newValue: any;
    }

    class PropertyChangedEvent extends breeze.core.Event {
        subscribe(callback?: (data: PropertyChangedEventArgs) => void ): number;
    }

    class ValidationErrorsChangedEventArgs {
        entity: Entity;
        added: ValidationError[];
        removed: ValidationError[];
    }

    class ValidationErrorsChangedEvent extends breeze.core.Event {
        subscribe(callback?: (data: ValidationErrorsChangedEventArgs) => void ): number;
    }

    class EntityKey {
        constructor (entityType: EntityType, keyValue: any);
        constructor (entityType: EntityType, keyValues: any[]);

        equals(entityKey: EntityKey): boolean;
        static equals(k1: EntityKey, k2: EntityKey): boolean;
        entityType: EntityType;
        values: any[];
    }

    interface EntityByKeyResult {
        entity: Entity;
        entityKey: EntityKey;
        fromCache: boolean;
    }

    class EntityManager {
        dataService: DataService;
        keyGeneratorCtor: Function;
        metadataStore: MetadataStore;
        queryOptions: QueryOptions;
        saveOptions: SaveOptions;
        serviceName: string;
        validationOptions: ValidationOptions;

        entityChanged: EntityChangedEvent;
        hasChangesChanged: HasChangesChangedEvent;
        validationErrorsChanged: ValidationErrorsChangedEvent;

        constructor (config?: EntityManagerOptions);
        constructor (config?: string);

        addEntity(entity: Entity): Entity;
        attachEntity(entity: Entity, entityState?: EntityStateSymbol): Entity;
        clear(): void;
        createEmptyCopy(): EntityManager;
        createEntity(typeName: string, config?: {}, entityState?: EntityStateSymbol) : Entity;
        createEntity(entityType: EntityType, config?: {}, entityState?: EntityStateSymbol): Entity;
        detachEntity(entity: Entity): boolean;
        executeQuery(query: string, callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Q.Promise<QueryResult>;
        executeQuery(query: EntityQuery, callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Q.Promise<QueryResult>;

        executeQueryLocally(query: EntityQuery): Entity[];
        exportEntities(entities?: Entity[]): string;
        fetchEntityByKey(typeName: string, keyValue: any, checkLocalCacheFirst?: boolean): Q.Promise<EntityByKeyResult>;
        fetchEntityByKey(typeName: string, keyValues: any[], checkLocalCacheFirst?: boolean): Q.Promise<EntityByKeyResult>;
        fetchEntityByKey(entityKey: EntityKey): Q.Promise<EntityByKeyResult>;
        fetchMetadata(callback?: (schema: any) => void , errorCallback?: breeze.core.ErrorCallback): Q.Promise<any>;
        generateTempKeyValue(entity: Entity): any;
        getChanges(): Entity[];
        getChanges(entityTypeName: string): Entity[];
        getChanges(entityTypeNames: string[]): Entity[];
        getChanges(entityType: EntityType): Entity[];
        getChanges(entityTypes: EntityType[]): Entity[];

        getEntities(entityTypeName: string, entityState?: EntityStateSymbol): Entity[];
        getEntities(entityTypeNames?: string[], entityState?: EntityStateSymbol): Entity[];
        getEntities(entityTypeName?: string, entityStates?: EntityStateSymbol[]): Entity[];
        getEntities(entityTypeNames?: string[], entityStates?: EntityStateSymbol[]): Entity[];

        getEntities(entityType: EntityType, entityState?: EntityStateSymbol): Entity[];
        getEntities(entityTypes?: EntityType[], entityState?: EntityStateSymbol): Entity[];
        getEntities(entityType?: EntityType, entityStates?: EntityStateSymbol[]): Entity[];
        getEntities(entityTypes?: EntityType[], entityStates?: EntityStateSymbol[]): Entity[];

        getEntityByKey(typeName: string, keyValue: any): Entity;
        getEntityByKey(typeName: string, keyValues: any[]): Entity;
        getEntityByKey(entityKey: EntityKey): Entity;

        hasChanges(): boolean;
        hasChanges(entityTypeName: string): boolean;
        hasChanges(entityTypeNames: string[]): boolean;
        hasChanges(entityType: EntityType): boolean;
        hasChanges(entityTypes: EntityType[]): boolean;

        static importEntities(exportedString: string, config?: { mergeStrategy?: MergeStrategySymbol; }): EntityManager;
        static importEntities(exportedData: Object, config?: { mergeStrategy?: MergeStrategySymbol; }): EntityManager;
        importEntities(exportedString: string, config?: { mergeStrategy?: MergeStrategySymbol; }): EntityManager;
        importEntities(exportedData: Object, config?: { mergeStrategy?: MergeStrategySymbol; }): EntityManager;

        rejectChanges(): Entity[];
        saveChanges(entities?: Entity[], saveOptions?: SaveOptions, callback?: SaveChangesSuccessCallback, errorCallback?: SaveChangesErrorCallback): Q.Promise<SaveResult>;
        setProperties(config: EntityManagerProperties): void;
    }

    interface EntityManagerOptions {
        serviceName?: string;
        dataService?: DataService;
        metadataStore?: MetadataStore;
        queryOptions?: QueryOptions;
        saveOptions?: SaveOptions;
        validationOptions?: ValidationOptions;
        keyGeneratorCtor?: Function;
    }

    interface EntityManagerProperties {
        serviceName?: string;
        dataService?: DataService;
        queryOptions?: QueryOptions;
        saveOptions?: SaveOptions;
        validationOptions?: ValidationOptions;
        keyGeneratorCtor?: Function;
    }

    interface ExecuteQuerySuccessCallback {
        (data: QueryResult): void;
    }

    interface ExecuteQueryErrorCallback {
        (error: { query: EntityQuery; XHR: XMLHttpRequest; entityManager: EntityManager}): void;
    }

    interface SaveChangesSuccessCallback {
        (saveResult: SaveResult): void;
    }

    interface SaveChangesErrorCallback {
        (error: { XHR: XMLHttpRequest; }): void;
    }

    class EntityChangedEventArgs {
        entity: Entity;
        entityAction: EntityActionSymbol;
        args: Object;
    }

    class EntityChangedEvent extends breeze.core.Event {
        subscribe(callback?: (data: EntityChangedEventArgs) => void ): number;
    }

    class HasChangesChangedEventArgs {
        entityManager: EntityManager;
        hasChanges: boolean;
    }

    class HasChangesChangedEvent extends breeze.core.Event {
        subscribe(callback?: (data: HasChangesChangedEventArgs) => void ): number;
    }

    class EntityQuery {
        entityManager: EntityManager;
        orderByClause: OrderByClause;
        parameters: Object;
        queryOptions: QueryOptions;
        resourceName: string;
        resultEntityType: EntityType;
        skipCount: number;
        takeCount: number;
        wherePredicate: Predicate;

        constructor (resourceName?: string);

        execute(callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Q.Promise<QueryResult>;
        executeLocally(): Entity[];
        expand(propertyPaths: string[]): EntityQuery;
        expand(propertyPaths: string): EntityQuery;
        static from(resourceName: string): EntityQuery;
        from(resourceName: string): EntityQuery;
        static fromEntities(entity: Entity): EntityQuery;
        static fromEntities(entities: Entity[]): EntityQuery;
        static fromEntityKey(entityKey: EntityKey): EntityQuery;
        static fromEntityNavigation(entity: Entity, navigationProperty: NavigationProperty): EntityQuery;
        inlineCount(enabled?: boolean): EntityQuery;
        orderBy(propertyPaths: string): EntityQuery;
        orderBy(propertyPaths: string[]): EntityQuery;
        orderByDesc(propertyPaths: string): EntityQuery;
        orderByDesc(propertyPaths: string[]): EntityQuery;
        select(propertyPaths: string): EntityQuery;
        select(propertyPaths: string[]): EntityQuery;
        skip(count: number): EntityQuery;
        take(count: number): EntityQuery;
        top(count: number): EntityQuery;
        toType(typeName: string): EntityQuery;
        toType(type: EntityType): EntityQuery;

        using(obj: EntityManager): EntityQuery;
        using(obj: DataService): EntityQuery;
        using(obj: JsonResultsAdapter): EntityQuery;
        using(obj: QueryOptions): EntityQuery;
        using(obj: MergeStrategySymbol): EntityQuery;
        using(obj: FetchStrategySymbol): EntityQuery;

        where(predicate: Predicate): EntityQuery;
        where(property: string, operator: string, value: any): EntityQuery;
        where(property: string, operator: FilterQueryOpSymbol, value: any): EntityQuery;
        where(predicate: FilterQueryOpSymbol): EntityQuery;
        withParameters(params: Object): EntityQuery;
    }

    interface OrderByClause {
    }

    class EntityStateSymbol extends breeze.core.EnumSymbol {
        isAdded(): boolean;
        isAddedModifiedOrDeleted(): boolean;
        isDeleted(): boolean;
        isDetached(): boolean;
        isModified(): boolean;
        isUnchanged(): boolean;
        isUnchangedOrModified(): boolean;
    }
    interface EntityState extends breeze.core.IEnum {
        Added: EntityStateSymbol;
        Deleted: EntityStateSymbol;
        Detached: EntityStateSymbol;
        Modified: EntityStateSymbol;
        Unchanged: EntityStateSymbol;
    }
    var EntityState: EntityState;

    class EntityType implements IStructuralType {
        autoGeneratedKeyType: AutoGeneratedKeyType;
        baseEntityType: EntityType;
        complexProperties: DataProperty[];
        concurrencyProperties: DataProperty[];
        dataProperties: DataProperty[];
        defaultResourceName: string;
        foreignKeyProperties: DataProperty[];
        isAbstract: boolean;
        keyProperties: DataProperty[];
        metadataStore: MetadataStore;
        name: string;
        namespace: string;
        navigationProperties: NavigationProperty[];
        shortName: string;
        unmappedProperties: DataProperty[];
        validators: Validator[];

        constructor (config: MetadataStore);
        constructor (config: EntityTypeOptions);

        addProperty(property: IProperty): void;
        addValidator(validator: Validator, property?: IProperty): void;
        createEntity(initialValues?: Object): Entity;
        getCtor(): Function;
        getDataProperty(propertyName: string): DataProperty;
        getNavigationProperty(propertyName: string): NavigationProperty;
        getProperties(): IProperty[];
        getProperty(propertyPath: string, throwIfNotFound?: boolean): IProperty;
        getPropertyNames(): string[];
        getSelfAndSubtypes(): EntityType[];
        isSubtypeOf(entityType: EntityType): boolean;
        setProperties(config: EntityTypeProperties): void;
        toString(): string;
    }

    interface EntityTypeOptions {
        shortName?: string;
        namespace?: string;
        autoGeneratedKeyType?: AutoGeneratedKeyType;
        defaultResourceName?: string;
        dataProperties?: DataProperty[];
        navigationProperties?: NavigationProperty[];
    }

    interface EntityTypeProperties {
        autoGeneratedKeyType?: AutoGeneratedKeyType;
        defaultResourceName?: string;
    }

    class FetchStrategySymbol extends breeze.core.EnumSymbol {
    }
    interface FetchStrategy extends breeze.core.IEnum {
        FromLocalCache: FetchStrategySymbol;
        FromServer: FetchStrategySymbol;
    }
    var FetchStrategy: FetchStrategy;

    class FilterQueryOpSymbol extends breeze.core.EnumSymbol {
    }
    interface FilterQueryOp extends breeze.core.IEnum {
        Contains: FilterQueryOpSymbol;
        EndsWith: FilterQueryOpSymbol;
        Equals: FilterQueryOpSymbol;
        GreaterThan: FilterQueryOpSymbol;
        GreaterThanOrEqual: FilterQueryOpSymbol;
        IsTypeOf: FilterQueryOpSymbol;
        LessThan: FilterQueryOpSymbol;
        LessThanOrEqual: FilterQueryOpSymbol;
        NotEquals: FilterQueryOpSymbol;
        StartsWith: FilterQueryOpSymbol;
    }
    var FilterQueryOp: FilterQueryOp;

    class LocalQueryComparisonOptions {
        static caseInsensitiveSQL: LocalQueryComparisonOptions;
        static defaultInstance: LocalQueryComparisonOptions;

        constructor (config: { name?: string; isCaseSensitive?: boolean; usesSql92CompliantStringComparison?: boolean; });

        setAsDefault(): void;
    }

    class MergeStrategySymbol extends breeze.core.EnumSymbol {
    }
    interface MergeStrategy extends breeze.core.IEnum {
        OverwriteChanges: MergeStrategySymbol;
        PreserveChanges: MergeStrategySymbol;
    }
    var MergeStrategy: MergeStrategy;

    class MetadataStore {
        constructor();
        constructor(config?: MetadataStoreOptions);
        namingConvention: NamingConvention;
        addDataService(dataService: DataService): void;
        addEntityType(structuralType: IStructuralType): void;
        exportMetadata(): string;
        fetchMetadata(dataService: string, callback?: (data) => void , errorCallback?: breeze.core.ErrorCallback): Q.Promise<any>;
        fetchMetadata(dataService: DataService, callback?: (data) => void , errorCallback?: breeze.core.ErrorCallback): Q.Promise<any>;
        getDataService(serviceName: string): DataService;
        getEntityType(entityTypeName: string, okIfNotFound?: boolean): IStructuralType;
        getEntityTypes(): IStructuralType[];
        hasMetadataFor(serviceName: string): boolean;
        static importMetadata(exportedString: string): MetadataStore;
        importMetadata(exportedString: string): MetadataStore;
        isEmpty(): boolean;
        registerEntityTypeCtor(entityTypeName: string, entityCtor: Function, initializationFn?: (entity: Entity) =>void ): void;
        trackUnmappedType(entityCtor: Function, interceptor?: Function);
        setEntityTypeForResourceName(resourceName: string, entityType: EntityType): void;
        setEntityTypeForResourceName(resourceName: string, entityTypeName: string): void;
        getEntityTypeNameForResourceName(resourceName: string): string;
    }

    interface MetadataStoreOptions {
        namingConvention?: NamingConvention;
        localQueryComparisonOptions?: LocalQueryComparisonOptions;
    }

    class NamingConvention {
        static camelCase: NamingConvention;
        static defaultInstance: NamingConvention;
        static none: NamingConvention;

        constructor (config: NamingConventionOptions);

        clientPropertyNameToServer(clientPropertyName: string): string;
        clientPropertyNameToServer(clientPropertyName: string, property: IProperty): string;

        serverPropertyNameToClient(serverPropertyName: string): string;
        serverPropertyNameToClient(serverPropertyName: string, property: IProperty): string;

        setAsDefault();
    }

    interface NamingConventionOptions {
        serverPropertyNameToClient?: (name: string) => string;
        clientPropertyNameToServer?: (name: string) => string;
    }

    class NavigationProperty implements IProperty {
        associationName: string;
        entityType: EntityType;
        foreignKeyNames: string[];
        inverse: NavigationProperty;
        isDataProperty: boolean;
        isNavigationProperty: boolean;
        isScalar: boolean;
        name: string;
        parentType: IStructuralType;
        relatedDataProperties: DataProperty[];
        validators: Validator[];

        constructor (config: NavigationPropertyOptions);
    }

    interface NavigationPropertyOptions {
        name?: string;
        nameOnServer?: string;
        entityTypeName: string;
        isScalar?: boolean;
        associationName?: string;
        foreignKeyNames?: string[];
        foreignKeyNamesOnServer?: string[];
        validators?: Validator[];
    }

    class Predicate {
        constructor (property: string, operator: string, value: any, valueIsLiteral?: boolean);
        constructor (property: string, operator: FilterQueryOpSymbol, value: any, valueIsLiteral?: boolean);

        and: PredicateMethod;
        static and: PredicateMethod;

        static create: PredicateMethod;

        static isPredicate(o: any): boolean;

        static not(predicate: Predicate): Predicate;
        not(): Predicate;

        static or: PredicateMethod;
        or: PredicateMethod;

        toFunction(): Function;
        toString(): string;
        validate(entityType: EntityType): void;
    }

    interface PredicateMethod {
        (predicates: Predicate[]): Predicate;
        (...predicates: Predicate[]): Predicate;
        (property: string, operator: string, value: any, valueIsLiteral?: boolean): Predicate;
        (property: string, operator: FilterQueryOpSymbol, value: any, valueIsLiteral?: boolean): Predicate;
    }

    class QueryOptions {
        static defaultInstance: QueryOptions;
        fetchStrategy: FetchStrategySymbol;
        mergeStrategy: MergeStrategySymbol;

        constructor (config?: QueryOptionsConfiguration);

        setAsDefault(): void;
        using(config: QueryOptionsConfiguration): QueryOptions;
        using(config: MergeStrategySymbol): QueryOptions;
        using(config: FetchStrategySymbol): QueryOptions;
    }

    interface QueryOptionsConfiguration {
        fetchStrategy?: FetchStrategySymbol;
        mergeStrategy?: MergeStrategySymbol;
    }

    interface QueryResult {
        results: Entity[];
        query: EntityQuery;
        XHR: XMLHttpRequest;
        entityManager?: EntityManager;
        inlineCount?: number
    }

    class SaveOptions {
        allowConcurrentSaves: boolean;
        resourceName: string;
        dataService: DataService;
        tag: string;
        static defaultInstance: SaveOptions;

        constructor (config?: { allowConcurrentSaves?: boolean; });

        setAsDefault(): SaveOptions;
        using(config: SaveOptionsConfiguration): SaveOptions;
    }

    interface SaveOptionsConfiguration {
        allowConcurrentSaves?: boolean;
        resourceName?: string;
        dataService?: DataService;
        tag?: string;
    }

    interface SaveResult {
        entities: Entity[];
        keyMappings: any;
        XHR: XMLHttpRequest;
    }

    class ValidationError {
        key: string;
        context: any;
        errorMessage: string;
        property: IProperty;
        propertyName: string;
        validator: Validator;
        getKey: (validator: Validator, property: string) => string;

        constructor (validator: Validator, context: any, errorMessage: string, key: string);
    }

    class ValidationOptions {
        static defaultInstance: ValidationOptions;
        validateOnAttach: boolean;
        validateOnPropertyChange: boolean;
        validateOnQuery: boolean;
        validateOnSave: boolean;

        constructor (config?: ValidationOptionsConfiguration);

        setAsDefault(): ValidationOptions;
        using(config: ValidationOptionsConfiguration): ValidationOptions;
    }

    interface ValidationOptionsConfiguration {
        validateOnAttach?: boolean;
        validateOnSave?: boolean;
        validateOnQuery?: boolean;
        validateOnPropertyChange?: boolean;
    }

    class Validator {
        static messageTemplates: any;
        context: any;
        name: string;

        constructor (name: string, validatorFn: ValidatorFunction, context?: any);

        static bool(): Validator;
        static byte(): Validator;
        static date(): Validator;
        static duration(): Validator;

        static guid(): Validator;
        static int16(): Validator;
        static int32(): Validator;
        static int64(): Validator;
        static maxLength(context: { maxLength: number; }): Validator;
        static number(): Validator;
        static required(): Validator;
        static string(): Validator;
        static stringLength(context: { maxLength: number; minLength: number; }): Validator;
        
        static register(validator: Validator);
        static registerFactory(fn: () => Validator, name: string);

        validate(value: any, context?: any): ValidationError;
        getMessage(): string;
    }

    interface ValidatorFunction {
        (value: any, context: ValidatorFunctionContext): void;
    }

    interface ValidatorFunctionContext {
        value: any;
        validatorName: string;
        displayName: string;
        messageTemplate: string;
        message?: string;
    }

    var metadataVersion: string;
    var remoteAccess_odata: string;
    var remoteAccess_webApi: string;
    var version: string;
}

declare module breeze.config {
    var ajax: string;
    var dataService: string;
    var functionRegistry: Object;
    export function getAdapter(interfaceName: string, adapterName: string): Object;
    export function getAdapterInstance(interfaceName: string, adapterName: string): Object;
    export function initializeAdapterInstance(interfaceName: string, adapterName: string, isDefault: boolean): void;
    export function initializeAdapterInstances(config: Object): void;
    var interfaceInitialized: Event;
    var interfaceRegistry: Object;
    var objectRegistry: Object;
    export function registerAdapter(interfaceName: string): void;
    export function registerFunction(fn: Function, fnName: string): void;
    export function registerType(ctor: Function, typeName: string): void;
    //static setProperties(config: Object): void; //deprecated
    var stringifyPad: string;
    var typeRegistry: Object;

}
