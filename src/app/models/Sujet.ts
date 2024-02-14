
import { Forum } from './modelForum';

export interface Sujet {
  id: number;
  content: string;
  forum_id: number;
  forum: Forum;
  user_id: number;
  message_received: number;
  created_at: Date;
}

