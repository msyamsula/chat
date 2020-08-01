source .env-chat
sudo docker stop chat
sudo docker rm chat
sudo docker rmi syamsuldocker/chat
sudo docker pull syamduldocker/chat
sudo docker run -itd --name chat -p 5000:5000 syamsuldocker/chat
