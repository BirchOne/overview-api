# Atelier Backend System

This project is an API infrastructure service for a retail e-commerce application, specifically focusing on providing details for a given product.

## Technologies

Node | Express | PostgreSQL | AWS EC2 | NGINX

## Overview

- [x] Designed database schema for products and related tables
- [x] Created and utilized an ETL process to load data into a deployed PostgreSQL database
- [x] Architected an API service using Node and Express, and locally stress-tested service with k6, achieving almost 2000 requests per second for each endpoint
- [x] Streamlined deployment of service instances by prebaking and bootstrapping AWS EC2 templated instances
- [x] Horizontally scaled microservice to handle over 4000 requests per second by deploying four AWS EC2 instances and an NGINX load balancer instance

## Testing

- [x] Local: Jest, k6.io
- [x] Deployment: Loader.io, New Relic
