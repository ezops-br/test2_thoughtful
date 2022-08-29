# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

# Install depedencies
sh ./installAllDep.sh

# Compile
sh ./compile.sh

# Sync S3 Lambda
echo 'Sync S3'

export S3_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name test-thoughtful-s3-site --query "Stacks[].Outputs[?OutputKey=='S3BucketSite'].OutputValue" --profile ezops --no-cli-pager --output text)
cd ../dist && aws s3 cp . s3://${S3_NAME} --recursive --profile ezops && cd $ROOT_FOLDER
