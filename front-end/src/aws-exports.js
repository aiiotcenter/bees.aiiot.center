const awsConfig = {
    Auth: {
      region: "us-east-1",
      userPoolId: "us-east-1_xxxxxx",
      userPoolWebClientId: "your-app-client-id",
      authenticationFlowType: "USER_PASSWORD_AUTH",
      oauth: {
        domain: "your-cognito-domain.auth.us-east-1.amazoncognito.com",
        scope: ["email", "openid"],
        redirectSignIn: "http://localhost:5173",
        redirectSignOut: "http://localhost:5173",
        responseType: "token"
      }
    }
  };
  
  export default awsConfig;
  