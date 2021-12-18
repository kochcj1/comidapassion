import AWS from 'aws-sdk';

const awsS3Config = require("../aws_s3_config.json");
const s3 = new AWS.S3({
    accessKeyId: awsS3Config.accessKeyId,
    secretAccessKey: awsS3Config.secretAccessKey
});

async function getRecipes(recipes) {
    const paramsListObjects = {
        Bucket: "comidapassion",
        Prefix: "recipes/recipe"
    };
    const response = await s3.listObjects(paramsListObjects).promise();
    for (const item of response.Contents) {
        const params = {
            Bucket: "comidapassion",
            Key: item.Key,
            ResponseCacheControl: "no-cache"
        };
        const response = await s3.getObject(params).promise();
        let recipeObject = JSON.parse(response.Body.toString('utf-8'));
        recipeObject["awsBucketKey"] = item.Key;
        recipes.push(recipeObject);
    }
};

export default getRecipes;