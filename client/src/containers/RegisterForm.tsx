import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AnyAction, Dispatch } from 'redux';
import * as auth from '../actions/auth';
import * as status from '../actions/status';
import RegisterForm from '../components/RegisterForm';
import { IUser } from '../types';
const createHandlers = ({
    history,
    dispatch,
}: {
    history: History;
    dispatch: Dispatch<AnyAction>;
}) => {
    const register = async (data: IUser) => {
        dispatch(status.clear());
        const request = {
            body: JSON.stringify({
                ...data,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            type: 'cors',
        };
        try {
            const response = await fetch('/api/auth/register/', request);
            const parsed = await response.json();
            if (parsed.error) {
                throw new Error(parsed.error);
            }
            if (parsed.data) {
                dispatch(
                    status.add({
                        message: 'Successfully registered',
                        severity: 'info',
                    }),
                );
                dispatch(auth.login(parsed.data));
                history.push('/');
            }
        } catch (error) {
            dispatch(
                status.add({
                    message: error.message,
                    severity: 'error',
                }),
            );
            // console.log(error.message);
        }
    };

    return {
        register,
    };
};

export default withRouter<any>(
    connect()((props: { history: History; dispatch: Dispatch<AnyAction> }) => (
        <RegisterForm handlers={createHandlers(props)} />
    )),
);
