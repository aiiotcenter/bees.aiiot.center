const awsConfig = {
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_xxxxxx",
    userPoolWebClientId: "your-app-client-id",
    authenticationFlowType: "USER_PASSWORD_AUTH",
    oauth: {
      domain: "your-cognito-domain.auth.us-east-1.amazoncognito.com",
      scope: ["email", "openid", "phone"],
      redirectSignIn: "http://localhost:5173",
      redirectSignOut: "http://localhost:5173",
      responseType: "token"
    }
  },
  oidc: {
    authority: "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_K6L5O2HfY",
    clientId: "4njc2pp1cpfi7ecmspudfvggf4",
    redirectUri: "https://d84l1y8p4kdic.cloudfront.net",
    responseType: "code",
    scope: "phone openid email"
  }
};

export default awsConfig;
