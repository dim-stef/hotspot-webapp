import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {Layout, Input, Form, Checkbox, Button} from 'antd';
import {UserContext} from '../../../context/UserContext';
import Wrapper from '../Wrapper/Wrapper';
import axios from 'axios';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login(){
  const userContext = useContext(UserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    try{
      setLoading(true);
      let response = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/auth/local`, {
        identifier: values.email,
        password: values.password
      })
      userContext.setAuth(response.data.jwt);
      setLoading(false);
    }catch(e){
      userContext.setAuth(null);
      setLoading(false);
    }
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  useEffect(()=>{
    if(userContext.isAuth){
      history.push('/');
    }
  },[userContext.isAuth])

  return(
    <Wrapper>
      <Form
        {...layout}
        style={{width:'100%'}}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

export default Login;
