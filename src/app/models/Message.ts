export interface Message {
  infoUserMessage: any;
  id: number;
  message_content: string;
  topic_id: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  reponses?: Reponse[];

}

export interface Reponse {
  id: number;
  reply_content: string;
  user_id: number;
  message_id: number;
  created_at: Date;
  updated_at: Date;
}