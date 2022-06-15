import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import styles from './Welcome.less';
import { useModel, history } from 'umi';

export default (): React.ReactNode => {
  const { initialState } = useModel('@@initialState');

  return (
    <Card>
      <p>欢迎你，{initialState?.currentUser?.user_info.user_name}</p>
      <p>{initialState?.currentUser?.user_info.email}</p>
      <p>{initialState?.currentUser?.user_info.phone}</p>
      <p>{initialState?.currentUser?.user_info.platform_name}</p>
    </Card>
  );
};
