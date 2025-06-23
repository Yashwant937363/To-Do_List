export default interface Note {
  id?: string;
  title: string;
  body: string;
  tag: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
