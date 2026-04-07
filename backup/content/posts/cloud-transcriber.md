---
title: "Cloud Transcriber"
tags: ['AWS', 'Nginx', 'Express', 'Node.js', 'Terraform', 'Cloud Computing', 'Microservices', 'Whisper ASR', 'FFmpeg']
date: 2024-11-25
draft: false
cover:
    image: "/images/cloud-transcriber.webp"
    hidden: true
---

This project details a web application designed to allow users to upload media files (audio and video) and generate transcriptions of their audio content. The application leverages various AWS services and open-source technologies to ensure efficient processing, scalability, and security.

## Application Overview

The core functionality of the application involves:

- **Converting video files to MP3 audio** using FFmpeg during the upload process.
- **Transcribing audio files to text** using the open-source Whisper ASR (Automatic Speech Recognition) service.
- **Automatically scaling** the transcription service based on workload.
- **Storing and allowing users to retrieve and view transcriptions** from a database.

## Application Architecture

![Application Architecture](/images/cloud-transcriber/application-architecture.webp)

The application is deployed on AWS in the ap-southeast-2 region. Key components and their roles include:

- **Route 53:** Maps the custom domain to the API Gateway endpoint.
- **API Gateway:** Routes HTTPS traffic to the EC2 instance.
- **EC2 Instance:** Hosts Docker containers running an Express backend (for REST API) and Nginx (for web client and reverse proxy).
- **ElastiCache:** Provides Memcached-based caching to improve API response times.
- **ECS Cluster (ECS Whisper Service):** Hosts and auto-scales the Whisper transcription service based on the total duration of pending transcription tasks in the SQS queue.
- **Lambda Functions:**
  - *Conversion Service:* Extracts audio from media uploaded to S3 using an FFmpeg layer and adds duration to metadata.
  - *Custom Metric Calculator:* Periodically calculates the total queued audio duration for transcription and publishes it to CloudWatch.
- **S3 Buckets:**
  - *Media Bucket:* Stores media files uploaded by users.
  - *Audio Bucket:* Stores MP3 audio files extracted from uploaded media.
  - *Transcription Bucket:* Stores generated transcription text files.
- **SQS Queues:**
  - *Audio Processing Queue:* Notifies the server when audio extraction completes.
  - *Transcription Jobs Queue:* Manages the queue of transcription jobs.
- **Cognito:** Handles user authentication with Google OAuth integration.
- **CloudWatch:** Monitors logs, schedules Lambda functions, and triggers ECS scaling policies.
- **Secrets Manager:** Securely stores DocumentDB credentials.
- **Parameter Store:** Stores configuration data.
- **DocumentDB:** Serves as the database for user audio files and transcription data.

## Video Presentation

{{< youtube GepP1SxA2Wg >}}