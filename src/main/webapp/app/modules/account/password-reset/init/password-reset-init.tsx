import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Alert, Col, Row } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { handlePasswordResetInit, reset } from '../password-reset.reducer';

export type IPasswordResetInitProps = DispatchProps;

export class PasswordResetInit extends React.Component<IPasswordResetInitProps> {
  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handlePasswordResetInit(values.email);
    event.preventDefault();
  };

  render() {
    return (
      <div className="middle-box text-center loginscreen animated fadeInDown">
        <div>
          <div>
            <h1 className="logo-name">IN+</h1>
          </div>
          <h2>
            <Translate contentKey="reset.request.title">Reset your password</Translate>
          </h2>
          <Alert color="warning">
            <p>
              <Translate contentKey="reset.request.messages.info">Enter the email address you used to register</Translate>
            </p>
          </Alert>
          <AvForm onValidSubmit={this.handleValidSubmit}>
            <AvField
              name="email"
              label={translate('global.form.email')}
              placeholder={translate('global.form.email.placeholder')}
              type="email"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') }
              }}
            />
            <Button color="primary" type="submit">
              <Translate contentKey="reset.request.form.button">Reset password</Translate>
            </Button>
          </AvForm>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { handlePasswordResetInit, reset };

type DispatchProps = typeof mapDispatchToProps;

export default connect(
  null,
  mapDispatchToProps
)(PasswordResetInit);
