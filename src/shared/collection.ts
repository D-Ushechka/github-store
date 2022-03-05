export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

export const normalizeCollection = <K extends string | number, T>(
  elements: T[],
  getKeyForElement: (element: T) => K
): CollectionModel<K, T> => {
  const collection: CollectionModel<K, T> = getInitialCollectionModel();

  elements.forEach((el) => {
    const id = getKeyForElement(el);
    collection.order.push(id);
    collection.entities[id] = el;
  });

  return collection;
};

export const linearizeCollection = <K extends string | number, T>(
  elements: CollectionModel<K, T>
): T[] => elements.order.map((el) => elements.entities[el]);

export const pushCollection = <K extends string | number, T>(
  prevCollection: CollectionModel<K, T>,
  elements: T[],
  getKeyForElement: (element: T) => K
): CollectionModel<K, T> => {
  const newCollection = getInitialCollectionModel();

  prevCollection.order.forEach((el) => {
    newCollection.order.push(el);
    newCollection.entities[el] = prevCollection.entities[el];
  });

  elements.forEach((el) => {
    const id = getKeyForElement(el);
    newCollection.order.push(id);
    newCollection.entities[id] = el;
  });

  return newCollection;
};
