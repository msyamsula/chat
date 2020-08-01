source .env-chat
sudo docker stop $IMAGE
sudo docker rm $IMAGE
sudo docker rmi $DOCKER_USERNAME/$IMAGE
sudo docker pull $DOCKER_USERNAME/$IMAGE
sudo docker run -itd --name $IMAGE -p 5000:5000 $DOCKER_USERNAME/$IMAGE
