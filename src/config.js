export default {
    s3: {
        REGION: process.env.REACT_APP_S3_REGION,
        BUCKET: process.env.REACT_APP_S3_BUCKET
    },
    apiGateway: {
        REGION: process.env.REACT_APP_API_GATEWAY_REGION,
        URL: process.env.REACT_APP_API_GATEWAY_URL
    },
    cognito: {
        REGION: process.env.REACT_APP_COGNITO_REGION,
        USER_POOL_ID: process.env.REACT_APP_COGNITO_USERPOOL_ID,
        APP_CLIENT_ID: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
        IDENTITY_POOL_ID: process.env.REACT_APP_COGNITO_IDENTIY_POOL_ID
    }
};