export interface IService<T> {
  getAll(): Promise<T[]>
}
