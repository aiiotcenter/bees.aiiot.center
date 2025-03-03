// auth.js - Handles AWS Cognito authentication
import { Auth } from 'aws-amplify';

export const signUp = async (email, password) => {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
      attributes: { email },
    });
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const user = await Auth.signIn(email, password);
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
};