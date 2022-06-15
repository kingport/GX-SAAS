import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
import { useModel } from 'umi';
export default () => {
  const currentYear = new Date().getFullYear();
  const { initialState } = useModel('@@initialState');
  let defaultMessage = '';
  if (initialState?.currentUser?.user_info) {
    defaultMessage = initialState?.currentUser.user_info?.platform_name || '';
  }

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={
        [
          // {
          //   key: 'Ant Design Pro',
          //   title: 'Ant Design Pro',
          //   href: 'https://pro.ant.design',
          //   blankTarget: true,
          // },
          // {
          //   key: 'github',
          //   title: <GithubOutlined />,
          //   href: 'https://github.com/ant-design/ant-design-pro',
          //   blankTarget: true,
          // },
          // {
          //   key: 'Ant Design',
          //   title: 'Ant Design',
          //   href: 'https://ant.design',
          //   blankTarget: true,
          // },
        ]
      }
    />
  );
};
