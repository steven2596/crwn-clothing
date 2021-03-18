import React from 'react';
import { connect } from 'react-redux';

import './sign-in.style.scss';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils.js';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = this.state;
        const { emailSignInStart } = this.props;

        emailSignInStart(email, password);
        this.setState({ email: '', password: '' });

    }

    //in this case, event.target = <input>
    handleChange = (event) => {

        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const { googleSignInStart } = this.props;
        return (
            <div className='sign-in'>
                <h2 className='title' >I already have an account</h2>
                <span className='sub-title'>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit} >
                    <FormInput
                        type='email'
                        name='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label='Email'
                        required
                    />

                    <FormInput
                        type='password'
                        name='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn >Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);

//If user type 'taengoo777@gmail.com' in Email <input>
//onChange => handleChange => this.setState({email: 'taengoo777@gmail.com'})
// In this case, event.target =  <input
                            //     type='email'
                            //     name='email'
                            //     value={this.state.email}
                            //     onChange={this.handleChange}
                            //     required
                            //  /> 

// event.target.value = 'taengoo777@gmail' which is the email user typed in email input