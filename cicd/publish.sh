npm run-script build

docker kill whiteboard
docker rm whiteboard
docker build -t matt404/whiteboard .

docker push matt404/whiteboard
