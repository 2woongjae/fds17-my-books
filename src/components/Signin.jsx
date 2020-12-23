import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import styles from './Signin.module.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

// class 컴포넌트에서 사용하는 createRef 함수
class Signin extends React.Component {
  _password = React.createRef();

  state = {
    email: '',
    loading: false,
  };

  render() {
    const { email, loading } = this.state;

    const isEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email);

    return (
      <form>
        <Row align="middle" className={styles.signin_row}>
          <Col span={24}>
            <Row className={styles.signin_contents}>
              <Col span={12}>
                <img
                  src="/img/bg_signin.png"
                  alt="Signin"
                  className={styles.signin_bg}
                />
              </Col>
              <Col span={12}>
                <div className={styles.signin_title}>My Books</div>
                <div className={styles.signin_subtitle}>
                  Please Note Your Opinion
                </div>
                <div className={styles.signin_underline} />
                <div className={styles.email_title}>
                  Email
                  <span className={styles.required}> *</span>
                </div>
                <div className={styles.input_area}>
                  <Input
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    className={styles.input}
                    value={this.state.email}
                    onChange={this.change}
                  />
                </div>
                <div className={styles.email_title}>
                  Password
                  <span className={styles.required}> *</span>
                </div>
                <div className={styles.input_area}>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    className={styles.input}
                    ref={this._password}
                  />
                </div>
                <div className={styles.button_area}>
                  <Button
                    size="large"
                    loading={loading}
                    className={styles.button}
                    onClick={this.click}
                    disabled={!isEmail}
                  >
                    Sign In
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </form>
    );
  }

  click = async () => {
    const { email } = this.state;
    const password = this._password.current.input.value;
    console.log('clicked', email, password);

    // 서버에다가 이메일 패스워드 보내서 인증된 사용자인지 체크
    // axios
    //   .post('https://api.marktube.tv/v1/me', {
    //     email,
    //     password,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    try {
      // 호출 시작 => 로딩 시작
      this.setState({ loading: true });
      const response = await axios.post('https://api.marktube.tv/v1/me', {
        email,
        password,
      });
      // sleep
      await sleep(2000);
      this.setState({ loading: false });
      // 호출 완료 (정상) => 로딩 끝
      console.log(response.data.token);
      // 토큰을 브라우저 어딘가에 저장한다.
      localStorage.setItem('token', response.data.token);
      // 페이지를 이동한다.
      this.props.history.push('/');
    } catch (error) {
      this.setState({ loading: false });
      // 호출 완료 (에러) => 로딩 끝
      console.log(error);
    }
  };

  change = (e) => {
    this.setState({ email: e.target.value });
  };
}

export default withRouter(Signin);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
