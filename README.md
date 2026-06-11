# Soft Computing Final Project

Final project repository for our Soft Computing group. The system combines:

- `ai_train/` for dataset handling, notebooks, training, and saved artifacts
- `ai_engine/` for the FastAPI inference service
- `web/` for the Next.js interface used to upload images and view results

## Team

- Francisco Gilbert Sondakh - 140810230004
- Wilson Angelie Tan - 140810230024
- Theophilus Samuel Ghozali - 140810230054

## Classification Output

The project predicts one of three sentiment classes for an image:

- Negative
- Neutral
- Positive

The pipeline uses a CNN for image feature learning, a Genetic Algorithm for hyperparameter optimization, and a Fuzzy Inference System for the final decision.

## Project Guides

This root README is only a high-level overview. For setup and run instructions, use the README inside each project folder:

- [AI training guide](ai_train/README.md)
- [AI engine guide](ai_engine/README.md)
- [Web app guide](web/README.md)

## Extra Reference

- [Instagram design labeling criteria](ai_train/desain_instagram_criteria.md)
