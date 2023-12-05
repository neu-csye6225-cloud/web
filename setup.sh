#!/bin/bash

sudo apt-get update


sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs npm

sudo DEBIAN_FRONTEND=noninteractive node -v
 
sudo DEBIAN_FRONTEND=noninteractive apt install -y unzip

npm install winston

sudo apt-get install rpm
CONFIG_FILE="/opt/aws/amazon-cloudwatch-agent/bin/cloudwatch-config.json"
AGENT_DIR="/opt/aws/amazon-cloudwatch-agent/bin/"

# Create the directory if it doesn't exist
sudo mkdir -p "$AGENT_DIR"

# Check if the directory and file exist
if [ ! -d "$AGENT_DIR" ]; then
    echo "Error: Directory does not exist: $AGENT_DIR"
    exit 1
fi

# Create a JSON configuration file using sudo tee
sudo tee "$CONFIG_FILE" > /dev/null <<EOF
{
  "agent": {
    "metrics_collection_interval": 10,
    "logfile": "/var/logs/amazon-cloudwatch-agent.log"
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/home/admin/WebApp/log/app.log",
            "log_group_name": "csye6225",
            "log_stream_name": "webapp"
          }
        ]
      }
    },
    "log_stream_name": "cloudwatch_log_stream"
  },
  "metrics": {
    "metrics_collected": {
      "statsd": {
        "service_address": ":8125",
        "metrics_collection_interval": 15,
        "metrics_aggregation_interval": 300
      }
    }
  }
}
EOF

# Verify that the JSON configuration file has been created
if [ ! -f "$CONFIG_FILE" ]; then
    echo "Error: Configuration file not created: $CONFIG_FILE"
    exit 1
fi
wget https://amazoncloudwatch-agent.s3.amazonaws.com/debian/amd64/latest/amazon-cloudwatch-agent.deb

sudo dpkg -i amazon-cloudwatch-agent.deb
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m onPremise -s -c file:/opt/aws/amazon-cloudwatch-agent/bin/cloudwatch-config.json
sudo apt-get -f install -y

sudo systemctl enable amazon-cloudwatch-agent
sudo systemctl start amazon-cloudwatch-agent
sudo systemctl restart amazon-cloudwatch-agent

sudo unzip WebAppRenamed -d WebApp

sudo groupadd csye6225

sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225 

sudo cp /home/admin/WebApp/webapplication.service /lib/systemd/system/webapplication.service

sudo systemctl daemon-reload
sudo systemctl enable webapplication
sudo systemctl start webapplication