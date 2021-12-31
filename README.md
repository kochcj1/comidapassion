# comidapassion
During an interview with [Compassion International](https://www.compassion.com/), the recruiter shared with me that one of the apps that's developed at Compassion is an app that allows workers on the field to upload pictures of sponsored/to-be-sponsored children into the system. He also mentioned React Native and AWS as technologies they were looking for in prospective hires.

Given that I didn't have any React Native or AWS experience at the time, the recruiter felt that the job wasn't a good fit for me. As a result, I took it upon myself to learn enough React Native and AWS to create a lighthearted parody of the app he described to me. I call it "comidapassion"!

This app features a [national dish](https://en.wikipedia.org/wiki/National_dish) from each of the [25 countries where Compassion is located](https://www.compassion.com/where-we-work.htm) and includes a way to view the recipe for each national dish within the app. It's a silly concept, but the idea is that someone could make a particular national dish on the field, take a picture of it using the app, and then upload the picture into the system.

In total, I spent approximately 35 hours developing this app, including the time it took to learn React Native and AWS S3.

## Demo 1: Choosing A Photo And Viewing A Recipe

https://user-images.githubusercontent.com/20493743/146639013-7f166342-2224-49be-8d37-9055612ec5a0.mp4

## Demo 2: Images Are Still Present On App Reload

https://user-images.githubusercontent.com/20493743/146639015-31c24492-8db3-4aa0-823c-c0d8192df246.mov

## Setup
1. `git clone` this repository.
1. `cd` into the directory that was created.
1. Pull in dependencies using `npm install`.
1. Set up an S3 bucket on AWS called "comidapassion" with a directory called "recipes". Each recipe should be specified in this directory as a JSON file (see below).
1. Add a file to the project called `aws_s3_config.json` and specify the credentials for accessing your AWS S3 bucket (see below).
1. Run the app using `expo start`.

The policy for your bucket should look something like this:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::comidapassion",
                "arn:aws:s3:::comidapassion/*"
            ]
        }
    ]
}
```

Each recipe's JSON file should look something like this:
```json
{
  "name": "Nasi Goreng",
  "origin": "Indonesia",
  "url": "https://www.recipetineats.com/nasi-goreng-indonesian-fried-rice"
}
```

The `aws_s3_config.json` for your project should look something like this:
```json
{
  "accessKeyId": <your access key ID here>,
  "secretAccessKey": <your secret access key here>
}
```

## Tasks
- [x] Familiarize myself with React Native.
- [x] Familiarize myself with AWS S3.
- [x] Create an S3 bucket for storing recipes.
- [x] Create a config file in the project for storing AWS credentials (make sure that file is in `.gitignore`!).
- [x] Create a splash screen.
- [x] Create a screen that presents each recipe as a card.
- [x] Add the ability to open a recipe's associated URL within the app itself.
- [x] Add an activity indicator to show that a recipe's associated web page is loading.
- [x] Provide a way for the user to select a photo for a recipe.
- [x] Upload selected photos to AWS.
- [x] Re-display each recipe's image on app reload.
- [ ] Warn the user if they're missing `aws_s3_config.json`.
- [ ] Handle internet connection errors.
- [ ] Handle AWS upload errors.
- [ ] Try things out on an Android device.
- [ ] Add [icons8](https://icons8.com/) licensing.
- [ ] Publish the app.
