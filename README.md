# web-annotation-tool
**Proposed Level of Achievement: Gemini**

## Installation
1. Install dependencies with ```yarn install```
1. Place ```.env.development``` and ```.env.test``` files in directory (please contact the team for these files, as they contain information the team prefers to remain private (e.g. Database API keys)
1. Run a local copy with ```yarn run dev-server```
1. Run tests with ```yarn test --watchAll```

## Motivation
With many machine learning development platforms becoming easier to access for the public, many are slowly trying their hands on machine learning for their own needs. However, getting labelled data for these ML models to train on is particularly difficult. One particular application of machine learning, object detection for computer vision applications, requires large amounts of labelled data in order to churn out useful output models. However, current tools only allow for offline single user labelling. 

As such, the developer has to send out his images to all his other colleagues who will help him annotate the images, and the colleagues will then have to download their own annotation software on their laptops and annotate before sending him back the files for training the ML model. This entire process is too manual and cumbersome, with too much inconveniences. Moreover, datasets tend to easily reach in the 1000’s. As such, we aim to develop a tool that will make annotation of images for deep learning object detection as simple as possible via a web app. 

## Aim
We aim to develop a web based image annotation tool that allows multiple users to concurrently annotate images to significantly speed up the labelling process, instead of individual users annotating images. This will allow the software developer to focus more on training the ML model instead of worrying about the annotation process and how to combine all the data to feed it into the ML model.

## User Stories
1. As a current student trying out object detection deep learning models, I want to be able to make the annotation process of the images as seamless as possible so that I can focus on the math intensive deep learning model understanding.
1. As a current university student, I would like my friends to help out in the annotation process without requiring them to download offline tools in different platforms (MacOS, Windows, Linux, etc) and instead just go to an interactive web app.
1. As a student helping out by annotating images, I would like to help annotate as much images as possible as well as to minimize the amount of human errors I have done while labelling so as to 
1. As a student helping out by annotating images, I would like to have keyboard shortcuts and an intuitive user interface to seamlessly annotate images.

## Scope of Project
A cross-platform website will be developed to allow for a seamless annotation process so as not to hinder the machine learning development process.

We will make an interactive user interface with a multi-user annotation feature as well as intuitive keyboard shortcuts to streamline the annotation process as it can be quite a tiresome job.  

### Features to be completed by mid-June:
1. Login and user creation
1. Basic User Interface
1. Working Annotation Interface

### Features to be completed by mid-July:
1. Useful Keyboard Shortcuts
1. Multi-User Annotation feature
1. Downloading Annotations as a file

## How are we different from similar platforms?
Currently, there exists similar web annotation tools, however, they are all very expensive and hence not accessible to the common user. Moreover, the free tools only allow for offline single user annotation and some web annotation tools exist but written in very old languages (PHP) with very un-intuitive interfaces and limited functionality.

We aim to improve upon these tools by making a modern and intuitive web app with rich functionalities such that annotation would not feel like a chore but a fun process for deep learning. 

## Program Flow
A web-based application will prompt users to create an account before using the application. There, the user would be able to choose what kind of datasets he wants to annotate. Users can upload their own image dataset for everyone else to annotate or they can help others annotate.

Users can upload their own image dataset for everyone else to annotate or they can help others annotate using the multi-user annotation feature.

While the user annotates, he can utilize custom shortcuts for features such as undo and redo, as well as toggling the custom crosshair in case it is too intrusive for the user during annotation.

The ML developer who uploads the dataset will be able to download the annotations in a format that is supported by well known machine learning frameworks (eg: Tensorflow) and immediately train on the dataset.
