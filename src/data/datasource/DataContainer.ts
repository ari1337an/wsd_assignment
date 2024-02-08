export default class DataContainer<T> {
  private static instance: DataContainer<any>;
  private store: T[] = [];

  private constructor() {}

  static getInstance(): DataContainer<any> {
    if (!DataContainer.instance) {
      DataContainer.instance = new DataContainer();
    }
    return DataContainer.instance;
  }

  addObject(object: T): void {
    this.store.push(object);
  }

  removeObjectAtIndex(index: number): void {
    this.store = this.store.filter((_, i) => i !== index);
  }

  getAllObjects(): T[] {
    return this.store;
  }

  clear(): void {
    this.store = [];
  }
}
