# Quickly Creating New Service Instances

## Duplicating your instance

You can clone your current service instance by making an AMI of it. Once the AMI has been created, you can then launch instances based off of that AMI. Settings such as instance types, security groups, user data, ...etc still have to be configured.

Source: [https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/tkv-create-ami-from-instance.html](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/tkv-create-ami-from-instance.html)

## Using user data to run commands at launch

Here is a shell script to add to the root of your current service instance & in the user data section under advanced details of step 3 when launching an instance.

```
bash
#!/bin/bash

cd /home/ubuntu/overview-api/
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3001;
npm run start
```

When launching an instance, anything added to the user data will be ran once that instance is created / launched. So if you are creating a new instance, you would not even need to ssh into it and the app would start! This is only ran once at launch of the instance.

If the app crashes or if you shut off the instance, you would need to manually run the shell script after relaunching the instance.

In the root of your current service instance, create `userdata.sh` with your script and now you can run it with the command `bash userdata.sh` if you need to manually start the app.
- You would need to rename the directory you are changing into to match yours (mine is called overview-api)
- Update the `iptables` command to listen on the correct port
- Add any additional commands, if needed, before running the app

Source: [https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html)