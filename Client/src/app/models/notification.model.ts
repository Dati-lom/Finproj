export interface Notification {
  id: number,
  title: string,
  content: string,
  read: boolean | false,
  createdAt: Date,
}
