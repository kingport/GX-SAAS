import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Form, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import Footer from '@/components/Footer';
// import { login } from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { getPhoneCode, login } from '@/services/login';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('mobile');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log(userInfo, 'USERINFO');
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await login({ ...values });
      if (msg.data) {
        const { token, user_id, platform_id } = msg.data;
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        // 缓存tokn和userid
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('platform_id', `${platform_id}`);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        // if (!history) return;
        // const { query } = history.location;
        // const { redirect } = query as { redirect: string };
        // history.push(redirect || '/');
        history.push('/welcome');
        return;
      }
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
    setSubmitting(false);
  };

  const { code, msg } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <span className={styles.title}>飞天系统</span>
            </Link>
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            // initialValues={{
            //   user_name: 'ddcx_admin',
            //   phone: '18963374856',
            //   code: '888888',
            // }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            form={form}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              {/* <Tabs.TabPane
               key="account"
               tab={intl.formatMessage({
                 id: 'pages.login.accountLogin.tab',
                 defaultMessage: '账户密码登录',
               })}
              /> */}
              {/* <Tabs.TabPane
               key="mobile"
               tab={intl.formatMessage({
                 id: 'pages.login.phoneLogin.tab',
                 defaultMessage: '账户密码登录',
               })}
              /> */}
            </Tabs>

            {code !== 0 && msg && <LoginMessage content={msg} />}
            {/* {type === 'account' && (
              <>
                <ProFormText
                  name="user_name"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'用户名: admin or user'}
                  rules={[
                    {
                      required: true,
                      message: '用户名是必填项！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'密码: ant.design'}
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项！',
                    },
                  ]}
                />
              </>
            )} */}

            {/* {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />} */}
            {type === 'mobile' && (
              <>
                <ProFormText
                  name="user_name"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={`请输入账号`}
                  rules={[
                    {
                      required: true,
                      message: '请输入账号',
                    },
                  ]}
                />
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={styles.prefixIcon} />,
                  }}
                  name="phone"
                  placeholder={`请输入手机号`}
                  rules={[
                    {
                      required: true,
                      message: '请输入手机号！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误！',
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={`请输入验证码`}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} 获取验证码`;
                    }
                    return '获取验证码';
                  }}
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ]}
                  onGetCaptcha={async () => {
                    const phone = form.getFieldValue('phone');
                    const user_name = form.getFieldValue('user_name');
                    if (phone && user_name) {
                      const result = await getPhoneCode({
                        phone,
                        user_name,
                      });
                      if (result.code === 0) {
                        message.success('发送成功');
                      } else {
                        // throw message.error(result.message);
                        throw new Error("获取验证码错误")
                      }
                    } else {
                      throw message.error('请填写手机号和用户名');
                    }
                  }}
                />
              </>
            )}
            {/* <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码 ?
              </a>
            </div> */}
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
