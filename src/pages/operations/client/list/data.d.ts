export type AddMessageParams = {
  city_id: number;
  range_person: number;
  content: string;
  content_summary?: string;
  content_title: string;
  content_url?: string;
  end_time: string;
  send_time: string;
  type: number;
  time?: string[];
};

export type MessageListParams = {
  type: number;
  range_person: number;
  status: number;
};
export interface MessageList {
  id: number;
  platform_id: number;
  type: number;
  city_id: number;
  range_person: number;
  content_title: string;
  content: string;
  content_url: string;
  content_summary: string;
  send_time: string;
  end_time: string;
  operator_id: any;
  operator_name: string;
  create_time: string;
  update_time: string;
  status: number;
}

export interface Data {
  total_count: number;
  message_list: MessageList[];
  page_index: number;
}

export interface RootObject {
  code: number;
  message: string;
  data: Data;
}

export interface DetailData {
  id: number;
  platform_id: number;
  type: number;
  city_id: number;
  range_person: number;
  content_title: string;
  content: string;
  content_url: string;
  content_summary: string;
  send_time: string;
  end_time: string;
  status: number;
  driver_phone: string;
  operator_id: number;
  operator_name: string;
  create_time: string;
  update_time: string;
  status?: number;
}

export interface DetailRootObject {
  code: number;
  message: string;
  data: DetailData;
}

export type EditMessageParams = {
  city_id: number;
  range_person: number;
  content: string;
  content_summary?: string;
  content_title: string;
  content_url?: string;
  end_time: string;
  send_time: string;
  type: number;
  time?: string[];
  id: number;
};
