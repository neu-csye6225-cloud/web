packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "aws_region" {

  type    = string
  default = "us-east-1"
}

variable "aws_profile" {
  type    = string
  default = "dev"
}

variable "source_ami" {

  type    = string
  default = "ami-06db4d78cb1d3bbf9"

}

variable "ssh_username" {
  type    = string
  default = "admin"
}


variable "ami_users" {
  type    = list(string)
  default = ["413925622897", "581948388212"]
}
source "amazon-ebs" "debian" {

  instance_type = "t2.micro"
  region        = "${var.aws_region}"
  ami_name      = "AMI FOR csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"

  ami_regions = [
    "us-east-1",
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  source_ami   = "${var.source_ami}"
  ssh_username = "${var.ssh_username}"
  ami_users    = "${var.ami_users}"
  profile      = "${var.aws_profile}"

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }

}

build {
  name    = "learn-packer"
  sources = ["source.amazon-ebs.debian"]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "~/WebAppRenamed"
  }

  provisioner "shell" {
    scripts = ["./setup.sh"]
  }
  # Post-processor to generate a manifest
  post-processor "manifest" {
    output = "manifest.json"
    strip_path = true
  }
}
