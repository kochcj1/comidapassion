import AWS from 'aws-sdk';

const awsS3Config = require("../aws_s3_config.json");
const s3 = new AWS.S3({
    accessKeyId: awsS3Config.accessKeyId,
    secretAccessKey: awsS3Config.secretAccessKey
});

// See https://stackabuse.com/uploading-files-to-aws-s3-with-node-js.
function uploadRecipe(recipe) {
    const awsBucketKey = recipe.awsBucketKey;
    delete recipe.awsBucketKey;
    const params = {
        Bucket: "comidapassion",
        Key: awsBucketKey,
        Body: JSON.stringify(recipe, null, 2),
        ContentType: "application/json"
    };
    s3.upload(params, function(error, data) {
        if (error) {
            throw error;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

export default uploadRecipe;