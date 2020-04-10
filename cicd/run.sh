npm run-script build

docker kill whiteboard
docker rm whiteboard
docker build -t matt404/whiteboard .
docker run --name whiteboard -it -p 3000:3000 matt404/whiteboard