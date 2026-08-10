export default interface Note {
  id?: string;
  title: string;
  body: string;
  tag: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}
