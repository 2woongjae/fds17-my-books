import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import styles from './Signin.module.css';

// class 컴포넌트에서 사용하는 createRef 함수
class Signin extends React.Component {
  _password = React.createRef();

  state = {
    email: '',
  };

  render() {
    console.log(this.state.email);
    const isEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(
      this.state.email,
    );

    console.log(this._password);

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
                  {/* <Input
                          name="email"
                          placeholder="Email"
                          autoComplete="email"
                          className={styles.input}
                        /> */}
                  <input
                    type="text"
                    value={this.state.email}
                    onChange={this.change}
                    onMouseOver={this._onMouseOver}
                  />
                  {isEmail ? '이메일 맞음' : '이메일 아님'}
                </div>
                <div className={styles.email_title}>
                  Password
                  <span className={styles.required}> *</span>
                </div>
                <div className={styles.input_area}>
                  {/* <Input
                    type="password"
                    autoComplete="current-password"
                    className={styles.input}
                  /> */}
                  <input type="password" ref={this._password} />
                </div>
                <div className={styles.button_area}>
                  <Button
                    size="large"
                    loading={false}
                    className={styles.button}
                    onClick={this.click}
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

  _onMouseOver = (e) => {
    this._password.current.focus();
  };

  click = () => {
    const password = this._password.current.value;
    console.log('clicked', this.state.email, password);
  };

  change = (e) => {
    this.setState({ email: e.target.value });
  };
}

export default Signin;
